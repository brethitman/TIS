<?php

namespace App\Http\Resources\Inscripcion;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class InscripcionCollection extends ResourceCollection
{
    public static $wrap = "inscripciones";
    public $collects = InscripcionResource::class;

    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
}
