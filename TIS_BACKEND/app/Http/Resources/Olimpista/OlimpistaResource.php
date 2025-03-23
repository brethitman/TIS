<?php

namespace App\Http\Resources\Olimpista;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OlimpistaResource extends JsonResource
{
    public static $wrap = "olimpista";

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id_olimpista,
            'nombres' => $this->nombres,
            'apellidos' => $this->apellidos,
            'ci' => $this->ci,
            'fecha_nacimiento' => $this->fecha_nacimiento,
            'correo' => $this->correo,
            'telefono' => $this->telefono,
            'colegio' => $this->colegio,
            'curso' => $this->curso,
            'departamento' => $this->departamento,
            'provincia' => $this->provincia,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
