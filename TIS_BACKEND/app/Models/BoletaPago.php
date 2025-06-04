<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoletaPago extends Model
{
    use HasFactory;

    protected $table = 'boleta_pagos';
    protected $primaryKey = 'id_boleta';
    protected $keyType = 'int';

    protected $fillable = [
        'id_inscripcion',
        'id_olimpista',
        'id_tutor',
        'numero_boleta',
        'monto',
        'fecha_generacion',
        'areas_niveles',
        'nombre_olimpiada'
    ];

    protected $casts = [
        'fecha_generacion' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'areas_niveles' => 'array', // Esto es CRUCIAL para el JSON
    ];

    public function inscripcion()
    {
        return $this->belongsTo(Inscripcion::class, 'id_inscripcion');
    }

    public function olimpista()
    {
        return $this->belongsTo(Olimpista::class, 'id_olimpista');
    }

    public function tutor()
    {
        return $this->belongsTo(Tutor::class, 'id_tutor');
    }
}
