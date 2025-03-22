<?php

namespace App\Http\Controllers\NivelCategoria;

use App\Http\Controllers\Controller;
use App\Http\Resources\NivelCategoria\NivelCategoriaCollection;
use App\Http\Resources\NivelCategoria\NivelCategoriaResource;
use App\Models\NivelCategoria;
use Illuminate\Http\Request;

class NivelCategoriaController extends Controller
{
    protected $resource = NivelCategoriaResource::class;
    protected $collectionResource = NivelCategoriaCollection::class;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $niveles = NivelCategoria::orderBy("created_at", "desc")->simplePaginate (10);
        return new NivelCategoriaCollection($niveles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string|max:500',
        ]);

        // Crear el nuevo nivel de categoría
        $nivelCategoria = NivelCategoria::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
        ]);

        return response()->json([
            'message' => 'Nivel de categoría creado exitosamente',
            'nivelCategoria' => new NivelCategoriaResource($nivelCategoria)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $nivelCategoria = NivelCategoria::findOrFail($id);
        return new NivelCategoriaResource($nivelCategoria);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $nivelCategoria = NivelCategoria::findOrFail($id);

        // Validar los datos recibidos
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string|max:500',
        ]);

        // Actualizar el nivel de categoría
        $nivelCategoria->update($validatedData);

        return response()->json([
            'message' => 'Nivel de categoría actualizado exitosamente',
            'nivelCategoria' => new NivelCategoriaResource($nivelCategoria)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $nivelCategoria = NivelCategoria::findOrFail($id);
        $nivelCategoria->delete();

        return response()->json([
            'message' => 'Nivel de categoría eliminado exitosamente'
        ]);
    }
}
