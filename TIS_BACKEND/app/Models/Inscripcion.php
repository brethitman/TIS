<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscripcion extends Model
{
    use HasFactory;

    protected $table = 'inscripcions';
    protected $primaryKey = 'id_inscripcion';


    protected $fillable = [
        'fecha_inscripcion',
        'estado'
    ];

    protected $casts = [
        'fecha_inscripcion' => 'date',
    ];

    public function boletasPago()
    {
        return $this->hasMany(BoletaPago::class, 'id_inscripcion', 'id_inscripcion');
    }

    public function tutors()
    {
        return $this->hasMany(Tutor::class, 'id_inscripcion', 'id_inscripcion');
    }

    public function olimpistas()
    {
        return $this->hasMany(Olimpista::class, 'id_inscripcion', 'id_inscripcion');
    }

    public function areas()
    {
        return $this->hasMany(Area::class, 'id_inscripcion', 'id_inscripcion');
    }


}
