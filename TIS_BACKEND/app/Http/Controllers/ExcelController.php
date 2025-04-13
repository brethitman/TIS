<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use App\Models\Student;
use App\Models\Tutor;
use App\Models\Olympiad;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ExcelController extends Controller
{
    public function showUploadForm()
    {
        return view('tutor.upload-students');
    }

    public function processUpload(Request $request)
    {
        // Validar que el archivo sea Excel
        $validator = Validator::make($request->all(), [
            'excel_file' => 'required|file|mimes:xlsx,xls,csv|max:2048',
            'olympiad_id' => 'required|exists:olympiads,id',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Obtener el tutor autenticado
        $tutor = Auth::user()->tutor;

        try {
            $file = $request->file('excel_file');
            $spreadsheet = IOFactory::load($file->getRealPath());
            $worksheet = $spreadsheet->getActiveSheet();
            $rows = $worksheet->toArray();

            // Eliminar encabezados si existen
            $headers = array_shift($rows);

            $students = [];
            $errors = [];
            
            foreach ($rows as $index => $row) {
                try {
                    // Validar y procesar cada fila
                    $studentData = $this->validateStudentRow($row, $index + 2); // +2 porque el índice empieza en 0 y quitamos headers
                    
                    $students[] = [
                        'tutor_id' => $tutor->id,
                        'olympiad_id' => $request->olympiad_id,
                        'name' => $studentData['name'],
                        'last_name' => $studentData['last_name'],
                        'email' => $studentData['email'],
                        'school' => $studentData['school'],
                        'grade' => $studentData['grade'],
                        'birth_date' => $studentData['birth_date'],
                        'dni' => $studentData['dni'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                } catch (\Exception $e) {
                    $errors[] = "Fila " . ($index + 2) . ": " . $e->getMessage();
                }
            }

            if (!empty($errors)) {
                return redirect()->back()
                    ->with('error', 'Algunos estudiantes no pudieron ser procesados')
                    ->with('error_details', $errors)
                    ->with('success_students', count($students));
            }

            // Insertar en lote
            Student::insert($students);

            return redirect()->back()
                ->with('success', 'Estudiantes inscritos exitosamente: ' . count($students));

        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error al procesar el archivo: ' . $e->getMessage());
        }
    }

    private function validateStudentRow($row, $rowNumber)
    {
        // Validar que la fila tenga los datos mínimos necesarios
        if (count($row) < 7) {
            throw new \Exception("La fila no tiene suficientes columnas. Se esperaban 7 campos.");
        }

        // Asumimos este formato: nombre, apellido, email, escuela, grado, fecha_nacimiento, dni
        $data = [
            'name' => trim($row[0]),
            'last_name' => trim($row[1]),
            'email' => trim($row[2]),
            'school' => trim($row[3]),
            'grade' => (int)$row[4],
            'birth_date' => $this->parseExcelDate($row[5]),
            'dni' => trim($row[6]),
        ];

        // Validaciones adicionales
        if (empty($data['name']) || empty($data['last_name'])) {
            throw new \Exception("Nombre y apellido son obligatorios");
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            throw new \Exception("Email inválido");
        }

        if ($data['grade'] < 1 || $data['grade'] > 12) {
            throw new \Exception("Grado académico inválido");
        }

        return $data;
    }

    private function parseExcelDate($dateValue)
    {
        if (is_numeric($dateValue)) {
            return Date::excelToDateTimeObject($dateValue)->format('Y-m-d');
        }
        
        try {
            return \Carbon\Carbon::createFromFormat('d/m/Y', $dateValue)->format('Y-m-d');
        } catch (\Exception $e) {
            throw new \Exception("Formato de fecha inválido. Use dd/mm/yyyy o un valor de fecha de Excel");
        }
    }
}