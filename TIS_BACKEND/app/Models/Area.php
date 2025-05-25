<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modelo para la tabla 'areas'.
 * Representa un área temática dentro de una olimpiada.
 */
class Area extends Model
{
    use HasFactory;

    // Especifica el nombre de la tabla
    protected $table = 'areas';

    // Especifica la clave primaria
    protected $primaryKey = 'id_area';

    // Especifica el tipo de dato de la clave primaria
    protected $keyType = 'int'; // O 'bigint'

    // Define los campos que pueden ser asignados masivamente
    protected $fillable = [
        'id_olimpiada',
        'nombre_area',
        'descripcion',
        'gradoIniAr',
        'gradoFinAr',
    ];

    /**
     * Relación: Un Área pertenece a una Olimpiada.
     */
    public function olimpiada()
    {
        return $this->belongsTo(Olimpiada::class, 'id_olimpiada', 'id_olimpiada');
    }

    /**
     * Relación: Un Área tiene muchas NivelCategorias.
     */
    public function nivelCategorias()
    {
        return $this->hasMany(NivelCategoria::class, 'id_area', 'id_area');
    }

    /**
     * Relación: Un Área puede estar en muchas Inscripciones a través de la tabla pivote inscripcion_area_nivel.
     * Nota: Aunque la tabla pivote guarda id_area, la relación belongsToMany
     * generalmente se define entre Inscripcion y NivelCategoria, y se accede al área
     * a través del NivelCategoria. Sin embargo, si necesitas acceder directamente
     * a las áreas seleccionadas para una inscripción, esta relación es útil.
     * Para este esquema, la relación principal es Inscripcion <-> NivelCategoria
     * a través de la tabla pivote. La relación con Area es implícita via NivelCategoria.
     * Mantendremos esta relación si necesitas listar las áreas que contienen
     * niveles seleccionados en una inscripción.
     */
    public function inscripciones()
    {
        return $this->belongsToMany(Inscripcion::class, 'inscripcion_area_nivel', 'id_area', 'id_inscripcion')
                    ->using(InscripcionAreaNivel::class) // Usar el modelo de la tabla pivote
                    ->withTimestamps(); // Si la tabla pivote tiene created_at y updated_at
    }



    public function cursos()
    {
        return $this->belongsToMany(Curso::class, 'curso_area', 'id_area', 'id_curso');
    }



public function niveles() {
    return $this->hasMany(NivelCategoria::class, 'id_area', 'id_area');
}
}
