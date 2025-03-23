<?php

namespace App\Http\Resources\Tutor;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TutorResource extends JsonResource
{
    public static $wrap = "tutor";

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id_tutor,
            'nombres' => $this->nombres,
            'apellidos' => $this->apellidos,
            'ci' => $this->ci,
            'correo' => $this->correo,
            'telefono' => $this->telefono,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
