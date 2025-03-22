<?php

namespace App\Http\Resources\Inscripcion;

use App\Http\Resources\Area\AreaResource;
use App\Http\Resources\Olimpista\OlimpistaResource;
use App\Http\Resources\Tutor\TutorResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InscripcionResource extends JsonResource
{
    public static $wrap = "inscripcion";

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id_inscripcion,
            'fecha_inscripcion' => $this->fecha_inscripcion,
            'estado' => $this->estado,
            'olimpista' => new OlimpistaResource($this->whenLoaded('olimpista')),
            'area' => new AreaResource($this->whenLoaded('area')),
            'tutor' => new TutorResource($this->whenLoaded('tutor')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
