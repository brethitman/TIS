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
        // --- 1. Validar Reglas de Validación ---
        // Validamos la estructura anidada para olimpistas, tutors y areas/niveles
        $validated = $request->validate([
            'fecha_inscripcion' => 'required|date',
            'estado' => 'required|in:Pendiente,Pagado,Verificado',

            'olimpistas' => 'required|array|min:1',
            'olimpistas.*.nombres' => 'required|string|max:100', // Ajustado según schema
            'olimpistas.*.apellidos' => 'required|string|max:100', // Ajustado según schema
            // Validar CI único por olimpista (considera si un olimpista puede tener múltiples inscripciones)
            // Si un olimpista puede tener múltiples inscripciones, la validación unique debe ser más compleja
            // o manejarse en la lógica de negocio (buscar si existe por CI antes de crear).
            'olimpistas.*.ci' => 'required|string|max:20|unique:olimpistas,ci', // Validación unique
            'olimpistas.*.fecha_nacimiento' => 'required|date',
            'olimpistas.*.correo' => 'required|email|max:100', // Ajustado según schema
            'olimpistas.*.telefono' => 'required|string|max:20', // Ajustado según schema
            'olimpistas.*.colegio' => 'required|string|max:100', // Ajustado según schema
            'olimpistas.*.curso' => 'required|string|max:50', // Ajustado según schema
            'olimpistas.*.departamento' => 'required|string|max:50', // Ajustado según schema
            'olimpistas.*.provincia' => 'required|string|max:50', // Ajustado según schema

            'tutors' => 'required|array|min:1',
            'tutors.*.nombres' => 'required|string|max:100', // Ajustado según schema
            'tutors.*.apellidos' => 'required|string|max:100', // Ajustado según schema
            // Validar CI único por tutor (considera si un tutor puede tener múltiples inscripciones)
            'tutors.*.ci' => 'required|string|max:20|unique:tutors,ci', // Validación unique
            'tutors.*.correo' => 'required|email|max:100', // Ajustado según schema
            'tutors.*.telefono' => 'required|string|max:20', // Ajustado según schema

            // --- VALIDACIÓN PARA LA ESTRUCTURA ANIDADA DE AREAS Y NIVELES ---
            // Esperamos un array de objetos, donde cada objeto tiene 'area_id' y 'nivelesCategoria' (array de IDs)
            'areas' => 'required|array|min:1', // Debe haber al menos una entrada de área/niveles
            'areas.*.area_id' => 'required|integer|exists:areas,id_area', // Valida que el ID del área exista
            'areas.*.nivelesCategoria' => 'required|array|min:1', // Valida que nivelesCategoria sea un array no vacío
            // Valida que cada ID de nivel exista en la tabla nivel_categorias
            'areas.*.nivelesCategoria.*' => 'required|integer|exists:nivel_categorias,id_nivel',
            // Opcional: Añadir una validación custom para asegurar que el id_nivel pertenezca al area_id especificado.
            // Esto requiere una regla de validación personalizada.
        ]);

        // Usar una transacción de base de datos para asegurar que todas las operaciones se completen
        // o se reviertan si algo falla.
        DB::beginTransaction();

        try {
            // --- 2. Crear la Inscripción Principal ---
            $inscripcion = Inscripcion::create([
                'fecha_inscripcion' => $validated['fecha_inscripcion'],
                'estado' => $validated['estado']
                // created_at y updated_at se llenan automáticamente por Eloquent
            ]);

            // --- 3. Crear Olimpistas Asociados ---
            foreach ($validated['olimpistas'] as $olimpistaData) {
                // Usar la relación hasMany para crear olimpistas vinculados a la inscripción
                // Esto automáticamente asigna el id_inscripcion.
                $inscripcion->olimpistas()->create($olimpistaData);
            }

            // --- 4. Crear Tutores Asociados ---
            foreach ($validated['tutors'] as $tutorData) {
                 // Usar la relación hasMany para crear tutores vinculados a la inscripción
                 // Esto automáticamente asigna el id_inscripcion.
                $inscripcion->tutors()->create($tutorData);
            }

            // --- 5. Procesar Areas y NivelCategorias y llenar la tabla pivote ---
            $inscripcionAreaNivelData = [];
            $totalCosto = 0; // Variable para calcular el costo total

            // Recorrer las áreas y los niveles seleccionados
            foreach ($validated['areas'] as $areaData) {
                $areaId = $areaData['area_id'];
                $nivelIds = $areaData['nivelesCategoria'];

                // Obtener los NivelCategorias seleccionados con sus costos
                $nivelesSeleccionados = NivelCategoria::whereIn('id_nivel', $nivelIds)
                                                    ->where('id_area', $areaId) // Opcional pero recomendado: verificar que el nivel pertenezca al área
                                                    ->get();

                // Si la validación 'exists' ya asegura que los IDs de nivel existen,
                // y si confías en la estructura de entrada, podrías omitir la consulta extra aquí
                // y simplemente calcular el costo después de insertar en la pivote.
                // Sin embargo, verificar que el nivel pertenece al área aquí añade una capa de seguridad.

                foreach ($nivelesSeleccionados as $nivel) {
                    // Añade un registro por cada combinación Inscripción-Área-Nivel seleccionada
                    $inscripcionAreaNivelData[] = [
                        'id_inscripcion' => $inscripcion->id_inscripcion,
                        'id_area' => $areaId, // Guardamos el ID del área en la tabla pivote
                        'id_nivel' => $nivel->id_nivel,
                        'created_at' => now(), // Si tu tabla pivote usa timestamps
                        'updated_at' => now(), // Si tu tabla pivote usa timestamps
                    ];
                    // Sumar el costo del nivel al total
                    $totalCosto += $nivel->costo;
                }
            }

            // Inserta todos los registros en la tabla pivote 'inscripcion_area_nivel'
            if (!empty($inscripcionAreaNivelData)) {
                 // Usar insert para insertar múltiples filas de manera eficiente
                DB::table('inscripcion_area_nivel')->insert($inscripcionAreaNivelData);
            }

            // --- 6. Generar la Boleta de Pago ---
            // Generar un número de boleta único (puedes usar UUID, un contador, etc.)
            $numeroBoleta = 'BOL-' . Str::random(8) . '-' . $inscripcion->id_inscripcion; // Ejemplo simple

            BoletaPago::create([
                'id_inscripcion' => $inscripcion->id_inscripcion,
                'numero_boleta' => $numeroBoleta,
                'monto' => $totalCosto, // Usar el costo total calculado
                'fecha_generacion' => now()->toDateString(), // Solo la fecha
                 // created_at y updated_at se llenan automáticamente
            ]);


            // Si todo salió bien, confirma la transacción
            DB::commit();

            // --- 7. Cargar relaciones y retornar respuesta ---
            // Cargar las relaciones necesarias para que el Resource las incluya
            $inscripcion->load(['olimpistas', 'tutors', 'boletaPago', 'nivelCategorias']);

            return response()->json([
                'message' => 'Inscripción creada exitosamente',
                'inscripcion' => new InscripcionResource($inscripcion)
            ], 201);

        } catch (\Exception $e) {
            // Si algo falla, revierte la transacción
            DB::rollBack();

            // Loguear el error para depuración
            log::error('Error al crear inscripción: ' . $e->getMessage(), ['exception' => $e]);

            // Retornar una respuesta de error
            return response()->json([
                'message' => 'Error al crear la inscripción',
                'error' => $e->getMessage() // Considera no exponer detalles del error en producción
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
}
