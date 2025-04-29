<?php

namespace App\Http\Controllers\Tutor;

use App\Http\Controllers\Controller;
use App\Http\Resources\Tutor\TutorCollection;
use App\Http\Resources\Tutor\TutorResource;
use App\Models\Tutor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TutorController extends Controller
{
    /**
     * El resource que se utilizará para transformar el modelo.
     *
     * @var string
     */
    protected $resource = TutorResource::class;

    /**
     * El resource de colección que se utilizará para transformar la paginación o colecciones de modelos.
     *
     * @var string
     */
    protected $collectionResource = TutorCollection::class;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $tutores = Tutor::orderBy("created_at", "desc")->simplePaginate(10);
        return new $this->collectionResource($tutores);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validar los datos recibidos utilizando el Facade Validator
        $validator = Validator::make($request->all(), [
            'id_inscripcion' => 'nullable|exists:inscripcions,id_inscripcion',
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'ci' => 'required|string|max:20|unique:tutors,ci',
            'correo' => 'required|email|max:100',
            'telefono' => 'required|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Crear el nuevo tutor
        $tutor = Tutor::create($request->all());

        return response()->json([
            'message' => 'Tutor creado exitosamente',
            'tutor' => new $this->resource($tutor)
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id)
    {
        $tutor = Tutor::findOrFail($id);
        return new $this->resource($tutor);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id)
    {
        $tutor = Tutor::findOrFail($id);

        // Validar los datos recibidos utilizando el Facade Validator
        $validator = Validator::make($request->all(), [
            'id_inscripcion' => 'nullable|exists:inscripcions,id_inscripcion',
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'ci' => 'required|string|max:20|unique:tutors,ci,' . $id . ',id_tutor',
            'correo' => 'required|email|max:100',
            'telefono' => 'required|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Actualizar el tutor
        $tutor->update($request->all());

        return response()->json([
            'message' => 'Tutor actualizado exitosamente',
            'tutor' => new $this->resource($tutor)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
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
