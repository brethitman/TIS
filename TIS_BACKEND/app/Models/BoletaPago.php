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
        'fecha_generacion' => 'datetime', // Cambiado de 'date' a 'datetime'
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'areas_niveles' => 'array',
    ];

    // Relación con Inscripcion (ajustada para usar la clave correcta)
    public function inscripcion()
    {
        return $this->belongsTo(
            Inscripcion::class,
            'id_inscripcion', // Clave foránea en boleta_pagos
            'id_inscripcion' // Clave primaria en inscripcions
        );
    }

    // Relación con Olimpista (ajustada)
    public function olimpista()
    {
        return $this->belongsTo(
            Olimpista::class,
            'id_olimpista',
            'id_olimpista' // Asegurar que coincida con la clave primaria de Olimpista
        );
    }

    // Relación con Tutor (ajustada)
    public function tutor()
    {
        return $this->belongsTo(
            Tutor::class,
            'id_tutor',
            'id_tutor' // Clave primaria en tutors
        );
    }
}
