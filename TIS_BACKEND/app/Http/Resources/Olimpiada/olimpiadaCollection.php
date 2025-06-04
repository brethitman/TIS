<?php

namespace App\Http\Resources\Olimpiada;

use App\Http\Resources\Olimpiada\OlimpiadaResource;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class olimpiadaCollection extends ResourceCollection
{

    public static $wrap = "olimpiadas";
    public $collects = OlimpiadaResource::class;
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
