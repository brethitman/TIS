<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscripcion extends Model
{
    use HasFactory;

    protected $table = 'inscripcions';
    protected $primaryKey = 'id_inscripcion';
    protected $keyType = 'int';

    protected $fillable = [
        'estado',
        'fecha_inscripcion'
    ];

    protected $casts = [
        'fecha_inscripcion' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function olimpistas()
    {
        return $this->hasMany(Olimpista::class, 'id_inscripcion');
    }


    public function tutors()
    {
        return $this->hasMany(Tutor::class, 'id_inscripcion');
    }



    public function boletaPago()
    {
        return $this->hasOne(BoletaPago::class, 'id_inscripcion');
    }



    public function nivelCategorias()
    {
        return $this->belongsToMany(NivelCategoria::class, 'inscripcion_area_nivel', 'id_inscripcion', 'id_nivel')
            ->withPivot('id_area')
            ->withTimestamps();
    }





}
