<?php

namespace App\Http\Resources\NivelCategoria;

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
            'id' => $this->id_nivel,  // Asegúrate de que este nombre coincida con el campo real en la base de datos
            'nombre' => $this->nombre_nivel,
            'descripcion' => $this->descripcion,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];

    }
}
