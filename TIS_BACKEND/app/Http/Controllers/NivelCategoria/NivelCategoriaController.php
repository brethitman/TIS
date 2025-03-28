<?php

namespace App\Http\Controllers\NivelCategoria;

use App\Http\Controllers\Controller;
use App\Http\Resources\NivelCategoria\NivelCategoriaCollection;
use App\Http\Resources\NivelCategoria\NivelCategoriaResource;
use App\Models\Area;
use App\Models\NivelCategoria;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class NivelCategoriaController extends Controller
{
    protected $resource = NivelCategoriaResource::class;
    protected $collectionResource = NivelCategoriaCollection::class;

    /**
     * Muestra una lista paginada de los niveles de categoría.
     */
    public function index()
    {
        $nivelCategorias = NivelCategoria::orderBy("created_at", "desc")->simplePaginate(10);
        return new NivelCategoriaCollection($nivelCategorias);
    }

    /**
     * Almacena un nuevo nivel de categoría en la base de datos.
     */
    public function store(Request $request)

    // public function store(Request $request, Area $area) // Laravel inyecta automáticamente el modelo Area
{
    // 1. Validar SOLO los campos que vienen del formulario (id_area no se incluye)
    $request->validate([
        'nombre_nivel' => 'required|string|max:100|unique:nivel_categorias',
        'descripcion' => 'nullable|string',
        'fecha_examen' => 'nullable|string',
        'costo' => 'required|numeric|min:0',
        'habilitacion' => 'nullable|boolean',
    ]);

    $nivelCategoria = NivelCategoria::create([
        'nombre_nivel' => $request->nombre_nivel,
        'descripcion' => $request->descripcion,
        'fecha_examen' => $request->fecha_examen,
        'costo' => $request->costo,
        'habilitacion' => $request->habilitacion,
    ]);

    // 4. Retornar respuesta (opcional)
    return response()->json([
        'message' => 'Categoria creada exitosamente',
        'nivelCategoria' => new NivelCategoriaResource($nivelCategoria)
    ], 201);
}

    /**
     * Muestra un nivel de categoría por su ID.
     */
    public function show(string $id)
    {
        $nivelCategoria = NivelCategoria::findOrFail($id);
        return new NivelCategoriaResource($nivelCategoria);
    }

    /**
     * Actualiza un nivel de categoría existente.
     */
    public function update(Request $request, string $id)
    {
        // 1. Buscar el nivel de categoría (con error 404 si no existe)
            $nivelCategoria = NivelCategoria::findOrFail($id);

        // 2. Validar SOLO los campos editables (excluyendo id_area)
        $request->validate([
            'nombre_nivel' => 'required|string|max:100|unique:unique:nivel_categorias,nombre_nivel,'.$id.',id_nivel',

            'descripcion' => 'nullable|string',
            'fecha_examen' => 'nullable|string',
            'costo' => 'required|numeric|min:0',
            'habilitacion' => 'nullable|boolean',
        ]);

        // 3. Actualizar el registro (ignorando id_area del request)
        $nivelCategoria->update([
            'nombre_nivel' => $request->nombre_nivel,
            'descripcion' => $request->descripcion,
            'fecha_examen' => $request->fecha_examen,
            'costo' => $request->costo,
            'habilitacion' => $request->habilitacion,
        ]);

        // 4. Retornar respuesta (formato similar al de tus compañeros)
        return response()->json([
            'message' => 'Nivel de categoría actualizado exitosamente',
            'nivelCategoria' => new NivelCategoriaResource($nivelCategoria),
        ]);
    
    }
}

    /**
     * Elimina un nivel de categoría por su ID.
     */
   /* public function destroy(string $id)
    {
        try {
            $nivelCategoria = NivelCategoria::findOrFail($id);
            $nivelCategoria->delete();

            return response()->json([
                'message' => 'Nivel de categoría eliminado exitosamente'
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Nivel de categoría no encontrado'], 404);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'No se pudo eliminar el nivel de categoría',
                'message' => $e->getMessage(),
            ], 500);
        }
    }*/
