<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class EnviarBoletaPago extends Mailable
{
    use Queueable, SerializesModels;

    public $boletaData;
    public $pdfContent;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($boletaData, $pdfContent)
    {
        $this->boletaData = $boletaData;
        $this->pdfContent = $pdfContent;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Comprobante de Inscripción - Boleta de Pago')
                    ->view('emails.boleta-pago')
                    ->attachData($this->pdfContent, 'boleta_pago_'.$this->boletaData['numero_boleta'].'.pdf', [
                        'mime' => 'application/pdf',
                    ]);
    }
}