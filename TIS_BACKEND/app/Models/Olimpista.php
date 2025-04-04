<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Olimpista extends Model
{
    use HasFactory;

    protected $table = 'olimpistas';
    protected $primaryKey = 'id_olimpista';

    protected $fillable = [
        'nombres',
        'apellidos',
        'ci',
        'fecha_nacimiento',
        'correo',
        'telefono',
        'colegio',
        'curso',
        'departamento',
        'provincia'
    ];

    /**
     * Obtener las inscripciones del olimpista
     */
    public function inscripciones()
    {
        return $this->hasMany(Inscripcion::class, 'id_olimpista', 'id_olimpista');
    }
}
