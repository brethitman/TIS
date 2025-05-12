<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CursoAreaNivel extends Pivot
{
    protected $table = 'curso_area_nivel';

    protected $primaryKey = ['curso_id', 'area_id', 'nivel_id'];
    public $incrementing = false; // ¡Importante! Debe ser false

    protected $fillable = [
        'curso_id',
        'area_id',
        'nivel_id'
    ];

    // 3. Relaciones (correctas pero mejorables)
    public function curso()
    {
        return $this->belongsTo(Curso::class, 'curso_id', 'id_curso');
    }

    public function area()
    {
        return $this->belongsTo(Area::class, 'area_id', 'id_area');
    }

    public function nivel()
    {
        return $this->belongsTo(NivelCategoria::class, 'nivel_id', 'id_nivel');
    }

    public function scopeWhereCurso($query, $cursoId)
{
    return $query->where('curso_id', $cursoId);
}
}


