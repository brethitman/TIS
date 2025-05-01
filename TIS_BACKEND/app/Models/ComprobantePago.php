<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modelo para la tabla 'comprobante_pagos'.
 * Representa el comprobante de pago subido por el usuario.
 */
class ComprobantePago extends Model
{
    use HasFactory;

    // Especifica el nombre de la tabla
    protected $table = 'comprobante_pagos';

    // Especifica la clave primaria
    protected $primaryKey = 'id_comprobante';

    // Especifica el tipo de dato de la clave primaria
    protected $keyType = 'int'; // O 'bigint'

    // Define los campos que pueden ser asignados masivamente
    protected $fillable = [
        'id_boleta',
        'archivo_comprobante',
        'numero_comprobante',
        'nombre_pagador',
        'estado_verificacion',
        'fecha_subida',
    ];

    // Define los campos que deben ser tratados como fechas
    protected $dates = [
        'fecha_subida',
        'created_at',
        'updated_at',
    ];

    /**
     * Relación: Un ComprobantePago pertenece a una BoletaPago.
     */
    public function boletaPago()
    {
        return $this->belongsTo(BoletaPago::class, 'id_boleta', 'id_boleta');
    }
}
