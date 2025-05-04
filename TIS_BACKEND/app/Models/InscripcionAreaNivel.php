<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot; // Usar Pivot

/**
 * Modelo para la tabla pivote 'inscripcion_area_nivel'.
 * Representa la asociación entre una inscripción, un área y un nivel.
 * Se utiliza para relaciones many-to-many con datos adicionales (id_area en este caso, aunque redundante con id_nivel).
 */
class InscripcionAreaNivel extends Pivot
{
    use HasFactory;

    // Especifica el nombre de la tabla
    protected $table = 'inscripcion_area_nivel';

    // Especifica la clave primaria (si la tabla pivote tiene una PK autoincremental)
    protected $primaryKey = 'id';

    // Especifica el tipo de dato de la clave primaria
    protected $keyType = 'int'; // O 'bigint'

    // Indica si la clave primaria es autoincremental (por defecto es true para Pivot)
    public $incrementing = true;

    // Define los campos que pueden ser asignados masivamente
    protected $fillable = [
        'id_inscripcion',
        'id_area',
        'id_nivel',
    ];

    // Laravel por defecto maneja created_at y updated_at si existen en la tabla
    public $timestamps = true;

    /**
     * Relación: Esta entrada pivote pertenece a una Inscripción.
     */
    public function inscripcion()
    {
        return $this->belongsTo(Inscripcion::class, 'id_inscripcion', 'id_inscripcion');
    }

    /**
     * Relación: Esta entrada pivote pertenece a un Área.
     */
    public function area()
    {
        return $this->belongsTo(Area::class, 'id_area', 'id_area');
    }

    /**
     * Relación: Esta entrada pivote pertenece a un NivelCategoria.
     */
    public function nivelCategoria()
    {
        return $this->belongsTo(NivelCategoria::class, 'id_nivel', 'id_nivel');
    }
}
