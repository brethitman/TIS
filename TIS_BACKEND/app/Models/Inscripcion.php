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
        'id_olimpista',
        'id_area',
        'id_tutor',
        'fecha_inscripcion',
        'estado'
    ];

    /**
     * Los atributos que deben convertirse a tipos nativos.
     *
     * @var array
     */
    protected $casts = [
        'fecha_inscripcion' => 'date',
    ];

    /**
     * Obtener el olimpista relacionado con esta inscripción
     */
    public function olimpista()
    {
        return $this->belongsTo(Olimpista::class, 'id_olimpista', 'id_olimpista');
    }

    /**
     * Obtener el área relacionada con esta inscripción
     */
    public function area()
    {
        return $this->belongsTo(Area::class, 'id_area', 'id_area');
    }

    /**
     * Obtener el tutor relacionado con esta inscripción
     */
    public function tutor()
    {
        return $this->belongsTo(Tutor::class, 'id_tutor', 'id_tutor');
    }

    /**
     * Obtener las boletas de pago relacionadas con esta inscripción
     */
    public function boletasPago()
    {
        return $this->hasMany(BoletaPago::class, 'id_inscripcion', 'id_inscripcion');
    }
}
