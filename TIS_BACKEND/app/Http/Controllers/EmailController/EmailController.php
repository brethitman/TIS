<?php

namespace App\Http\Controllers\EmailController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Exception;
use Illuminate\Support\Facades\Validator;

class EmailController extends Controller
{
    public function enviarEmail(Request $request)
    {
        try {
            Log::info('Solicitud de envío de email recibida', $request->all());
            
            // Validar la solicitud
            $validator = Validator::make($request->all(), [
                'destinatario' => 'required|email',
                'asunto' => 'required|string',
                'boleta' => 'required',
            ]);

            if ($validator->fails()) {
                Log::error('Validación fallida', ['errors' => $validator->errors()]);
                return response()->json([
                    'success' => false,
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            $destinatario = $request->input('destinatario');
            $asunto = $request->input('asunto');
            $boleta = $request->input('boleta');

            Log::info('Datos de boleta a enviar', ['boleta' => $boleta]);

            // Aquí envías el correo con la boleta
            Mail::send('emails.boleta', ['boleta' => $boleta], function ($message) use ($destinatario, $asunto) {
                $message->to($destinatario)
                        ->subject($asunto);
            });

            // Verificar si hubo errores en el envío
            $errors = Mail::failures();
            if (count($errors) > 0) {
                Log::error('Errores al enviar correo', ['errors' => $errors]);
                return response()->json([
                    'success' => false,
                    'message' => 'No se pudo enviar el correo',
                    'errors' => $errors
                ], 500);
            }

            Log::info('Correo enviado correctamente');
            return response()->json([
                'success' => true,
                'message' => 'Correo enviado correctamente'
            ]);
        } catch (Exception $e) {
            Log::error('Error al enviar email: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error al enviar el correo: ' . $e->getMessage()
            ], 500);
        }
    }
}