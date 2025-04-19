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
        $areas = Area::with(['olimpiada', 'nivelCategorias', 'inscripcion'])
            ->orderBy("created_at", "desc")
            ->simplePaginate(10);

        return new AreaCollection($areas);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_olimpiada' => 'required|exists:olimpiadas,id_olimpiada',
            'id_inscripcion' => 'nullable|exists:inscripcions,id_inscripcion',
            'nombre_area' => 'required|string|max:100|unique:areas',
            'descripcion' => 'nullable|string|max:255',
            'niveles' => 'nullable|array',
            'niveles.*.nombre_nivel' => 'required|string|max:100',
            'niveles.*.descripcion' => 'nullable|string|max:255',
            'niveles.*.fecha_examen' => 'nullable|date',
            'niveles.*.costo' => 'nullable|numeric',
            'niveles.*.habilitacion' => 'nullable|boolean',
        ]);

        $area = Area::create([
            'id_olimpiada' => $request->id_olimpiada,
            'id_inscripcion' => $request->id_inscripcion,
            'nombre_area' => $request->nombre_area,
            'descripcion' => $request->descripcion,
        ]);

        if ($request->has('niveles')) {
            foreach ($request->niveles as $nivel) {
                $area->nivelCategorias()->create([
                    'nombre_nivel' => $nivel['nombre_nivel'],
                    'descripcion' => $nivel['descripcion'] ?? null,
                    'fecha_examen' => $nivel['fecha_examen'] ?? null,
                    'costo' => $nivel['costo'] ?? 0,
                    'habilitacion' => $nivel['habilitacion'] ?? true,
                ]);
            }
        }

        return response()->json([
            'message' => 'Área y niveles creados exitosamente',
            'area' => new AreaResource($area->load(['olimpiada', 'nivelCategorias', 'inscripcion']))
        ], 201);
    }

    public function show(string $id)
    {
        $area = Area::with(['olimpiada', 'nivelCategorias', 'inscripcion'])->findOrFail($id);
        return new AreaResource($area);
    }

    public function update(Request $request, string $id)
    {
        $area = Area::findOrFail($id);

        $request->validate([
            'id_olimpiada' => 'sometimes|exists:olimpiadas,id_olimpiada',
            'id_inscripcion' => 'nullable|exists:inscripcions,id_inscripcion',
            'nombre_area' => 'required|string|max:100|unique:areas,nombre_area,'.$id.',id_area',
            'descripcion' => 'nullable|string|max:255',
        ]);

        $area->update($request->all());

        return response()->json([
            'message' => 'Área actualizada exitosamente',
            'area' => new AreaResource($area->load(['olimpiada', 'inscripcion']))
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

    public function getByOlimpiadaId($id)
    {
        $areas = Area::with(['olimpiada', 'nivelCategorias', 'inscripcion'])
                 ->where('id_olimpiada', $id)
                 ->orderBy("created_at", "desc")
                 ->get();

        return new AreaCollection($areas);
    }
}
