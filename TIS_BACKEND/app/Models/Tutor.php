<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modelo para la tabla 'tutors'.
 * Representa a un tutor asociado a una inscripción.
 */
class Tutor extends Model
{
    use HasFactory;

    // Especifica el nombre de la tabla
    protected $table = 'tutors';

    // Especifica la clave primaria
    protected $primaryKey = 'id_tutor';

    // Especifica el tipo de dato de la clave primaria
    protected $keyType = 'int'; // O 'bigint'

    // Define los campos que pueden ser asignados masivamente
    protected $fillable = [
        'id_inscripcion',
        'nombres',
        'apellidos',
        'ci',
        'correo',
        'telefono',
        'contacto',
    ];

    /**
     * Relación: Un Tutor pertenece a una Inscripción.
     */
    public function inscripcion()
    {
        return $this->belongsTo(Inscripcion::class, 'id_inscripcion', 'id_inscripcion');
    }
}
