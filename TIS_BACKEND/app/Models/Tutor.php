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
        'id_inscripcion',
        'nombres',
        'apellidos',
        'ci',
        'correo',
        'telefono'
    ];



    public function inscripcion()
    {
        return $this->belongsTo(Inscripcion::class, 'id_inscripcion', 'id_inscripcion');
    }

}
