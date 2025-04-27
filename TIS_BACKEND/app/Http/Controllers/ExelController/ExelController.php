<?php
namespace App\Http\Controllers\ExelController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ExelController extends Controller
{

public function importarExcel(Request $request)
{
    $request->validate([
        'archivo' => 'required|mimes:xlsx,xls'
    ]);
    
    if ($request->hasFile('archivo')) {
        $archivo = $request->file('archivo');

        try {
            $datosProcesados = $this->leerExcel($archivo);

            return response()->json([
                'message' => 'Archivo procesado correctamente',
                'datos' => $datosProcesados,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    return response()->json(['error' => 'No se recibió ningún archivo'], 400);
}
public function leerExcel($archivo) {
    $spreadsheet = IOFactory::load($archivo->getPathname());
    $hoja = $spreadsheet->getActiveSheet();
    $filas = $hoja->toArray();

    $listaEstudiantes = [];
    $listaTutor = [];
    $maxEstudiantes = 6; 

    foreach ($filas as $key => $fila) {
        if ($key < 3) {
            continue;
        }
        if (count($listaEstudiantes) < $maxEstudiantes) {
            if (!empty($fila[0])) {
                $listaEstudiantes[] = [
                    'nombres' => $fila[0],
                    'apellidos' => $fila[1],
                    'ci' => $fila[2],
                    'fecha_nacimiento' => $fila[3],
                    'correo' => $fila[4],
                    'telefono' => $fila[5],
                    'colegio' => $fila[6],
                    'curso' => $fila[7],
                    'departamento' => $fila[8],
                    'provincia' => $fila[9],
                    'Olimpiada' => $fila[10],
                    'Area' => $fila[11],
                    'Categoria' => $fila[12],
                ];
            }
            continue; 
        }

        if ($key >= 13) {
            if (!empty($fila[0])) { 
                $listaTutor[] = [
                    'nombre_tutor' => $fila[0],
                    'apellidos_tutor' => $fila[1],
                    'telefono_tutor' => $fila[2],
                    'correo_tutor' => $fila[3],
                ];
            }
        }
        if ($key >= 19) {
            break;
        }
    }

    return [
        'estudiantes' => $listaEstudiantes,
        'tutor' => $listaTutor
    ];
}

}
