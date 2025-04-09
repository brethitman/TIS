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

    // Eliminar relación con inscripciones ya que en BD se relaciona con nivel
}
