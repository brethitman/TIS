<?php

namespace App\Http\Resources\Curso;

use App\Models\Curso;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CursoCollection extends ResourceCollection
{

    public static $wrap = "cursos";
    public $collects = CursoResource::class;
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
