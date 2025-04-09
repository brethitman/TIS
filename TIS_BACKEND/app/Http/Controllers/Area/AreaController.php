<?php

namespace App\Http\Controllers\Area;

use App\Http\Controllers\Controller;
use App\Http\Resources\Area\AreaCollection;
use App\Http\Resources\Area\AreaResource;
use App\Models\Area;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    protected $resource = AreaResource::class;
    protected $collectionResource = AreaCollection::class;

    public function index()
    {
        $areas = Area::with(['olimpiada', 'nivelCategorias'])
            ->orderBy("created_at", "desc")
            ->simplePaginate(10);

        return new AreaCollection($areas);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_olimpiada' => 'required|exists:olimpiadas,id_olimpiada', // Nuevo campo
            'nombre_area' => 'required|string|max:100|unique:areas',
            'descripcion' => 'nullable|string|max:255',
        ]);

        $area = Area::create($request->all());

        return response()->json([
            'message' => 'Área creada exitosamente',
            'area' => new AreaResource($area->load('olimpiada'))
        ], 201);
    }

    public function show(string $id)
    {
        $area = Area::with(['olimpiada', 'nivelCategorias'])->findOrFail($id);
        return new AreaResource($area);
    }

    public function update(Request $request, string $id)
    {
        $area = Area::findOrFail($id);

        $request->validate([
            'id_olimpiada' => 'sometimes|exists:olimpiadas,id_olimpiada', // Nuevo campo
            'nombre_area' => 'required|string|max:100|unique:areas,nombre_area,'.$id.',id_area',
            'descripcion' => 'nullable|string|max:255',
        ]);

        $area->update($request->all());

        return response()->json([
            'message' => 'Área actualizada exitosamente',
            'area' => new AreaResource($area->load('olimpiada'))
        ]);
    }

    public function destroy(string $id)
    {
        $area = Area::findOrFail($id);
        $area->delete();

        return response()->json([
            'message' => 'Área eliminada exitosamente'
        ]);
    }
}
