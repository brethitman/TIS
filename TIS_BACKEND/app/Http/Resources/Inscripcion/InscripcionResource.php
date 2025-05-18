<?php

namespace App\Http\Resources\Inscripcion;

use App\Http\Resources\NivelCategoria\NivelCategoriaResource;
use App\Http\Resources\BoletaPago\BoletaPagoResource;
use App\Http\Resources\Olimpista\OlimpistaResource;
use App\Http\Resources\Tutor\TutorResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InscripcionResource extends JsonResource
{
    public static $wrap = 'inscripcion';

    public function toArray(Request $request): array
    {
        return [
           'id' => $this->id_inscripcion,
        'estado' => $this->estado,
        'created_at' => $this->created_at->toDateTimeString(),
            // Relaciones
            'olimpistas' => OlimpistaResource::collection($this->whenLoaded('olimpistas')),
            'tutors' => TutorResource::collection($this->whenLoaded('tutors')),
            'boleta_pago' => BoletaPagoResource::make($this->whenLoaded('boletaPago')),
            'niveles_seleccionados' => NivelCategoriaResource::collection($this->whenLoaded('nivelCategorias')),

            // Eliminar 'fecha_inscripcion' y usar solo created_at

            'updated_at' => $this->updated_at->toIso8601String()
        ];
    }
}
