<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;

    protected $table = 'areas';
    protected $primaryKey = 'id_area';

    protected $fillable = [
        'nombre_area',
        'costo'
    ];


    protected $casts = [
        'costo' => 'decimal:2',  // Esto asegura que 'costo' sea un decimal con 2 decimales
    ];

    /**
     * Obtener las inscripciones relacionadas con esta área
     */
    public function inscripciones()
    {
        return $this->hasMany(Inscripcion::class, 'id_area', 'id_area');
    }

    /**
     * Obtener los niveles o categorías relacionados con esta área
     */
    public function nivelCategorias()
    {
        return $this->hasMany(NivelCategoria::class, 'id_area', 'id_area');
    }
}
