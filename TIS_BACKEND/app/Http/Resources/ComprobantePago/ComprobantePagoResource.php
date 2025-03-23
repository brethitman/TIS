<?php
namespace App\Http\Resources\ComprobantePago;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComprobantePagoResource extends JsonResource
{
    public static $wrap = "comprobante_pago";

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id_comprobante,
            'idBoleta' => $this->id_boleta,
            'archivoComprobante' => asset('storage/' . $this->archivo_comprobante),
            'numeroComprobante' => $this->numero_comprobante,
            'nombrePagador' => $this->nombre_pagador,
            'estadoVerificacion' => $this->estado_verificacion,
            'fechaSubida' => $this->fecha_subida,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'boletaPago' => new \App\Http\Resources\BoletaPago\BoletaPagoResource($this->whenLoaded('boletaPago')),
        ];
    }

}
