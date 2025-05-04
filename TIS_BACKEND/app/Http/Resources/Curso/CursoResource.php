<?php

namespace App\Http\Resources\Curso;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CursoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id_curso,
            'nameCurso' => $this->nameCurso,
            'nivelCategorias' => $this->whenLoaded('nivelCategorias'),
        ];
    }
}
