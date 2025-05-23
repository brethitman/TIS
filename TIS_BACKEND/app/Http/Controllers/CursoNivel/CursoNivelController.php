<?php

namespace App\Http\Controllers\CursoNivel;

use App\Http\Controllers\Controller;
use App\Http\Resources\CursoNivel\CursoNivelCollection;
use App\Http\Resources\CursoNivel\CursoNivelResource;
use App\Models\CursoNivel;
use Illuminate\Http\Request;

class CursoNivelController extends Controller
{
    protected $resource = CursoNivelResource::class;
    protected $collectionResource = CursoNivelCollection::class;

    public function index()
    {
        $cursoNiveles = CursoNivel::orderBy('id_curso_nivel', 'desc')->simplePaginate(10);
        return new CursoNivelCollection($cursoNiveles);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_curso' => 'required|exists:cursos,id_curso',
            'id_nivel' => 'required|exists:nivel_categorias,id_nivel',
        ]);

        $cursoNivel = CursoNivel::create($validated);

        return response()->json([
            'message' => 'Curso-Nivel creado exitosamente',
            'cursoNivel' => new CursoNivelResource($cursoNivel)
        ], 201);
    }

    public function show(string $id)
    {
        $cursoNivel = CursoNivel::findOrFail($id);
        return new CursoNivelResource($cursoNivel);
    }

    public function update(Request $request, string $id)
    {
        $cursoNivel = CursoNivel::findOrFail($id);

        $validated = $request->validate([
            'id_curso' => 'sometimes|exists:cursos,id_curso',
            'id_nivel' => 'sometimes|exists:nivel_categorias,id_nivel',
        ]);

        $cursoNivel->update($validated);

        return response()->json([
            'message' => 'Curso-Nivel actualizado exitosamente',
            'cursoNivel' => new CursoNivelResource($cursoNivel)
        ]);
    }

    public function destroy(string $id)
    {
        $cursoNivel = CursoNivel::findOrFail($id);
        $cursoNivel->delete();

        return response()->json([
            'message' => 'Curso-Nivel eliminado exitosamente'
        ]);
    }
    
}
