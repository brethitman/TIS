<?php

namespace App\Http\Resources\CursoNivel;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CursoNivelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id_curso_nivel,
            'id_curso' => $this->id_curso,
            'id_nivel' => $this->id_nivel,
            'createdAt' => $this->created_at ?? null,
            'updatedAt' => $this->updated_at ?? null,
        ];
    }
}
