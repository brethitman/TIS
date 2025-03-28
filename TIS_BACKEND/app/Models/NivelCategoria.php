<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NivelCategoria extends Model
{
    use HasFactory;

    // Definir la tabla y la clave primaria
    protected $table = 'nivel_categorias';
    protected $primaryKey = 'id_nivel';

    // Definir los campos que se pueden asignar masivamente
    protected $fillable = [
        //'id_area',
        'nombre_nivel',
        'descripcion',
        'fecha_examen',
        'costo',
        'habilitacion',
    ];

    // Castear algunos campos para que se manejen de forma correcta
    protected $casts = [
        'fecha_examen' => 'string',
        'costo' => 'decimal:2',
        'habilitacion' => 'boolean',
    ];

    // Definir la relación con el modelo Area
    public function area()
    {
        return $this->belongsTo(Area::class, 'id_area', 'id_area');
    }

    // Establecer un valor predeterminado para habilitacion si no se pasa en la solicitud
    protected $attributes = [
        'habilitacion' => false, // Si no se pasa, se asignará como false
    ];
}
