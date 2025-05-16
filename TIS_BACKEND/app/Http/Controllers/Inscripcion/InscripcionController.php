<?php

namespace App\Http\Controllers\Inscripcion;

use App\Http\Controllers\Controller;
use App\Http\Resources\Inscripcion\InscripcionCollection;
use App\Http\Resources\Inscripcion\InscripcionResource;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Area;
use App\Models\Inscripcion;
use App\Models\NivelCategoria;
use App\Models\Olimpista;
use App\Models\Tutor;
use App\Models\BoletaPago;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;



class InscripcionController extends Controller
{
    // Define los Resources a usar
    protected $resource = InscripcionResource::class;
    protected $collectionResource = InscripcionCollection::class;

    /**
     * Muestra una lista paginada de inscripciones.
     * Carga las relaciones necesarias para el Resource.
     */
    public function index()
    {
        // Cargar las relaciones que el Resource necesita para evitar el problema N+1
        // 'boletaPago' es singular (hasOne), 'nivelCategorias' es la relación Many-to-Many
        $inscripciones = Inscripcion::with(['olimpistas', 'tutors', 'boletaPago', 'nivelCategorias'])
            ->orderBy("created_at", "desc")
            ->simplePaginate(10);

        // Usar el Resource Collection para transformar la colección
        return new InscripcionCollection($inscripciones);
    }

    /**
     * Crea una nueva inscripción con olimpistas, tutores y niveles seleccionados.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'estado' => 'required|in:Pendiente,Pagado,Verificado',

            'olimpistas' => 'required|array|min:1|max:1',
            'olimpistas.*.nombres' => 'required|string|max:100',
            'olimpistas.*.apellidos' => 'required|string|max:100',
            'olimpistas.*.ci' => 'required|string|max:20|unique:olimpistas,ci',
            'olimpistas.*.fecha_nacimiento' => 'required|date|before:-10 years',
            'olimpistas.*.correo' => 'required|email|max:100',
            'olimpistas.*.telefono' => 'required|string|max:20',
            'olimpistas.*.colegio' => 'required|string|max:100',
            'olimpistas.*.departamento' => 'required|string|max:50',
            'olimpistas.*.provincia' => 'required|string|max:50',

            'tutors' => 'required|array|min:1|max:1',
            'tutors.*.nombres' => 'required|string|max:100',
            'tutors.*.apellidos' => 'required|string|max:100',
            'tutors.*.ci' => 'required|string|max:20|unique:tutors,ci',
            'tutors.*.correo' => 'required|email|max:100',
            'tutors.*.telefono' => 'required|string|max:20',
            'tutors.*.contacto' => 'nullable|string|max:255',

            'areas' => 'required|array|min:1',
            'areas.*.area_id' => 'required|integer|exists:areas,id_area',
            'areas.*.nivelesCategoria' => 'required|array|min:1',
            'areas.*.nivelesCategoria.*' => 'required|integer|exists:nivel_categorias,id_nivel',
        ]);

        DB::beginTransaction();

        try {
            // Crear inscripción (solo con estado, sin fecha_inscripcion)
            $inscripcion = Inscripcion::create([
                'estado' => $validated['estado']
            ]);

            // Crear olimpista
            $olimpista = $inscripcion->olimpistas()->create($validated['olimpistas'][0]);

            // Crear tutor
            $tutor = $inscripcion->tutors()->create($validated['tutors'][0]);

            // Procesar áreas y niveles
            $totalCosto = 0;
            $areasNiveles = [];
            $nivelesSeleccionados = [];
            $nombreOlimpiada = null;

            foreach ($validated['areas'] as $areaData) {
                $area = Area::with(['olimpiada', 'nivelCategorias' => function($query) use ($areaData) {
                    $query->whereIn('id_nivel', $areaData['nivelesCategoria']);
                }])->findOrFail($areaData['area_id']);

                if (!$nombreOlimpiada) {
                    $nombreOlimpiada = $area->olimpiada->nombre_olimpiada;
                }

                $nivelesData = [];
                foreach ($area->nivelCategorias as $nivel) {
                    $nivelesData[] = [
                        'nivel_id' => $nivel->id_nivel,
                        'nivel_nombre' => $nivel->nombre_nivel
                    ];

                    // Vincular nivel a la inscripción
                    $inscripcion->nivelCategorias()->attach($nivel->id_nivel, [
                        'id_area' => $area->id_area,
                        'created_at' => now(),
                        'updated_at' => now()
                    ]);

                    // Agregar a niveles seleccionados
                    $nivelesSeleccionados[] = [
                        'id' => $nivel->id_nivel,
                        'nombre_nivel' => $nivel->nombre_nivel,
                        'costo' => number_format($nivel->costo, 2, '.', ''),
                        'fecha_examen' => $nivel->fecha_examen
                    ];

                    $totalCosto += $nivel->costo;
                }

                $areasNiveles[] = [
                    'area_id' => $area->id_area,
                    'area_nombre' => $area->nombre_area,
                    'niveles' => $nivelesData
                ];
            }

            // Crear boleta de pago
            $boleta = BoletaPago::create([
                'id_inscripcion' => $inscripcion->id_inscripcion,
                'id_olimpista' => $olimpista->id_olimpista,
                'id_tutor' => $tutor->id_tutor,
                'numero_boleta' => 'BOL-' . Str::upper(Str::random(8)) . '-' . $inscripcion->id_inscripcion,
                'monto' => number_format($totalCosto, 2, '.', ''),
                'fecha_generacion' => now()->toDateString(),
                'areas_niveles' => $areasNiveles,
                'nombre_olimpiada' => $nombreOlimpiada
            ]);

            DB::commit();

            // Construir respuesta (usando created_at como fecha_inscripcion)
            return response()->json([
                'message' => 'Inscripción creada exitosamente',
                'inscripcion' => [
                    'id' => $inscripcion->id_inscripcion,
                    'estado' => $inscripcion->estado,
                    'fecha_inscripcion' => $inscripcion->created_at->format('Y-m-d H:i:s'),
                    'olimpistas' => [$olimpista->toArray()],
                    'tutors' => [$tutor->toArray()],
                    'boleta_pago' => [
                        'id' => $boleta->id_boleta,
                        'numero_boleta' => $boleta->numero_boleta,
                        'monto' => $boleta->monto,
                        'fecha_generacion' => $boleta->fecha_generacion,
                        'areas_niveles' => $boleta->areas_niveles,
                        'nombre_olimpiada' => $boleta->nombre_olimpiada,
                        'olimpista' => $olimpista->toArray(),
                        'tutor' => $tutor->toArray()
                    ],
                    'niveles_seleccionados' => $nivelesSeleccionados
                ]
            ], 201);

        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al procesar la inscripción',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Muestra los detalles de una inscripción específica.
     * Carga las relaciones necesarias para el Resource.
     */
    public function show(string $id)
    {
        // Cargar las relaciones que el Resource necesita
        $inscripcion = Inscripcion::with(['olimpistas', 'tutors', 'boletaPago', 'nivelCategorias'])->findOrFail($id);
        return new InscripcionResource($inscripcion);
    }

    /**
     * Actualiza una inscripción existente.
     * Nota: Este método solo actualiza los campos directos de la tabla inscripcions.
     * La actualización de olimpistas, tutores o niveles seleccionados requeriría lógica adicional.
     */
    public function update(Request $request, string $id)
    {
        $inscripcion = Inscripcion::findOrFail($id);

        // Validación para los campos que se pueden actualizar directamente
        $request->validate([
            'fecha_inscripcion' => 'sometimes|date',
            'estado' => 'sometimes|in:Pendiente,Pagado,Verificado'
            // Si permites actualizar olimpistas, tutores o niveles aquí,
            // necesitarías añadir validación y lógica compleja para manejar adiciones, eliminaciones o modificaciones.
        ]);

        // Actualiza solo los campos permitidos
        $inscripcion->update($request->only(['fecha_inscripcion', 'estado']));

        // Cargar las relaciones después de actualizar para el Resource
        $inscripcion->load(['olimpistas', 'tutors', 'boletaPago', 'nivelCategorias']);

        return response()->json([
            'message' => 'Inscripción actualizada exitosamente',
            'inscripcion' => new InscripcionResource($inscripcion)
        ]);
    }

    /**
     * Elimina una inscripción.
     * Nota: Deberás configurar las restricciones de clave foránea en la base de datos
     * con ON DELETE CASCADE o manejar la eliminación de olimpistas, tutores,
     * boletas, comprobantes y registros en la tabla pivote manualmente
     * antes de eliminar la inscripción principal.
     */
    public function destroy(string $id)
    {
        $inscripcion = Inscripcion::findOrFail($id);

        // Considera eliminar manualmente las relaciones si no usas CASCADE en DB
        // $inscripcion->olimpistas()->delete();
        // $inscripcion->tutors()->delete();
        // $inscripcion->boletaPago()->delete(); // Si es hasOne
        // $inscripcion->nivelCategorias()->detach(); // Para la relación Many-to-Many

        $inscripcion->delete();

        return response()->json([
            'message' => 'Inscripción eliminada exitosamente'
        ]);
    }

    /**
     * SUGERENCIA: Este método parece fuera de lugar en un InscripcionController.
     * Su propósito es obtener Áreas filtradas por Olimpiada.
     * Debería estar en un controlador dedicado a Áreas o Olimpiadas.
     *
     * Si lo mantienes aquí, la lógica actual es incorrecta. Está intentando
     * encontrar una INSCRIPCIÓN que tenga áreas relacionadas con una OLIMPIADA específica,
     * y luego devuelve las áreas de ESA INSCRIPCIÓN. No devuelve todas las áreas
     * de la olimpiada especificada.
     *
     * Para obtener todas las áreas de una olimpiada específica, la lógica correcta sería:
     */
    public function getAreasByOlimpiada($olimpiadaId)
    {
        // Validar que la olimpiada exista
        $olimpiada = \App\Models\Olimpiada::findOrFail($olimpiadaId);

        // Obtener todas las áreas asociadas a esa olimpiada
        $areas = $olimpiada->areas()->get(); // Usando la relación 'areas' en el modelo Olimpiada

        // Puedes usar un Resource para Areas si lo tienes
        // return \App\Http\Resources\Area\AreaResource::collection($areas);

        return response()->json($areas);
    }

    //verificar con el ocr de frontend

    public function verificarPago(Request $request)
{
    $request->validate([
        'numero_boleta' => 'required|string|max:50',
        'estado' => 'required|in:Pagado' // Solo permite cambiar a Pagado
    ]);

    DB::beginTransaction();

    try {
        // Buscar boleta con relaciones
        $boleta = BoletaPago::with('inscripcion')
            ->where('numero_boleta', $request->numero_boleta)
            ->firstOrFail();

        // Validar transición de estado válida
        if ($boleta->inscripcion->estado === 'Pagado') {
            return response()->json([
                'message' => 'La boleta ya tiene estado Pagado',
                'estado_actual' => $boleta->inscripcion->estado
            ], Response::HTTP_CONFLICT); // 409 Conflict
        }

        // Validar que solo se pueda cambiar desde Pendiente
        if ($boleta->inscripcion->estado !== 'Pendiente') {
            return response()->json([
                'message' => 'Solo se puede pagar inscripciones en estado Pendiente',
                'estado_actual' => $boleta->inscripcion->estado
            ], Response::HTTP_UNPROCESSABLE_ENTITY); // 422
        }

        // Actualizar estado
        $boleta->inscripcion->update(['estado' => $request->estado]);

        // Cargar relaciones para la respuesta
        $inscripcionActualizada = $boleta->inscripcion->load([
            'olimpistas',
            'tutors',
            'boletaPago',
            'nivelCategorias'
        ]);

        DB::commit();

        return response()->json([
            'message' => 'Estado actualizado exitosamente',
            'data' => new InscripcionResource($inscripcionActualizada)
        ]);

    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        DB::rollBack();
        return response()->json([
            'message' => 'Boleta no encontrada'
        ], Response::HTTP_NOT_FOUND); // 404

    } catch (\Throwable $e) {
        DB::rollBack();
        return response()->json([
            'message' => 'Error al procesar la solicitud',
            'error' => $e->getMessage()
        ], Response::HTTP_INTERNAL_SERVER_ERROR); // 500
    }
}
}
