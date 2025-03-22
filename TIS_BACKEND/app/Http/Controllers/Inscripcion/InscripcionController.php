<?php

namespace App\Http\Controllers\Inscripcion;

use App\Http\Controllers\Controller;
use App\Http\Resources\Inscripcion\InscripcionCollection;
use App\Http\Resources\Inscripcion\InscripcionResource;
use App\Models\Inscripcion;
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
        // Validar los datos recibidos
        $request->validate([
            'id_olimpista' => 'required|exists:olimpistas,id_olimpista',
            'id_area' => 'required|exists:areas,id_area',
            'id_tutor' => 'required|exists:tutors,id_tutor',
            'fecha_inscripcion' => 'required|date',
            'estado' => 'required|in:Pendiente,Pagado,Verificado',
        ]);

        // Crear la nueva inscripción
        $inscripcion = Inscripcion::create($request->all());

        return response()->json([
            'message' => 'Inscripción creada exitosamente',
            'inscripcion' => new InscripcionResource($inscripcion)
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
