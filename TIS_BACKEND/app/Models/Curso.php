<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modelo para la tabla 'curso'.
 * Representa un curso o grado escolar.
 */
class Curso extends Model
{
    use HasFactory;

    // Especifica el nombre de la tabla
    protected $table = 'curso';

    // Especifica la clave primaria
    protected $primaryKey = 'id_curso';

    // Especifica el tipo de dato de la clave primaria
    protected $keyType = 'int'; // O 'bigint'

    // Define los campos que pueden ser asignados masivamente
    protected $fillable = [
        'nameCurso',
    ];

    // Esta tabla no parece tener timestamps created_at/updated_at en tu esquema original
    public $timestamps = false;

    /**
     * Relación: Un Curso puede estar asociado con muchos NivelCategorias a través de la tabla pivote curso_nivel.
     */
    public function nivelCategorias()
    {
        return $this->belongsToMany(NivelCategoria::class, 'curso_nivel', 'id_curso', 'id_nivel')
                    ->using(CursoNivel::class); // Usar el modelo de la tabla pivote
                    // ->withTimestamps(); // Si la tabla pivote tuviera created_at y updated_at
    }
}
