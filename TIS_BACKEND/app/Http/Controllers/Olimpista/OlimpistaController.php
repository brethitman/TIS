<?php

namespace App\Http\Controllers\Olimpista;

use App\Http\Controllers\Controller;
use App\Http\Resources\Olimpista\OlimpistaCollection;
use App\Http\Resources\Olimpista\OlimpistaResource;
use App\Models\Olimpista;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OlimpistaController extends Controller
{
    /**
     * El resource que se utilizará para transformar el modelo.
     *
     * @var string
     */
    protected $resource = OlimpistaResource::class;

    /**
     * El resource de colección que se utilizará para transformar la paginación o colecciones de modelos.
     *
     * @var string
     */
    protected $collectionResource = OlimpistaCollection::class;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $olimpistas = Olimpista::orderBy("created_at", "desc")->simplePaginate(10);
        return new $this->collectionResource($olimpistas);
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
            'ci' => 'required|string|max:20',
            'fecha_nacimiento' => 'required|date',
            'correo' => 'required|email|max:100',
            'telefono' => 'required|string|max:20',
            'colegio' => 'required|string|max:100',
            'departamento' => 'required|string|max:50',
            'provincia' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Crear el nuevo olimpista
        $olimpista = Olimpista::create($request->all());

        return response()->json([
            'message' => 'Olimpista creado exitosamente',
            'olimpista' => new $this->resource($olimpista)
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
        $olimpista = Olimpista::findOrFail($id);
        return new $this->resource($olimpista);
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
        $olimpista = Olimpista::findOrFail($id);

        // Validar los datos recibidos utilizando el Facade Validator
        $validator = Validator::make($request->all(), [
            'id_inscripcion' => 'nullable|exists:inscripcions,id_inscripcion',
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'ci' => 'required|string|max:20|unique:olimpistas,ci,' . $id . ',id_olimpista',
            'fecha_nacimiento' => 'required|date',
            'correo' => 'required|email|max:100',
            'telefono' => 'required|string|max:20',
            'colegio' => 'required|string|max:100',
            'departamento' => 'required|string|max:50',
            'provincia' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Actualizar el olimpista
        $olimpista->update($request->all());

        return response()->json([
            'message' => 'Olimpista actualizado exitosamente',
            'olimpista' => new $this->resource($olimpista)
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
        $olimpista = Olimpista::findOrFail($id);
        $olimpista->delete();

        return response()->json([
            'message' => 'Olimpista eliminado exitosamente'
        ]);
    }
}
