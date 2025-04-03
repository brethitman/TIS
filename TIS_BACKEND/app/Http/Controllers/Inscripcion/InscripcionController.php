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

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $inscripciones = Inscripcion::with(['olimpista', 'area', 'tutor'])->orderBy("created_at", "desc")->simplePaginate (10);
        return new InscripcionCollection($inscripciones);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validated = $request->validate([
        'fecha_inscripcion' => 'required|date',
        'estado' => 'required|in:Pendiente,Pagado,Verificado',
        'olimpista' => 'required|array',
        'olimpista.nombres' => 'required|string|max:255',
        'olimpista.apellidos' => 'required|string|max:255',
        'olimpista.ci' => 'required|string|max:20|unique:olimpistas,ci',
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
        'tutor.telefono' => 'required|string|max:20',
        'id_area' => 'required|exists:areas,id_area' // Asegúrate de que coincida con la columna en `areas`
    ]);

    // Crear olimpista
    $olimpista = Olimpista::create($validated['olimpista']);

    // Crear tutor
    $tutor = Tutor::create($validated['tutor']);

    // Crear inscripción
    $inscripcion = Inscripcion::create([
        'fecha_inscripcion' => $validated['fecha_inscripcion'],
        'estado' => $validated['estado'],
        'id_olimpista' => $olimpista->id_olimpista, // Usa la clave primaria correcta
        'id_tutor' => $tutor->id_tutor,             // Usa la clave primaria correcta
        'id_area' => $validated['id_area']
    ]);

    return response()->json([
        'message' => 'Inscripción creada exitosamente',
        'inscripcion' => $inscripcion->load(['olimpista', 'tutor', 'area'])
    ], 201);
}
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $inscripcion = Inscripcion::with(['olimpista', 'area', 'tutor'])->findOrFail($id);
        return new InscripcionResource($inscripcion);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $inscripcion = Inscripcion::findOrFail($id);

        // Validar los datos recibidos
        $request->validate([
            'id_olimpista' => 'required|exists:olimpistas,id_olimpista',
            'id_area' => 'required|exists:areas,id_area',
            'id_tutor' => 'required|exists:tutors,id_tutor',
            'fecha_inscripcion' => 'required|date',
            'estado' => 'required|in:Pendiente,Pagado,Verificado',
        ]);

        // Actualizar la inscripción
        $inscripcion->update($request->all());

        return response()->json([
            'message' => 'Inscripción actualizada exitosamente',
            'inscripcion' => new InscripcionResource($inscripcion)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $inscripcion = Inscripcion::findOrFail($id);
        $inscripcion->delete();

        return response()->json([
            'message' => 'Inscripción eliminada exitosamente'
        ]);
    }
}
