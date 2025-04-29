<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modelo para la tabla 'boleta_pagos'.
 * Representa la boleta de pago generada para una inscripción.
 */
class BoletaPago extends Model
{
    use HasFactory;

    // Especifica el nombre de la tabla
    protected $table = 'boleta_pagos';

    // Especifica la clave primaria
    protected $primaryKey = 'id_boleta';

    // Especifica el tipo de dato de la clave primaria
    protected $keyType = 'int'; // O 'bigint'

    // Define los campos que pueden ser asignados masivamente
    protected $fillable = [
        'id_inscripcion',
        'numero_boleta',
        'monto',
        'fecha_generacion',
    ];

    // Define los campos que deben ser tratados como fechas
    protected $dates = [
        'fecha_generacion',
        'created_at',
        'updated_at',
    ];

    /**
     * Relación: Una BoletaPago pertenece a una Inscripción.
     */
    public function inscripcion()
    {
        return $this->belongsTo(Inscripcion::class, 'id_inscripcion', 'id_inscripcion');
    }

    /**
     * Relación: Una BoletaPago tiene muchos ComprobantePagos (aunque la lógica sugiere que solo debería tener uno).
     * Si permites múltiples subidas de comprobantes para una boleta, esta relación es correcta.
     * Si solo se permite un comprobante por boleta, debería ser hasOne.
     * Basado en el esquema (id_boleta en comprobante_pagos), es una relación uno-a-muchos.
     */
    public function comprobantePagos()
    {
        return $this->hasMany(ComprobantePago::class, 'id_boleta', 'id_boleta');
    }
}
