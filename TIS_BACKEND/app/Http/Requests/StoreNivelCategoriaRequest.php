<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNivelCategoriaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Cambiado a true para permitir la validación
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id_area' => 'required|integer|exists:areas,id_area', // Asegura que el área exista
            'nombre_nivel' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
            'fecha_examen' => 'nullable|date',
            'costo' => 'required|numeric|min:0',
            'habilitacion' => 'nullable|boolean',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'id_area.required' => 'El campo id_area es obligatorio.',
            'id_area.integer' => 'El campo id_area debe ser un número entero.',
            'id_area.exists' => 'El área seleccionada no existe.',
            'nombre_nivel.required' => 'El nombre del nivel es obligatorio.',
            'nombre_nivel.string' => 'El nombre del nivel debe ser una cadena de texto.',
            'nombre_nivel.max' => 'El nombre del nivel no puede superar los 100 caracteres.',
            'descripcion.string' => 'La descripción debe ser una cadena de texto.',
            'fecha_examen.date' => 'La fecha de examen debe ser una fecha válida.',
            'costo.required' => 'El costo es obligatorio.',
            'costo.numeric' => 'El costo debe ser un número.',
            'costo.min' => 'El costo no puede ser un valor negativo.',
            'habilitacion.boolean' => 'El campo habilitacion debe ser verdadero o falso.',
        ];
    }
}
