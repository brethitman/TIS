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
        $inscripciones = Inscripcion::with(['olimpistas', 'tutors', 'boletasPago', 'areas'])
            ->orderBy("created_at", "desc")
            ->simplePaginate(10);

        return new InscripcionCollection($inscripciones);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'fecha_inscripcion' => 'required|date',
            'estado' => 'required|in:Pendiente,Pagado,Verificado',
            'olimpistas' => 'required|array|min:1',
            'olimpistas.*.nombres' => 'required|string|max:255',
            'olimpistas.*.apellidos' => 'required|string|max:255',
            'olimpistas.*.ci' => 'required|string|max:20|unique:olimpistas,ci|distinct',
            'olimpistas.*.fecha_nacimiento' => 'required|date',
            'olimpistas.*.correo' => 'required|email|max:255',
            'olimpistas.*.telefono' => 'required|string|max:20',
            'olimpistas.*.colegio' => 'required|string|max:255',
            'olimpistas.*.curso' => 'required|string|max:50',
            'olimpistas.*.departamento' => 'required|string|max:100',
            'olimpistas.*.provincia' => 'required|string|max:100',
            'tutors' => 'required|array|min:1',
            'tutors.*.nombres' => 'required|string|max:255',
            'tutors.*.apellidos' => 'required|string|max:255',
            'tutors.*.ci' => 'required|string|max:20|unique:tutors,ci|distinct',
            'tutors.*.correo' => 'required|email|max:255',
            'tutors.*.telefono' => 'required|string|max:20',
            'areas' => 'required|array|min:1',
            'areas.*' => 'required|integer|exists:areas,id_area', // Validamos que cada ID exista en la tabla 'areas' usando 'id_area'
        ]);

        $inscripcion = Inscripcion::create([
            'fecha_inscripcion' => $validated['fecha_inscripcion'],
            'estado' => $validated['estado']
        ]);

        foreach ($validated['olimpistas'] as $olimpistaData) {
            $inscripcion->olimpistas()->create($olimpistaData);
        }

        foreach ($validated['tutors'] as $tutorData) {
            $inscripcion->tutors()->create($tutorData);
        }

        // Asigna las áreas existentes a la inscripción actualizando 'id_inscripcion'
        \App\Models\Area::whereIn('id_area', $validated['areas'])
            ->update(['id_inscripcion' => $inscripcion->id_inscripcion]);

        return response()->json([
            'message' => 'Inscripción creada exitosamente',
            'inscripcion' => new InscripcionResource($inscripcion->load(['olimpistas', 'tutors', 'boletasPago', 'areas']))
        ], 201);
    }

    public function show(string $id)
    {
        $inscripcion = Inscripcion::with(['olimpistas', 'tutors', 'boletasPago', 'areas'])->findOrFail($id);
        return new InscripcionResource($inscripcion);
    }

    public function update(Request $request, string $id)
    {
        $inscripcion = Inscripcion::findOrFail($id);

        $request->validate([
            'fecha_inscripcion' => 'sometimes|date',
            'estado' => 'sometimes|in:Pendiente,Pagado,Verificado'
        ]);

        $inscripcion->update($request->only(['fecha_inscripcion', 'estado']));

        return response()->json([
            'message' => 'Inscripción actualizada exitosamente',
            'inscripcion' => new InscripcionResource($inscripcion->load(['olimpistas', 'tutors', 'boletasPago', 'areas']))
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
