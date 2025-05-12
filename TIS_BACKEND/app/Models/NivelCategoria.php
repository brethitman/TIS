<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modelo para la tabla 'nivel_categorias'.
 * Representa un nivel o categoría específica dentro de un área.
 */
class NivelCategoria extends Model
{
    use HasFactory;

    // Especifica el nombre de la tabla
    protected $table = 'nivel_categorias';

    // Especifica la clave primaria
    protected $primaryKey = 'id_nivel';

    // Especifica el tipo de dato de la clave primaria
    protected $keyType = 'int'; // O 'bigint'

    // Define los campos que pueden ser asignados masivamente
    protected $fillable = [
        'id_area',
        'nombre_nivel',
        'descripcion',
        'fecha_examen',
        'costo',
        'habilitacion',
        'gradoIniCat',
        'gradoFinCat',
    ];

    // Define los campos que deben ser tratados como fechas
    protected $dates = [
        'fecha_examen',
        'created_at',
        'updated_at',
    ];
    // En NivelCategoria.php
protected $casts = [
    'habilitacion' => 'boolean',
    'fecha_examen' => 'date:Y-m-d',
    'costo' => 'decimal:2'
];

    /**
     * Relación: Un NivelCategoria pertenece a un Área.
     */
    public function area()
    {
        return $this->belongsTo(Area::class, 'id_area', 'id_area');
    }

    /**
     * Relación: Un NivelCategoria puede estar en muchas Inscripciones a través de la tabla pivote inscripcion_area_nivel.
     */
    public function inscripciones()
    {
        return $this->belongsToMany(Inscripcion::class, 'inscripcion_area_nivel', 'id_nivel', 'id_inscripcion')
                    ->using(InscripcionAreaNivel::class) // Usar el modelo de la tabla pivote
                    ->withTimestamps(); // Si la tabla pivote tiene created_at y updated_at
    }

    /**
     * Relación: Un NivelCategoria puede estar asociado con muchos Cursos a través de la tabla pivote curso_nivel.
     */
    public function cursos()
    {
        return $this->belongsToMany(Curso::class, 'curso_nivel', 'id_nivel', 'id_curso')
                    ->using(CursoNivel::class); // Usar el modelo de la tabla pivote
    }
}
