<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAreaRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para hacer esta solicitud.
     */
    public function authorize(): bool
    {
        return true; // Cambia a false si quieres restringir el acceso
    }

    /**
     * Reglas de validación.
     */
    public function rules(): array
    {
        return [
            'nombre_area' => 'required|string|max:100|unique:areas,nombre_area|regex:/^[\pL\s]+$/u',
            'descripcion' => 'required|string|max:255',
        ];
    }


    /**
     * Mensajes personalizados para los errores de validación.
     */
    public function messages(): array
    {
        return [
            'nombre_area.required' => 'El nombre del área es obligatorio.',
            'nombre_area.string' => 'El nombre del área debe ser un texto.',
            'nombre_area.max' => 'El nombre del área no puede tener más de 100 caracteres.',
            'nombre_area.unique' => 'Este nombre de área ya está registrado.',
            'nombre_area.regex' => 'El nombre del área solo puede contener letras y espacios.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'descripcion.string' => 'La descripción debe ser un texto.',
            'descripcion.max' => 'La descripción no puede tener más de 255 caracteres.',
        ];
    }

}
