<?php

namespace App\Http\Resources\NivelCategoria;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\NivelCategoria\NivelCategoriaResource;


class NivelCategoriaCollection extends ResourceCollection
{
    public static $wrap = "nivelesCategoria";
    public $collects = NivelCategoriaResource::class;

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
