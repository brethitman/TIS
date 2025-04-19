<?php

namespace App\Http\Resources\Olimpiada;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OlimpiadaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id_olimpiada,
            'nombre_olimpiada' => $this->nombre_olimpiada,
            'descripcion_olimpiada' => $this->descripcion_olimpiada,
            'fecha_inicio' => $this->fecha_inicio,
            'fecha_final' => $this->fecha_final,
            'areas' => $this->whenLoaded('areas'),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
