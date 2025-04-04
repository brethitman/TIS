<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tutor extends Model
{
    use HasFactory;

    protected $table = 'tutors';
    protected $primaryKey = 'id_tutor';

    protected $fillable = [
        'nombres',
        'apellidos',
        'ci',
        'correo',
        'telefono'
    ];

    /**
     * Obtener las inscripciones relacionadas con el tutor
     */
    public function inscripciones()
    {
        return $this->hasMany(Inscripcion::class, 'id_tutor', 'id_tutor');
    }
}
