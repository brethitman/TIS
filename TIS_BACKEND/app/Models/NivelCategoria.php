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
        'descripcion',
        'fecha_examen',
        'costo',
        'habilitacion',
    ];

    protected $casts = [
        'fecha_examen' => 'date',
        'costo' => 'decimal:2', // Cambiado a decimal para coincidir con BD
        'habilitacion' => 'boolean',
    ];

    public function area()
    {
        return $this->belongsTo(Area::class, 'id_area', 'id_area');
    }

    public function inscripciones()
    {
        return $this->hasMany(Inscripcion::class, 'id_nivel', 'id_nivel');
    }
}
