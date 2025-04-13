<?php

namespace App\Http\Controllers\Area;

use App\Http\Controllers\Controller;
use App\Http\Resources\Area\AreaCollection;
use App\Http\Resources\Area\AreaResource;
use App\Models\Area;
use App\Models\Olimpiada;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    protected $resource = AreaResource::class;
    protected $collectionResource = AreaCollection::class;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $areas = Area::orderBy("created_at", "desc")->simplePaginate(10);
        return new AreaCollection($areas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'nombre_area' => 'required|string|max:100|unique:areas',
            'descripcion' => 'nullable|string|max:255',
        ]);

        // Crear el nuevo área
        $area = Area::create([
            'nombre_area' => $request->nombre_area,
            'descripcion' => $request->descripcion,
        ]);

        return response()->json([
            'message' => 'Área creada exitosamente',
            'area' => new AreaResource($area)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $area = Area::findOrFail($id);
        return new AreaResource($area);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $area = Area::findOrFail($id);

        // Validar los datos recibidos
        $request->validate([
            'nombre_area' => 'required|string|max:100|unique:areas,nombre_area,'.$id.',id_area',
            'descripcion' => 'nullable|string|max:255',
        ]);

        // Actualizar el área
        $area->update([
            'nombre_area' => $request->nombre_area,
            'descripcion' => $request->descripcion,
        ]);

        return response()->json([
            'message' => 'Área actualizada exitosamente',
            'area' => new AreaResource($area)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $area = Area::findOrFail($id);
        $area->delete();

        return response()->json([
            'message' => 'Área eliminada exitosamente'
        ]);
    }


    //OJITOOOO PRUEBA

    public function getByOlimpiada($olimpiadaId)
{
    // Validar que la olimpiada exista
    Olimpiada::findOrFail($olimpiadaId);
    
    $areas = Area::where('id_olimpiada', $olimpiadaId)
                ->with('nivelCategorias') // Carga las categorías relacionadas
                ->orderBy('created_at', 'desc')
                ->get();

    return new AreaCollection($areas);
}

public function storeInOlimpiada(Request $request, $olimpiadaId)
{
    // Validar que la olimpiada exista
    Olimpiada::findOrFail($olimpiadaId);

    $validated = $request->validate([
        'nombre_area' => 'required|string|max:100|unique:areas',
        'descripcion' => 'nullable|string|max:255',
    ]);

    $area = Area::create([
        'nombre_area' => $validated['nombre_area'],
        'descripcion' => $validated['descripcion'],
        'id_olimpiada' => $olimpiadaId // Asociar automáticamente a la olimpiada
    ]);

    return response()->json([
        'message' => 'Área creada exitosamente dentro de la olimpiada',
        'data' => new AreaResource($area)
    ], 201);
}
}
