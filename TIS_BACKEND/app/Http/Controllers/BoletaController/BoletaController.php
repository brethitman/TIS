<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\EnviarBoletaPago;
use PDF; // Requiere: composer require barryvdh/laravel-dompdf

class BoletaController extends Controller
{
    public function generarYEnviarPDF(Request $request)
    {
        // Validar la solicitud
        $request->validate([
            'boletaData' => 'required',
            'correoDestinatario' => 'required|email'
        ]);

        $boletaData = $request->boletaData;
        $correoDestinatario = $request->correoDestinatario;

        // Generar el PDF
        $pdf = PDF::loadView('pdf.boleta', ['boleta' => $boletaData]);
        $pdfContent = $pdf->output();

        // Enviar el correo con el PDF adjunto
        try {
            Mail::to($correoDestinatario)->send(new EnviarBoletaPago($boletaData, $pdfContent));
            
            return response()->json([
                'success' => true,
                'message' => 'Boleta enviada correctamente a ' . $correoDestinatario
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al enviar el correo: ' . $e->getMessage()
            ], 500);
        }
    }
}