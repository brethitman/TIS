import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  // Validador para no permitir números ni símbolos
  static noNumbersOrSymbols(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const regex = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/;
    return regex.test(control.value) ? null : { noNumbersOrSymbols: true };
  }

  // Validador para no permitir letras repetidas más de 3 veces
  static noRepeatedLetters(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const value = control.value.toLowerCase();
    for (let i = 0; i < value.length - 3; i++) {
      if (value[i] === value[i + 1] && value[i] === value[i + 2] && value[i] === value[i + 3]) {
        return { repeatedLetters: true };
      }
    }
    return null;
  }

  // Validador para teléfono boliviano (8 dígitos, comenzando con 6 o 7)
  static bolivianPhone(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const regex = /^[67]\d{7}$/;
    return regex.test(control.value) ? null : { invalidPhone: true };
  }

  // Validador para CI boliviano (entre 5 y 8 dígitos)
  static bolivianCI(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const regex = /^\d{5,8}$/;
    return regex.test(control.value) ? null : { invalidCI: true };
  }
} 