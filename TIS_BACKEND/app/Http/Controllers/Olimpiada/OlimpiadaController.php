<?php

namespace App\Http\Controllers\Olimpiada;

use App\Http\Controllers\Controller;
use App\Http\Resources\Olimpiada\olimpiadaCollection;
use App\Http\Resources\Olimpiada\OlimpiadaResource;
use App\Models\Olimpiada;
use Illuminate\Http\Request;
//use App\Http\Resources\OlimpiadaResource;

class OlimpiadaController extends Controller
{
    protected $resource = OlimpiadaResource::class;
    protected $collectionResource = olimpiadaCollection::class;

    public function index()
    {
        $olimpiadas = Olimpiada::with('areas')->orderBy('fecha_inicio', 'desc')->get();
        return response()->json([
            'olimpiadas' => $this->resource::collection($olimpiadas)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre_olimpiada' => 'required|string|max:100',
            'descripcion_olimpiada' => 'nullable|string|max:150',
            'fecha_inicio' => 'required|date',
            'fecha_final' => 'required|date|after_or_equal:fecha_inicio'
        ]);

        $olimpiada = Olimpiada::create($validated);

        return response()->json([
            'message' => 'Olimpiada creada exitosamente',
            'data' => new $this->resource($olimpiada)
        ], 201);
    }

    public function show(string $id)
    {
        $olimpiada = Olimpiada::with('areas.nivelCategorias')->findOrFail($id);
        return new $this->resource($olimpiada);
    }

    public function update(Request $request, string $id)
    {
        $olimpiada = Olimpiada::findOrFail($id);

        $validated = $request->validate([
            'nombre_olimpiada' => 'sometimes|string|max:100',
            'descripcion_olimpiada' => 'nullable|string|max:150',
            'fecha_inicio' => 'sometimes|date',
            'fecha_final' => 'sometimes|date|after_or_equal:fecha_inicio'
        ]);

        $olimpiada->update($validated);

        return response()->json([
            'message' => 'Olimpiada actualizada exitosamente',
            'data' => new $this->resource($olimpiada)
        ]);
    }

    public function destroy(string $id)
    {
        $olimpiada = Olimpiada::findOrFail($id);
        $olimpiada->delete();

        return response()->json([
            'message' => 'Olimpiada eliminada exitosamente'
        ]);
    }
}
