<?php
namespace App\Http\Resources\Olimpiada;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OlimpiadaResource extends JsonResource
{
    public static $wrap = "olimpiada";

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id_olimpiada,
            'nombre_olimpiada' => $this->nombre_olimpiada,
            'descripcion_olimpiada' => $this->descripcion_olimpiada,
            'presentacion' => $this->presentacion,
            'fecha_inscripcion_inicio' => $this->fecha_inscripcion_inicio,
            'fecha_inscripcion_final' => $this->fecha_inscripcion_final,
            'fecha_inicio' => $this->fecha_inicio,
            'fecha_final' => $this->fecha_final,
            'premios' => $this->premios,
            'requisitos' => $this->requisitos,
            'informacion_adicional' => $this->informacion_adicional,
            'areas' => $this->whenLoaded('areas'),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
