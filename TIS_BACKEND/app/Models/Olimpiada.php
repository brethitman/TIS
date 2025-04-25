<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Olimpiada extends Model
{
    use HasFactory;

    protected $table = 'olimpiadas';
    protected $primaryKey = 'id_olimpiada';

    protected $fillable = [
        'nombre_olimpiada',
        'descripcion_olimpiada',
        'fecha_inicio',
        'fecha_final'
    ];

    protected $casts = [
        'fecha_inicio' => 'date',
        'fecha_final' => 'date',
    ];

    public function areas()
    {
        return $this->hasMany(Area::class, 'id_olimpiada', 'id_olimpiada');
    }
}
