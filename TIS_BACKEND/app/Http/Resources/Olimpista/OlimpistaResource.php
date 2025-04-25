<?php

namespace App\Http\Resources\Olimpista;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OlimpistaResource extends JsonResource
{
    /**
     * The "data" wrapper that should be applied to the resource array.
     *
     * @var string|null
     */
    public static $wrap = 'olimpista';

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id_olimpista,
            'id_inscripcion' => $this->id_inscripcion,
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
            'inscripcion' => $this->whenLoaded('inscripcion'), // Carga condicional de la relación
        ];
    }
}
