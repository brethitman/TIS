<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot; // Usar Pivot

/**
 * Modelo para la tabla pivote 'curso_nivel'.
 * Representa la asociación entre un curso y un nivel de categoría.
 * Se utiliza para relaciones many-to-many.
 */
class CursoNivel extends Pivot
{
    use HasFactory;

    // Especifica el nombre de la tabla
    protected $table = 'curso_nivel';

    // Especifica la clave primaria (si la tabla pivote tiene una PK autoincremental)
    protected $primaryKey = 'id_curso_nivel';

    // Especifica el tipo de dato de la clave primaria
    protected $keyType = 'int'; // O 'bigint'

    // Indica si la clave primaria es autoincremental (por defecto es true para Pivot)
    public $incrementing = true;

    // Define los campos que pueden ser asignados masivamente
    protected $fillable = [
        'id_curso',
        'id_nivel',
    ];

    // Esta tabla no parece tener timestamps created_at/updated_at en tu esquema original
    public $timestamps = false;

    /**
     * Relación: Esta entrada pivote pertenece a un Curso.
     */
    public function curso()
    {
        return $this->belongsTo(Curso::class, 'id_curso', 'id_curso');
    }

    /**
     * Relación: Esta entrada pivote pertenece a un NivelCategoria.
     */
    public function nivelCategoria()
    {
        return $this->belongsTo(NivelCategoria::class, 'id_nivel', 'id_nivel');
    }
}
