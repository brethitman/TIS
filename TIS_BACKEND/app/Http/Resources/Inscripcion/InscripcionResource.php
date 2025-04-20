<?php

namespace App\Http\Resources\Inscripcion;

use App\Http\Resources\Area\AreaResource;
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
            'fecha_inscripcion' => $this->fecha_inscripcion->toISOString(),
            'estado' => $this->estado,
            'olimpistas' => OlimpistaResource::collection($this->whenLoaded('olimpistas')),
            'tutors' => TutorResource::collection($this->whenLoaded('tutors')),
            'boletas_pago' => BoletaPagoResource::collection($this->whenLoaded('boletas_pago')),
            'areas' => AreaResource::collection($this->whenLoaded('areas')),
            'createdAt' => $this->created_at->toISOString(),
            'updatedAt' => $this->updated_at->toISOString(),
        ];
    }
}
