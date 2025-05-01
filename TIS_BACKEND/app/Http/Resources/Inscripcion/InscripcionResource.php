<?php

namespace App\Http\Resources\Inscripcion;

// Asegúrate de que estos Resources existan y estén correctamente definidos
// Si aún no los tienes, necesitarás crearlos
use App\Http\Resources\NivelCategoria\NivelCategoriaResource; // Cambiado de AreaResource
use App\Http\Resources\BoletaPago\BoletaPagoResource;
use App\Http\Resources\Olimpista\OlimpistaResource;
use App\Http\Resources\Tutor\TutorResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InscripcionResource extends JsonResource
{
    public static $wrap = 'inscripcion';

    /**
     * Transforma el recurso en un array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id_inscripcion,
            // Usar toIso8601String() para formato ISO 8601 en PHP
            'fecha_inscripcion' => $this->fecha_inscripcion ? $this->fecha_inscripcion->toIso8601String() : null,
            'estado' => $this->estado,

            // Usar el nombre de la relación definida en el modelo (singular para hasOne)
            // Usar whenLoaded para cargar condicionalmente la relación si fue eager loaded
            'olimpistas' => OlimpistaResource::collection($this->whenLoaded('olimpistas')),
            'tutors' => TutorResource::collection($this->whenLoaded('tutors')),
            // La relación es boletaPago (singular)
            'boleta_pago' => BoletaPagoResource::make($this->whenLoaded('boletaPago')), // Usar make() para un solo recurso

            // Cambiado para mostrar los niveles seleccionados directamente
            // Puedes acceder al área de cada nivel dentro del NivelCategoriaResource si es necesario
            'niveles_seleccionados' => NivelCategoriaResource::collection($this->whenLoaded('nivelCategorias')),

            // Si aún quieres exponer las áreas principales que contienen niveles seleccionados:
            // 'areas_con_niveles' => AreaResource::collection($this->whenLoaded('areas')),


            // Usar toIso8601String() para formato ISO 8601 en PHP
            'createdAt' => $this->created_at ? $this->created_at->toIso8601String() : null,
            'updatedAt' => $this->updated_at ? $this->updated_at->toIso8601String() : null,
        ];
    }
}
