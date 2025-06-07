<?php

namespace App\Http\Resources;

use App\Http\Resources\ComprobantePago\ComprobantePagoResource;
use App\Models\ComprobantePago;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ComprobantePagoCollection extends ResourceCollection
{
    public static $wrap = "comprobante_pago";
    public $collects = ComprobantePagoResource::class;
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
