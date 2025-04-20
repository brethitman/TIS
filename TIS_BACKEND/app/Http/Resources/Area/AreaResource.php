<?php

namespace App\Http\Resources\Area;

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
    public function toArray(Request $request): array
{
    return [
        'id' => $this->id_area,
        'id_olimpiada' => $this->id_olimpiada,
        'id_inscripcion' => $this->id_inscripcion, // Nuevo campo
        'nombre_area' => $this->nombre_area,
        'descripcion' => $this->descripcion,
        'createdAt' => $this->created_at,
        'updatedAt' => $this->updated_at,
        'olimpiada' => $this->whenLoaded('olimpiada'),
        'niveles' => $this->whenLoaded('nivelCategorias'),
        'inscripcion' => $this->whenLoaded('inscripcion'), // Nueva relación
    ];
}
}
