<?php

namespace App\Http\Controllers\Inscripcion;

use App\Http\Controllers\Controller;
use App\Http\Resources\Inscripcion\InscripcionCollection;
use App\Http\Resources\Inscripcion\InscripcionResource;
use App\Models\Inscripcion;
use App\Models\Olimpista;
use App\Models\Tutor;
use Illuminate\Http\Request;

class InscripcionController extends Controller
{
    protected $resource = InscripcionResource::class;
    protected $collectionResource = InscripcionCollection::class;

    public function index()
    {
        $inscripciones = Inscripcion::with(['olimpista', 'tutor', 'nivel.area'])
            ->orderBy("created_at", "desc")
            ->simplePaginate(10);

        return new InscripcionCollection($inscripciones);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'fecha_inscripcion' => 'required|date',
            'estado' => 'required|in:Pendiente,Pagado,Verificado',
            'id_nivel' => 'required|exists:nivel_categorias,id_nivel',
            'olimpista' => 'required|array',
            'olimpista.nombres' => 'required|string|max:255',
            'olimpista.apellidos' => 'required|string|max:255',
            'olimpista.ci' => 'required|string|max:20|unique:olimpistas,ci', // <- esto es nuevo
            'olimpista.fecha_nacimiento' => 'required|date',
            'olimpista.correo' => 'required|email|max:255',
            'olimpista.telefono' => 'required|string|max:20',
            'olimpista.colegio' => 'required|string|max:255',
            'olimpista.curso' => 'required|string|max:50',
            'olimpista.departamento' => 'required|string|max:100',
            'olimpista.provincia' => 'required|string|max:100',
            'tutor' => 'required|array',
            'tutor.nombres' => 'required|string|max:255',
            'tutor.apellidos' => 'required|string|max:255',
            'tutor.ci' => 'required|string|max:20|unique:tutors,ci',
            'tutor.correo' => 'required|email|max:255',
            'tutor.telefono' => 'required|string|max:20'
        ]);


        $olimpista = Olimpista::create($validated['olimpista']);
        $tutor = Tutor::create($validated['tutor']);

        $inscripcion = Inscripcion::create([
            'fecha_inscripcion' => $validated['fecha_inscripcion'],
            'estado' => $validated['estado'],
            'id_olimpista' => $olimpista->id_olimpista,
            'id_tutor' => $tutor->id_tutor,
            'id_nivel' => $validated['id_nivel'] // Solo id_nivel
        ]);

        return response()->json([
            'message' => 'Inscripción creada exitosamente',
            'inscripcion' => new InscripcionResource($inscripcion->load(['olimpista', 'tutor', 'nivel.area']))
        ], 201);
    }

    public function show(string $id)
    {
        $inscripcion = Inscripcion::with(['olimpista', 'tutor', 'nivel.area'])->findOrFail($id);
        return new InscripcionResource($inscripcion);
    }

    public function update(Request $request, string $id)
    {
        $inscripcion = Inscripcion::findOrFail($id);

        $request->validate([
            'id_olimpista' => 'required|exists:olimpistas,id_olimpista',
            'id_tutor' => 'required|exists:tutors,id_tutor',
            'id_nivel' => 'required|exists:nivel_categorias,id_nivel', // Actualizado
            'fecha_inscripcion' => 'required|date',
            'estado' => 'required|in:Pendiente,Pagado,Verificado',
        ]);

        $inscripcion->update($request->all());

        return response()->json([
            'message' => 'Inscripción actualizada exitosamente',
            'inscripcion' => new InscripcionResource($inscripcion->load(['olimpista', 'tutor', 'nivel.area']))
        ]);
    }

    public function destroy(string $id)
    {
        $inscripcion = Inscripcion::findOrFail($id);
        $inscripcion->delete();

        return response()->json([
            'message' => 'Inscripción eliminada exitosamente'
        ]);
    }
}
