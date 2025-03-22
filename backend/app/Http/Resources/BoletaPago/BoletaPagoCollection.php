<?php

namespace App\Http\Resources\BoletaPago;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BoletaPagoCollection extends ResourceCollection
{
    public static $wrap = "boletasPago";
    public $collects = BoletaPagoResource::class;

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
