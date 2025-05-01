<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modelo para la tabla 'olimpiadas'.
 * Representa una olimpiada específica con sus detalles.
 */
class Olimpiada extends Model
{
    use HasFactory;

    // Especifica el nombre de la tabla si no sigue la convención de nombres plurales de Laravel
    protected $table = 'olimpiadas';

    // Especifica la clave primaria si no es 'id'
    protected $primaryKey = 'id_olimpiada';

    // Indica si la clave primaria es autoincremental (por defecto es true)
    public $incrementing = true;

    // Especifica el tipo de dato de la clave primaria
    protected $keyType = 'int'; // O 'bigint' si es necesario, pero 'int' suele ser suficiente para PKs

    // Define los campos que pueden ser asignados masivamente
    protected $fillable = [
        'nombre_olimpiada',
        'descripcion_olimpiada',
        'fecha_inicio',
        'fecha_final',
    ];

    // Define los campos que deben ser tratados como fechas
    protected $dates = [
        'fecha_inicio',
        'fecha_final',
        'created_at',
        'updated_at',
    ];

    /**
     * Relación: Una Olimpiada tiene muchas Áreas.
     */
    public function areas()
    {
        return $this->hasMany(Area::class, 'id_olimpiada', 'id_olimpiada');
    }
}
