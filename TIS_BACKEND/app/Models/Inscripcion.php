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
        'id_nivel', // Solo id_nivel según BD
        'id_tutor',
        'fecha_inscripcion',
        'estado'
    ];

    protected $casts = [
        'fecha_inscripcion' => 'date',
    ];

    public function olimpista()
    {
        return $this->belongsTo(Olimpista::class, 'id_olimpista', 'id_olimpista');
    }

    public function tutor()
    {
        return $this->belongsTo(Tutor::class, 'id_tutor', 'id_tutor');
    }

    public function nivel()
    {
        return $this->belongsTo(NivelCategoria::class, 'id_nivel', 'id_nivel');
    }

    public function boletasPago()
    {
        return $this->hasMany(BoletaPago::class, 'id_inscripcion', 'id_inscripcion');
    }

    // Eliminar relación con area ya que no existe en BD
}
