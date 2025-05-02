<?php

namespace App\Http\Resources\CursoNivel;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CursoNivelCollection extends ResourceCollection
{

    public static $wrap = "curso_nivel";
    public $collects = CursoNivelResource::class;
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
