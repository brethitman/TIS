<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoletaPago extends Model
{
    use HasFactory;

    protected $table = 'boleta_pagos';
    protected $primaryKey = 'id_boleta';

    protected $fillable = [
        'id_inscripcion',
        'numero_boleta',
        'monto',
        'fecha_generacion'
    ];

    /**
     * Los atributos que deben convertirse a tipos nativos.
     *
     * @var array
     */
    protected $casts = [
        'fecha_generacion' => 'date',
        'monto' => 'decimal:2',
    ];

    /**
     * Obtener la inscripción relacionada con esta boleta de pago
     */
    public function inscripcion()
    {
        return $this->belongsTo(Inscripcion::class, 'id_inscripcion', 'id_inscripcion');
    }

    /**
     * Obtener los comprobantes de pago relacionados con esta boleta
     */
    public function comprobantesPago()
    {
        return $this->hasMany(ComprobantePago::class, 'id_boleta', 'id_boleta');
    }
}
