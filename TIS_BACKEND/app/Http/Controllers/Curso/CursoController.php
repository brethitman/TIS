<?php

namespace App\Http\Controllers\Curso;

use App\Http\Controllers\Controller;
use App\Http\Resources\Curso\CursoCollection;
use App\Models\Curso;
use Illuminate\Http\Request;
use App\Http\Resources\Curso\CursoResource;
use Illuminate\Support\Facades\DB;
class CursoController extends Controller
{
    protected $resource = CursoResource::class;
    protected $collectionResource = CursoCollection::class;

    public function index(Request $request)
    {
        $query = Curso::query()->with('nivelCategorias');

        // Filtro: buscar por nombre del curso
        if ($request->has('search') && !empty($request->search)) {
            $query->where('nameCurso', 'LIKE', '%' . $request->search . '%');
        }

        // Ordenar (si algún día quieres cambiar la columna de ordenamiento dinámicamente)
        $sortBy = $request->get('sort_by', 'id_curso'); // Por defecto 'id_curso'
        $sortDir = $request->get('sort_dir', 'desc');   // Por defecto 'descendente'

        $query->orderBy($sortBy, $sortDir);

        // Paginación
        $perPage = $request->get('per_page', 10); // Puedes enviar ?per_page=5 si quieres
        $cursos = $query->simplePaginate($perPage);

        return new CursoCollection($cursos);
    }


    public function getAllCursosSimple()
{
    // Obtener todos los cursos con la relación nivelCategorias
    $cursos = Curso::with('nivelCategorias')->get();

    // Devolver respuesta JSON directa sin paginación
    return response()->json([
        'data' => $cursos->map(function ($curso) {
            return [
                'id_curso' => $curso->id_curso,
                'nameCurso' => $curso->nameCurso,

            ];
        })
    ]);
}
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nameCurso' => 'required|string|max:100',
        ]);

        $curso = Curso::create($validated);

        return response()->json([
            'message' => 'Curso creado exitosamente',
            'data' => new $this->resource($curso),
        ], 201);
    }

    public function show($id)
    {
        $curso = Curso::with('nivelCategorias')->findOrFail($id);
        return new $this->resource($curso);
    }

    public function update(Request $request, $id)
    {
        $curso = Curso::findOrFail($id);

        $validated = $request->validate([
            'nameCurso' => 'sometimes|string|max:100',
        ]);

        $curso->update($validated);

        return response()->json([
            'message' => 'Curso actualizado exitosamente',
            'data' => new $this->resource($curso),
        ]);
    }

    public function destroy($id)
    {
        $curso = Curso::findOrFail($id);
        $curso->delete();

        return response()->json([
            'message' => 'Curso eliminado exitosamente',
        ]);
    }


    public function getCursosConAreasPorOlimpiada($id_olimpiada)
{
    // Obtener los cursos que tienen áreas relacionadas con la olimpiada especificada
    $cursos = DB::table('curso')
        ->join('curso_area', 'curso.id_curso', '=', 'curso_area.id_curso')
        ->join('areas', function ($join) use ($id_olimpiada) {
            $join->on('curso_area.id_area', '=', 'areas.id_area')
                 ->where('areas.id_olimpiada', '=', $id_olimpiada);
        })
        ->select('curso.id_curso', 'curso.nameCurso')
        ->distinct()
        ->get();

    $resultado = [];

    foreach ($cursos as $curso) {
        // Obtener las áreas de este curso y olimpiada
        $areas = DB::table('areas')
            ->join('curso_area', 'areas.id_area', '=', 'curso_area.id_area')
            ->where('curso_area.id_curso', $curso->id_curso)
            ->where('areas.id_olimpiada', $id_olimpiada)
            ->select('areas.*')
            ->get();

        $areas_con_niveles = [];

        foreach ($areas as $area) {
            // Obtener niveles de esta área
            $niveles = DB::table('nivel_categorias')
                ->where('id_area', $area->id_area)
                ->get();

            $area->nivel_categorias = $niveles;
            $areas_con_niveles[] = $area;
        }

        $resultado[] = [
            'id_curso' => $curso->id_curso,
            'nameCurso' => $curso->nameCurso,
            'areas' => $areas_con_niveles,
        ];
    }

    return response()->json($resultado);
}
}
