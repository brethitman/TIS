<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNivelCategoriaRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para hacer esta solicitud.
     */
    public function authorize(): bool
    {
        return true; // Permitir la actualización
    }

    /**
     * Obtiene las reglas de validación que se aplicarán a la solicitud.
     */
    public function rules(): array
    {
        return [
            'id_area' => 'required|integer|exists:areas,id_area',
            'nombre_nivel' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
            'fecha_examen' => 'nullable|date',
            'costo' => 'required|numeric|min:0',
            'habilitacion' => 'nullable|boolean',
        ];
    }

    /**
     * Define los mensajes de error personalizados para cada regla de validación.
     */
    public function messages(): array
    {
        return [
            'id_area.required' => 'El campo "Área" es obligatorio.',
            'id_area.integer' => 'El campo "Área" debe ser un número entero.',
            'id_area.exists' => 'El área seleccionada no es válida.',

            'nombre_nivel.required' => 'El campo "Nombre del Nivel" es obligatorio.',
            'nombre_nivel.string' => 'El campo "Nombre del Nivel" debe ser un texto.',
            'nombre_nivel.max' => 'El campo "Nombre del Nivel" no debe exceder los 100 caracteres.',

            'descripcion.string' => 'El campo "Descripción" debe ser un texto.',

            'fecha_examen.date' => 'El campo "Fecha de Examen" debe ser una fecha válida.',

            'costo.required' => 'El campo "Costo" es obligatorio.',
            'costo.numeric' => 'El campo "Costo" debe ser un número.',
            'costo.min' => 'El campo "Costo" debe ser un número positivo.',

            'habilitacion.boolean' => 'El campo "Habilitación" debe ser verdadero o falso.',
        ];
    }
}
