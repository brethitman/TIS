import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  // Validador para nombres, apellidos y colegio
  static textOnly(minLength: number = 3): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const value = control.value as string;
      
      // Verificar longitud mínima
      if (value.length < minLength) {
        return { minLength: { requiredLength: minLength, actualLength: value.length } };
      }

      // Verificar que no contenga números ni signos especiales
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
        return { invalidCharacters: true };
      }

      // Verificar que no sea una letra repetida
      if (/^(.)\1+$/.test(value)) {
        return { repeatedCharacter: true };
      }

      return null;
    };
  }

  // Validador para teléfono (8 dígitos que empiecen con 6 o 7)
  static phoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const value = control.value as string;
      
      // Verificar que sea exactamente 8 dígitos y empiece con 6 o 7
      if (!/^[67]\d{7}$/.test(value)) {
        return { invalidPhoneNumber: true };
      }

      return null;
    };
  }

  // Validador para CI boliviano
  static bolivianCI(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const value = control.value as string;
      
      // Verificar que sea un número entre 5 y 8 dígitos
      if (!/^\d{5,8}$/.test(value)) {
        return { invalidCI: true };
      }

      return null;
    };
  }
} 