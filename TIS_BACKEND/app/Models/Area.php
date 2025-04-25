<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;

    protected $table = 'areas';
    protected $primaryKey = 'id_area';

    protected $fillable = [
        'id_olimpiada',
        'id_inscripcion',
        'nombre_area',
        'descripcion',
    ];

    public function olimpiada()
    {
        return $this->belongsTo(Olimpiada::class, 'id_olimpiada', 'id_olimpiada');
    }

    public function nivelCategorias()
    {
        return $this->hasMany(NivelCategoria::class, 'id_area', 'id_area');
    }

    /*
    public function inscripcion()
    {
        return $this->hasMany(Inscripcion::class, 'id_area', 'id_area');
    }

    */
    public function inscripcion()
    {
        return $this->belongsTo(Inscripcion::class, 'id_inscripcion', 'id_inscripcion'); // Aquí se manejará correctamente si 'id_inscripcion' es NULL
    }
}
