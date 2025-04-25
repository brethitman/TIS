<?php

namespace App\Http\Resources\NivelCategoria;

use App\Http\Resources\Area\AreaResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NivelCategoriaResource extends JsonResource
{
    public static $wrap = "nivelCategoria";

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id_nivel,
            'nombre_nivel' => $this->nombre_nivel,
            'descripcion' => $this->descripcion,
            'fecha_examen' => $this->fecha_examen,
            'costo' => $this->costo,
            'habilitacion' => $this->habilitacion,
            'area' => new AreaResource($this->whenLoaded('area')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
