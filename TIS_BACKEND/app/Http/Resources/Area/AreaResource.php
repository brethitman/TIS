<?php

namespace App\Http\Resources\Area;

use App\Http\Resources\Curso\CursoResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AreaResource extends JsonResource
{
    public static $wrap = "area";

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
   // app/Http/Resources/Area/AreaResource.php
public function toArray(Request $request): array
{
    return [
        'id' => $this->id_area,
        'id_olimpiada' => $this->id_olimpiada,
        'nombre_area' => $this->nombre_area,
        'descripcion' => $this->descripcion,
        'gradoIniAr' => $this->gradoIniAr, // Asegúrate que estos campos existan
        'gradoFinAr' => $this->gradoFinAr,
        'createdAt' => $this->created_at->toISOString(),
        'updatedAt' => $this->updated_at->toISOString(),
        'olimpiada' => $this->whenLoaded('olimpiada'),
        'niveles' => $this->whenLoaded('nivelCategorias'),
        'cursos' => CursoResource::collection($this->whenLoaded('cursos')) // Línea añadida
    ];
}
}
