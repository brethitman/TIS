<?php

namespace App\Http\Controllers\Olimpista;

use App\Http\Controllers\Controller;
use App\Http\Resources\Olimpista\OlimpistaCollection;
use App\Http\Resources\Olimpista\OlimpistaResource;
use App\Models\Olimpista;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;

class OlimpistaController extends Controller
{
    protected $resource = OlimpistaResource::class;
    protected $collectionResource = OlimpistaCollection::class;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $olimpistas = Olimpista::orderBy("created_at", "desc")->simplePaginate(10);
        return new OlimpistaCollection($olimpistas);
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
            'ci' => 'required|string|max:20',
            'fecha_nacimiento' => 'required|date',
            'correo' => 'required|email|max:100',
            'telefono' => 'required|string|max:20',
            'colegio' => 'required|string|max:100',
            'curso' => 'required|string|max:50',
            'departamento' => 'required|string|max:50',
            'provincia' => 'required|string|max:50',
        ]);

        // Crear el nuevo olimpista
        $olimpista = Olimpista::create($request->all());

        return response()->json([
            'message' => 'Olimpista creado exitosamente',
            'olimpista' => new OlimpistaResource($olimpista)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $olimpista = Olimpista::findOrFail($id);
        return new OlimpistaResource($olimpista);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $olimpista = Olimpista::findOrFail($id);

        // Validar los datos recibidos
        $request->validate([
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'ci' => 'required|string|max:20',
            'fecha_nacimiento' => 'required|date',
            'correo' => 'required|email|max:100',
            'telefono' => 'required|string|max:20',
            'colegio' => 'required|string|max:100',
            'curso' => 'required|string|max:50',
            'departamento' => 'required|string|max:50',
            'provincia' => 'required|string|max:50',
        ]);

        // Actualizar el olimpista
        $olimpista->update($request->all());

        return response()->json([
            'message' => 'Olimpista actualizado exitosamente',
            'olimpista' => new OlimpistaResource($olimpista)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $olimpista = Olimpista::findOrFail($id);
        $olimpista->delete();

        return response()->json([
            'message' => 'Olimpista eliminado exitosamente'
        ]);
    }

    //Aqui se va a guardar la lista de los olimpistas
    public function importarExcel(Request $request)
    {
        // Validar archivo
        $request->validate([
            'archivo' => 'required|mimes:xlsx,xls'
        ]);

        $archivo = $request->file('archivo');
        $spreadsheet = IOFactory::load($archivo->getPathname());
        $hoja = $spreadsheet->getActiveSheet();
        $filas = $hoja->toArray();

        foreach ($filas as $key => $fila) {
            // Ignorar la cabecera del archivo
            if ($key == 0)
                continue;

            Olimpista::create([
                'nombres' => $fila[0],  // Columna A en Excel
                'apellidos' => $fila[1],  // Columna B
                'ci' => $fila[2],
                'fecha_nacimiento' => $fila[3],
                'correo' => $fila[4],
                'telefono' => $fila[5],
                'colegio' => $fila[6],
                'curso' => $fila[7],
                'departamento' => $fila[8],
                'provincia' => $fila[9],
            ]);
        }

        return response()->json(['mensaje' => 'Datos importados con éxito']);
    }
}
