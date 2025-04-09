<?php

namespace App\Http\Controllers\NivelCategoria;

use App\Http\Controllers\Controller;
use App\Http\Resources\NivelCategoria\NivelCategoriaCollection;
use App\Http\Resources\NivelCategoria\NivelCategoriaResource;
use App\Models\NivelCategoria;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class NivelCategoriaController extends Controller
{
    protected $resource = NivelCategoriaResource::class;
    protected $collectionResource = NivelCategoriaCollection::class;

    public function index()
    {
        $niveles = NivelCategoria::with('area')->orderBy("created_at", "desc")->simplePaginate(10);
        return new NivelCategoriaCollection($niveles);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_area' => 'required|exists:areas,id_area',
            'nombre_nivel' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
            'fecha_examen' => 'nullable|date',
            'costo' => 'required|numeric|min:0',
            'habilitacion' => 'nullable|boolean',
        ]);

        $nivel = NivelCategoria::create($validated);

        return response()->json([
            'message' => 'Nivel creado exitosamente',
            'nivel' => new NivelCategoriaResource($nivel->load('area'))
        ], 201);
    }

    public function show(string $id)
    {
        $nivel = NivelCategoria::with('area')->findOrFail($id);
        return new NivelCategoriaResource($nivel);
    }

    public function update(Request $request, string $id)
    {
        $nivel = NivelCategoria::findOrFail($id);

        $validated = $request->validate([
            'id_area' => 'sometimes|exists:areas,id_area',
            'nombre_nivel' => 'sometimes|string|max:100',
            'descripcion' => 'nullable|string',
            'fecha_examen' => 'nullable|date',
            'costo' => 'sometimes|numeric|min:0',
            'habilitacion' => 'nullable|boolean',
        ]);

        $nivel->update($validated);

        return response()->json([
            'message' => 'Nivel actualizado exitosamente',
            'nivel' => new NivelCategoriaResource($nivel->load('area'))
        ]);
    }

    public function destroy(string $id)
    {
        $nivel = NivelCategoria::findOrFail($id);
        $nivel->delete();

        return response()->json([
            'message' => 'Nivel eliminado exitosamente'
        ]);
    }

    public function updateHabilitacion(Request $request, string $id)
    {
        $nivel = NivelCategoria::findOrFail($id);
        $nivel->update(['habilitacion' => $request->habilitacion]);

        return response()->json([
            'message' => 'Habilitación actualizada',
            'nivel' => new NivelCategoriaResource($nivel)
        ]);
    }
}
