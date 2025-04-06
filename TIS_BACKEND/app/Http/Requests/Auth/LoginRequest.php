<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Todos pueden intentar loguearse.
    }

    public function rules(): array
    {
        return [
            "email" => "required|email",
            "password" => "required|min:6",
        ];
    }

    // (Opcional) Mensajes personalizados.
    public function messages(): array
    {
        return [
            'email.required' => 'El email es obligatorio',
            'email.email' => 'Debe ser un email válido',
            'password.required' => 'La contraseña es obligatoria',
            'password.min' => 'La contraseña debe tener al menos 6 caracteres',
        ];
    }
}
