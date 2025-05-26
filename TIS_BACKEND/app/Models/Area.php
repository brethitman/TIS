<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'areas';

    // Clave primaria
    protected $primaryKey = 'id_area';

    // Tipo de clave primaria (elimina si no usas auto-incrementing)
    protected $keyType = 'int';

    // Campos asignables masivamente (ajustados a tu estructura de tabla)
    protected $fillable = [
        'id_olimpiada',
        'nombre_area',
        'descripcion'
    ];

    // Campos de timestamp (activados por defecto)
    public $timestamps = true;

    /**
     * Relación con Olimpiada
     */
    public function olimpiada()
    {
        return $this->belongsTo(Olimpiada::class, 'id_olimpiada', 'id_olimpiada');
    }

    /**
     * Relación con NivelCategoria (versión simplificada)
     */
    public function nivelCategorias()
    {
        return $this->hasMany(NivelCategoria::class, 'id_area');
    }

    /**
     * Relación con Inscripciones a través de tabla pivote (mejorada)
     */
    public function inscripciones()
    {
        return $this->belongsToMany(Inscripcion::class, 'inscripcion_area_nivel', 'id_area', 'id_inscripcion')
                    ->using(InscripcionAreaNivel::class)
                    ->withTimestamps();
    }

    /**
     * Relación con Cursos (solo si existe la tabla pivote curso_area)
     */
    public function cursos()
    {
        return $this->belongsToMany(Curso::class, 'curso_area', 'id_area', 'id_curso');
    }
}
