<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BoletaMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $pdf;

    public function __construct($pdf)
    {
        $this->pdf = $pdf;
    }

    public function build()
    {
        return $this->view('emails.boleta')
                   ->subject('Tu boleta de pago')
                   ->attachData($this->pdf->output(), 'boleta_pago.pdf');
    }
}