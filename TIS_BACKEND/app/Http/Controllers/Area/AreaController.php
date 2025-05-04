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
            'id_olimpiada' => 'required|exists:olimpiadas,id_olimpiada',
            'nombre_area' => 'required|string|max:100|unique:areas,nombre_area',
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
            'area' => new AreaResource($area->load(['olimpiada', 'nivelCategorias']))
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
            'id_olimpiada' => 'sometimes|exists:olimpiadas,id_olimpiada',
            'nombre_area' => 'required|string|max:100|unique:areas,nombre_area,' . $id . ',id_area',
            'descripcion' => 'nullable|string|max:255',
        ]);

        $area->update($request->only([
            'id_olimpiada',
            'nombre_area',
            'descripcion'
        ]));

        return response()->json([
            'message' => 'Área actualizada exitosamente',
            'area' => new AreaResource($area->load(['olimpiada', 'nivelCategorias']))
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
        $areas = Area::with(['olimpiada', 'nivelCategorias'])
                     ->where('id_olimpiada', $id)
                     ->orderBy("created_at", "desc")
                     ->get();

        return new AreaCollection($areas);
    }

    public function getAreasByOlimpiada($id)
    {
        $olimpiada = Olimpiada::find($id);

        if (!$olimpiada) {
            return response()->json(['error' => 'Olimpiada no encontrada'], 404);
        }

        $areas = $olimpiada->areas()->with('nivelCategorias')->get();

        return response()->json($areas);
    }

    public function nivelesPorArea($id)
{
    // Buscamos el área junto con sus niveles
    $area = Area::with('niveles')->find ($id);

    if (!$area) {
        return response()->json(['error' => 'Área no encontrada'], 404);
    }

    return response()->json([
        'area' => $area->nombre_area,
        'niveles' => $area->niveles
    ]);
}

public function indexV2(Request $request)
{
    $areas = Area::with(['olimpiada', 'nivelCategorias'])
        ->orderBy('created_at', 'desc')
        ->paginate(10); // O simplePaginate si quieres

    $formattedAreas = $areas->map(function ($area) {
        return [
            'id' => $area->id_area,
            'id_olimpiada' => $area->id_olimpiada,
            'nombre_area' => $area->nombre_area,
            'descripcion' => $area->descripcion,
            'createdAt' => $area->created_at,
            'updatedAt' => $area->updated_at,
            'olimpiada' => $area->olimpiada ? [
                'id_olimpiada' => $area->olimpiada->id_olimpiada,
                'nombre_olimpiada' => $area->olimpiada->nombre_olimpiada,
                'descripcion_olimpiada' => $area->olimpiada->descripcion_olimpiada,
                'fecha_inicio' => $area->olimpiada->fecha_inicio,
                'fecha_final' => $area->olimpiada->fecha_final,
                'created_at' => $area->olimpiada->created_at,
                'updated_at' => $area->olimpiada->updated_at,
            ] : null,
            'niveles' => $area->nivelCategorias->map(function ($nivel) {
                return [
                    'id_nivel' => $nivel->id_nivel,
                    'id_area' => $nivel->id_area,
                    'nombre_nivel' => $nivel->nombre_nivel,
                    'descripcion' => $nivel->descripcion,
                    'fecha_examen' => $nivel->fecha_examen,
                    'costo' => $nivel->costo,
                    'habilitacion' => $nivel->habilitacion,
                    'gradoIniCat' => $nivel->gradoIniCat,
                    'gradoFinCat' => $nivel->gradoFinCat,
                    'created_at' => $nivel->created_at,
                    'updated_at' => $nivel->updated_at,
                ];
            }),
        ];
    });

    return response()->json([
        'areas' => $formattedAreas,
        'links' => [
            'first' => $areas->url(1),
            'last' => $areas->lastPage() ? $areas->url($areas->lastPage()) : null,
            'prev' => $areas->previousPageUrl(),
            'next' => $areas->nextPageUrl(),
        ],
        'meta' => [
            'current_page' => $areas->currentPage(),
            'from' => $areas->firstItem(),
            'path' => $request->url(),
            'per_page' => $areas->perPage(),
            'to' => $areas->lastItem(),
        ],
    ]);
}


public function storeBasic(Request $request)
{
    $validated = $request->validate([
        'id_olimpiada' => 'required|exists:olimpiadas,id_olimpiada',
        'nombre_area' => 'required|string|max:100|unique:areas,nombre_area',
        'descripcion' => 'nullable|string|max:255',
        'gradoIniAr' => 'required|string|max:50',
        'gradoFinAr' => 'required|string|max:50',
        'cursos' => 'required|array|min:1',
        'cursos.*' => 'exists:curso,id_curso' // Corregido a nombre de tabla singular
    ]);

    // Crear el área con todos los campos validados
    $area = Area::create([
        'id_olimpiada' => $validated['id_olimpiada'],
        'nombre_area' => $validated['nombre_area'],
        'descripcion' => $validated['descripcion'],
        'gradoIniAr' => $validated['gradoIniAr'],
        'gradoFinAr' => $validated['gradoFinAr']
    ]);

    // Sincronizar cursos con la tabla pivote
    $area->cursos()->sync($validated['cursos']);

    return response()->json([
        'message' => 'Área creada con cursos asociados exitosamente',
        'data' => new AreaResource($area->load(['olimpiada', 'cursos']))
    ], 201);
}

}
