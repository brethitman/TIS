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
        'provincia'
    ];


    public function inscripcion()
    {
        return $this->belongsTo(Inscripcion::class, 'id_inscripcion', 'id_inscripcion');
    }
}
