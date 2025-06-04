<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modelo para la tabla 'olimpistas'.
 * Representa a un participante (olimpista) individual dentro de una inscripción.
 */
class Olimpista extends Model
{
    use HasFactory;

    // Especifica el nombre de la tabla
    protected $table = 'olimpistas';

    // Especifica la clave primaria
    protected $primaryKey = 'id_olimpista';

    // Especifica el tipo de dato de la clave primaria
    protected $keyType = 'int'; // O 'bigint'

    // Define los campos que pueden ser asignados masivamente
    protected $fillable = [
        'id_inscripcion',
        'nombres',
        'apellidos',
        'ci',
        'fecha_nacimiento',
        'correo',
        'telefono',
        'colegio',
        'curso',
        'departamento',
        'provincia',
    ];

    // Define los campos que deben ser tratados como fechas
    protected $dates = [
        'fecha_nacimiento',
        'created_at',
        'updated_at',
    ];

    /**
     * Relación: Un Olimpista pertenece a una Inscripción.
     */
    public function inscripcion()
    {
        return $this->belongsTo(Inscripcion::class, 'id_inscripcion', 'id_inscripcion');
    }
}
