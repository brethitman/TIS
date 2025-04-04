<?php

namespace App\Http\Controllers\Tutor;

use App\Http\Controllers\Controller;
use App\Http\Resources\Tutor\TutorCollection;
use App\Http\Resources\Tutor\TutorResource;
use App\Models\Tutor;
use Illuminate\Http\Request;

class TutorController extends Controller
{
    protected $resource = TutorResource::class;
    protected $collectionResource = TutorCollection::class;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tutores = Tutor::orderBy("created_at", "desc")->simplePaginate(10);
        return new TutorCollection($tutores);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'ci' => 'required|string|max:20|unique:tutors',
            'correo' => 'required|email|max:100',
            'telefono' => 'required|string|max:20',
        ]);

        // Crear el nuevo tutor
        $tutor = Tutor::create($request->all());

        return response()->json([
            'message' => 'Tutor creado exitosamente',
            'tutor' => new TutorResource($tutor)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tutor = Tutor::findOrFail($id);
        return new TutorResource($tutor);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tutor = Tutor::findOrFail($id);

        // Validar los datos recibidos
        $request->validate([
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'ci' => 'required|string|max:20|unique:tutors,ci,'.$id.',id_tutor',
            'correo' => 'required|email|max:100',
            'telefono' => 'required|string|max:20',
        ]);

        // Actualizar el tutor
        $tutor->update($request->all());

        return response()->json([
            'message' => 'Tutor actualizado exitosamente',
            'tutor' => new TutorResource($tutor)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tutor = Tutor::findOrFail($id);
        $tutor->delete();

        return response()->json([
            'message' => 'Tutor eliminado exitosamente'
        ]);
    }
}
