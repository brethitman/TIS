<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modelo para la tabla 'inscripcions'.
 * Representa una inscripción completa realizada por uno o varios olimpistas y tutores.
 */
class Inscripcion extends Model
{
    use HasFactory;

    // Especifica el nombre de la tabla
    protected $table = 'inscripcions';

    // Especifica la clave primaria
    protected $primaryKey = 'id_inscripcion';

    // Especifica el tipo de dato de la clave primaria
    protected $keyType = 'int'; // O 'bigint'

    // Define los campos que pueden ser asignados masivamente
    protected $fillable = [

        'estado',
    ];

    // Define los campos que deben ser tratados como tipos de datos específicos
    protected $casts = [

        'created_at' => 'datetime', // Castear a datetime (objeto Carbon)
        'updated_at' => 'datetime', // Castear a datetime (objeto Carbon)
        // Si 'estado' es un ENUM, no necesitas castearlo a menos que quieras un tipo específico en PHP
        // 'estado' => \App\Enums\InscripcionEstado::class, // Ejemplo si usaras Enums en PHP
    ];

    // Ya no necesitamos la propiedad $dates si usamos $casts para las mismas columnas
    // protected $dates = [
    //     'fecha_inscripcion',
    //     'created_at',
    //     'updated_at',
    // ];


    /**
     * Relación: Una Inscripción tiene muchos Olimpistas.
     */
    public function olimpistas()
    {
        return $this->hasMany(Olimpista::class, 'id_inscripcion', 'id_inscripcion');
    }

    /**
     * Relación: Una Inscripción tiene muchos Tutores.
     */
    public function tutors()
    {
        return $this->hasMany(Tutor::class, 'id_inscripcion', 'id_inscripcion');
    }

    /**
     * Relación: Una Inscripción tiene una BoletaPago.
     */
    public function boletaPago()
    {
        return $this->hasOne(BoletaPago::class, 'id_inscripcion', 'id_inscripcion');
    }

    /**
     * Relación: Una Inscripción puede tener muchos NivelCategorias seleccionados a través de la tabla pivote inscripcion_area_nivel.
     */
    public function nivelCategorias()
    {
        return $this->belongsToMany(NivelCategoria::class, 'inscripcion_area_nivel', 'id_inscripcion', 'id_nivel')
                    ->using(InscripcionAreaNivel::class) // Usar el modelo de la tabla pivote
                    ->withPivot('id_area') // Incluir la columna id_area de la tabla pivote si necesitas acceder a ella
                    ->withTimestamps(); // Si la tabla pivote tiene created_at y updated_at
    }

    /**
     * Relación: Una Inscripción puede tener muchas Áreas seleccionadas (implícitamente a través de los niveles seleccionados)
     * a través de la tabla pivote inscripcion_area_nivel.
     * Esta relación es útil si quieres listar las áreas involucradas en una inscripción.
     */
    public function areas()
    {
         return $this->belongsToMany(Area::class, 'inscripcion_area_nivel', 'id_inscripcion', 'id_area')
                     ->using(InscripcionAreaNivel::class)
                     ->withTimestamps();
    }
}
