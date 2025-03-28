<?php

namespace App\Http\Controllers\NivelCategoria;

use App\Http\Controllers\Controller;
use App\Http\Resources\NivelCategoria\NivelCategoriaCollection;
use App\Http\Resources\NivelCategoria\NivelCategoriaResource;
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
        $niveles = NivelCategoria::orderBy("created_at", "desc")->simplePaginate(10);
        return new NivelCategoriaCollection($niveles);
    }

    /**
     * Almacena un nuevo nivel de categoría en la base de datos.
     */
    public function store(Request $request)
    {
        try {
            // Validar los datos del request
            $validatedData = $request->validate([
                'id_area' => 'required|integer|exists:areas,id_area', // Asegura que el área exista
                'nombre_nivel' => 'required|string|max:100',
                'descripcion' => 'nullable|string',
                'fecha_examen' => 'nullable|date',
                'costo' => 'required|numeric|min:0',
                'habilitacion' => 'nullable|boolean',
            ]);

            // Crear el nuevo nivel de categoría
            $nivelCategoria = NivelCategoria::create($validatedData);

            return response()->json([
                'message' => 'Nivel de categoría creado exitosamente',
                'nivelCategoria' => new NivelCategoriaResource($nivelCategoria),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'No se pudo crear el nivel de categoría',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Muestra un nivel de categoría por su ID.
     */
    public function show(string $id)
    {
        try {
            $nivelCategoria = NivelCategoria::findOrFail($id);
            return new NivelCategoriaResource($nivelCategoria);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Nivel de categoría no encontrado'], 404);
        }
    }

    /**
     * Actualiza un nivel de categoría existente.
     */
    public function update(Request $request, string $id)
    {
        try {
            $nivelCategoria = NivelCategoria::findOrFail($id);

            // Validar los datos recibidos
            $validatedData = $request->validate([
                'id_area' => 'required|integer|exists:areas,id_area',
                'nombre_nivel' => 'required|string|max:100',
                'descripcion' => 'nullable|string',
                'fecha_examen' => 'nullable|date',
                'costo' => 'required|numeric|min:0',
                'habilitacion' => 'nullable|boolean',
            ]);

            // Actualizar el nivel de categoría
            $nivelCategoria->update($validatedData);

            return response()->json([
                'message' => 'Nivel de categoría actualizado exitosamente',
                'nivelCategoria' => new NivelCategoriaResource($nivelCategoria),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Nivel de categoría no encontrado'], 404);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'No se pudo actualizar el nivel de categoría',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Elimina un nivel de categoría por su ID.
     */
    public function destroy(string $id)
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
    }
}