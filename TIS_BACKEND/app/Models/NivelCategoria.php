<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NivelCategoria extends Model
{
    use HasFactory;

    protected $table = 'nivel_categorias';
    protected $primaryKey = 'id_nivel';

    protected $fillable = [
        'id_area',
        'nombre_nivel',
        'descripcion'
    ];

    /**
     * Obtener el área relacionada con este nivel/categoría
     */
    public function area()
    {
        return $this->belongsTo(Area::class, 'id_area', 'id_area');
    }
}
