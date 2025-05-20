<?php

namespace App\Http\Controllers\Inscripcion;

use App\Http\Controllers\Controller;
use App\Http\Resources\Inscripcion\InscripcionCollection;
use App\Http\Resources\Inscripcion\InscripcionResource;
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

            'olimpistas' => 'required|array|min:1',
            'olimpistas.*.nombres' => 'required|string|max:100',
            'olimpistas.*.apellidos' => 'required|string|max:100',
            'olimpistas.*.ci' => 'required|string|max:20',
            'olimpistas.*.fecha_nacimiento' => 'required|date',
            'olimpistas.*.correo' => 'required|email|max:100',
            'olimpistas.*.telefono' => 'required|string|max:20',
            'olimpistas.*.colegio' => 'required|string|max:100',
            'olimpistas.*.departamento' => 'required|string|max:50',
            'olimpistas.*.provincia' => 'required|string|max:50',

            'tutors' => 'required|array|min:1',
            'tutors.*.nombres' => 'required|string|max:100',
            'tutors.*.apellidos' => 'required|string|max:100',
            'tutors.*.ci' => 'required|string|max:20',
            'tutors.*.correo' => 'required|email|max:100',
            'tutors.*.telefono' => 'required|string|max:20',
            'tutors.*.contacto' => 'nullable|string|max:100',

            'areas' => 'required|array|min:1',
            'areas.*.area_id' => 'required|integer|exists:areas,id_area',
            'areas.*.nivelesCategoria' => 'required|array|min:1',
            'areas.*.nivelesCategoria.*' => 'required|integer|exists:nivel_categorias,id_nivel',
        ]);

        DB::beginTransaction();

        try {
            // ✅ Se elimina fecha_inscripcion
            $inscripcion = Inscripcion::create([
                'estado' => $validated['estado']
            ]);

            foreach ($validated['olimpistas'] as $olimpistaData) {
                $inscripcion->olimpistas()->create($olimpistaData);
            }

            foreach ($validated['tutors'] as $tutorData) {
                $inscripcion->tutors()->create($tutorData);
            }

            $inscripcionAreaNivelData = [];
            $totalCosto = 0;

            foreach ($validated['areas'] as $areaData) {
                $areaId = $areaData['area_id'];
                $nivelIds = $areaData['nivelesCategoria'];

                $nivelesSeleccionados = NivelCategoria::whereIn('id_nivel', $nivelIds)
                    ->where('id_area', $areaId)
                    ->get();

                foreach ($nivelesSeleccionados as $nivel) {
                    $inscripcionAreaNivelData[] = [
                        'id_inscripcion' => $inscripcion->id_inscripcion,
                        'id_area' => $areaId,
                        'id_nivel' => $nivel->id_nivel,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                    $totalCosto += $nivel->costo;
                }
            }

            if (!empty($inscripcionAreaNivelData)) {
                DB::table('inscripcion_area_nivel')->insert($inscripcionAreaNivelData);
            }

            $numeroBoleta = 'BOL-' . Str::random(8) . '-' . $inscripcion->id_inscripcion;

            BoletaPago::create([
                'id_inscripcion' => $inscripcion->id_inscripcion,
                'numero_boleta' => $numeroBoleta,
                'monto' => $totalCosto,
                'fecha_generacion' => now()->toDateString(),
            ]);

            DB::commit();

            $inscripcion->load(['olimpistas', 'tutors', 'boletaPago', 'nivelCategorias']);

            return response()->json([
                'message' => 'Inscripción creada exitosamente',
                'inscripcion' => new InscripcionResource($inscripcion)
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Error al crear inscripción: ' . $e->getMessage(), ['exception' => $e]);

            return response()->json([
                'message' => 'Error al crear la inscripción',
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

    public function storeList(Request $request)
    {
        try {
            $validated = $request->validate([
                'estado' => 'required|in:Pendiente,Pagado,Verificado',
                'olimpistas' => 'required|array|min:2',
                'olimpistas.*.nombres' => 'required|string|max:100',
                'olimpistas.*.apellidos' => 'required|string|max:100',
                'olimpistas.*.ci' => 'required|string|max:20',
                'olimpistas.*.fecha_nacimiento' => 'required|date',
                'olimpistas.*.correo' => 'required|email|max:100',
                'olimpistas.*.telefono' => 'required|string|max:20',
                'olimpistas.*.colegio' => 'required|string|max:100',
                'olimpistas.*.departamento' => 'required|string|max:50',
                'olimpistas.*.provincia' => 'required|string|max:50',
                'tutors' => 'required|array|min:1',
                'tutors.*.nombres' => 'required|string|max:100',
                'tutors.*.apellidos' => 'required|string|max:100',
                'tutors.*.ci' => 'required|string|max:20',
                'tutors.*.correo' => 'required|email|max:100',
                'tutors.*.telefono' => 'required|string|max:20',
                'tutors.*.contacto' => 'nullable|string|max:100',
                'areas' => 'required|array|min:1',
                'areas.*.area_id' => 'required|integer|exists:areas,id_area',
                'areas.*.nivelesCategoria' => 'required|array|min:1',
                'areas.*.nivelesCategoria.*' => 'required|integer|exists:nivel_categorias,id_nivel',
            ]);

            DB::beginTransaction();

            $inscripcion = Inscripcion::create(['estado' => $validated['estado']]);

            foreach ($validated['olimpistas'] as $olimpistaData) {
                $inscripcion->olimpistas()->create($olimpistaData);
            }

            foreach ($validated['tutors'] as $tutorData) {
                $inscripcion->tutors()->create($tutorData);
            }

            $inscripcionAreaNivelData = [];

            foreach ($validated['areas'] as $areaData) {
                $areaId = $areaData['area_id'];
                $nivelIds = $areaData['nivelesCategoria'];

                $nivelesSeleccionados = NivelCategoria::whereIn('id_nivel', $nivelIds)
                    ->where('id_area', $areaId)
                    ->get();

                foreach ($nivelesSeleccionados as $nivel) {
                    $inscripcionAreaNivelData[] = [
                        'id_inscripcion' => $inscripcion->id_inscripcion,
                        'id_area' => $areaId,
                        'id_nivel' => $nivel->id_nivel,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }

            if (!empty($inscripcionAreaNivelData)) {
                DB::table('inscripcion_area_nivel')->insert($inscripcionAreaNivelData);
            }

            DB::commit();

            $inscripcion->load(['olimpistas', 'tutors', 'nivelCategorias']);

            return response()->json([
                'message' => 'Inscripción creada exitosamente',
                'inscripcion' => new InscripcionResource($inscripcion)
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error al crear inscripción: ' . $e->getMessage(), ['exception' => $e]);

            return response()->json([
                'message' => 'Error al crear la inscripción',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
