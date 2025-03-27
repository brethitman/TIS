<?php

namespace App\Http\Resources\Tutor;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TutorCollection extends ResourceCollection
{
    public static $wrap = "tutores";
    public $collects = TutorResource::class;

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
