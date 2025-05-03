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
        $olimpiadas = Olimpiada::with('areas')->orderBy('fecha_inicio', 'desc')->simplePaginate (10);
        return new olimpiadaCollection($olimpiadas);

    }



    public function store(Request $request)
    {
        // 1. Validación básica
        $validated = $request->validate([
            'nombre_olimpiada'      => 'required|string|max:100',
            'descripcion_olimpiada' => 'nullable|string|max:150',
            'fecha_inicio'          => 'required|date',
            'fecha_final'           => 'required|date|after_or_equal:fecha_inicio',
            'areas'                 => 'nullable|array',
            'areas.*.nombre_area'   => 'required_with:areas|string|max:100',
            'areas.*.descripcion'   => 'nullable|string|max:150',
        ]);

        // 2. Chequeo manual de duplicado
        $existe = Olimpiada::where('nombre_olimpiada', $validated['nombre_olimpiada'])
            ->where('descripcion_olimpiada', $validated['descripcion_olimpiada'])
            ->exists();

        if ($existe) {
            return response()->json([
                'message' => 'Ya existe una Olimpiada con ese nombre y descripción'
            ], 409);
        }

        // 3. Si no existe, crearla
        $olimpiada = Olimpiada::create($validated);
        if (isset($validated['areas'])) {
            foreach ($validated['areas'] as $areaData) {
                $olimpiada->areas()->create($areaData);
            }
        }

        return response()->json([
            'message' => 'Olimpiada creada exitosamente',
            'data'    => new $this->resource($olimpiada->load('areas'))
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

    // Verificar si hay cambios en nombre/descripción antes de validar duplicados
    if (
        isset($validated['nombre_olimpiada']) && 
        isset($validated['descripcion_olimpiada'])
    ) {
        $nombre = $validated['nombre_olimpiada'];
        $descripcion = $validated['descripcion_olimpiada'];

        // Verificar si ya existe otra olimpiada con los mismos datos (excluyendo la actual)
        $existe = Olimpiada::where('nombre_olimpiada', $nombre)
            ->where('descripcion_olimpiada', $descripcion)
            ->where('id_olimpiada', '!=', $id) // Excluir la olimpiada actual
            ->exists();

        if ($existe) {
            return response()->json([
                'message' => 'Ya existe una Olimpiada con ese nombre y descripción'
            ], 409);
        }
    }

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
