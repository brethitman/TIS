<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComprobantePago extends Model
{
    use HasFactory;

    protected $table = 'comprobante_pagos';
    protected $primaryKey = 'id_comprobante';

    protected $fillable = [
        'id_boleta',
        'archivo_comprobante',
        'numero_comprobante',
        'nombre_pagador',
        'estado_verificacion',
        'fecha_subida'
    ];

    /**
     * Los atributos que deben convertirse a tipos nativos.
     *
     * @var array
     */
    protected $casts = [
        'fecha_subida' => 'date',
    ];

    /**
     * Obtener la boleta de pago relacionada con este comprobante
     */
    public function boletaPago()
    {
        return $this->belongsTo(BoletaPago::class, 'id_boleta', 'id_boleta');
    }


}
