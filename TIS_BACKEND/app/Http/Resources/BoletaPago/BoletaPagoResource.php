<?php

namespace App\Http\Resources\BoletaPago;

use App\Http\Resources\Inscripcion\InscripcionResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BoletaPagoResource extends JsonResource
{
    public static $wrap = "boletaPago";

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id_boleta,
            'numero_boleta' => $this->numero_boleta,
            'monto' => $this->monto,
            'fecha_generacion' => $this->fecha_generacion,
            'inscripcion' => new InscripcionResource($this->whenLoaded('inscripcion')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
