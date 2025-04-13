import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OlimpiadaService } from '../../service/olimpiada.service';
import { Olimpiada } from '../../interfaces/olimpiada.interfacel';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-inscripcion-olimpiada',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inscripcion-olimpiada.component.html',
})

export class InscripcionOlimpiadaComponent {
  // Propiedades para el formulario de olimpiada
  olimpiada: Olimpiada = {
    id: 0,
    nombre_olimpiada: '',
    descripcion_olimpiada: '',
    fecha_inicio: new Date(),
    fecha_final: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Propiedades para las validaciones
  errors = {
    nombreOlimpiada: '',
    descripcion: '',
    fechas: '',
    duplicado: ''
  };

  constructor(private olimpiadaService: OlimpiadaService) {}
  mensajeExito: string = '';
  mensajeError: string = '';
  mostrarModal: boolean = false;
modalTipo: 'exito' | 'error' = 'exito';
modalMensaje: string = '';

  // Validar el nombre de la olimpiada
  validateNombreOlimpiada(): boolean {
    this.errors.nombreOlimpiada = '';
    
    // Validar que no esté vacío
    if (!this.olimpiada.nombre_olimpiada || this.olimpiada.nombre_olimpiada.trim() === '') {
      this.errors.nombreOlimpiada = 'El nombre de la olimpiada es obligatorio';
      return false;
    }
    
    // Validar longitud mínima
    if (this.olimpiada.nombre_olimpiada.length < 3) {
      this.errors.nombreOlimpiada = 'El nombre debe tener al menos 3 caracteres';
      return false;
    }
    
    // Validar longitud máxima
    if (this.olimpiada.nombre_olimpiada.length > 100) {
      this.errors.nombreOlimpiada = 'El nombre debe tener máximo 100 caracteres';
      return false;
    }
    
    // Validar que no contenga caracteres especiales
    const especialesRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (especialesRegex.test(this.olimpiada.nombre_olimpiada)) {
      this.errors.nombreOlimpiada = 'El nombre no debe contener caracteres especiales';
      return false;
    }
    
    return true;
  }

  // Validar la descripción
  validateDescripcion(): boolean {
    this.errors.descripcion = '';
    
    // Validar que no esté vacío
    if (!this.olimpiada.descripcion_olimpiada || this.olimpiada.descripcion_olimpiada.trim() === '') {
      this.errors.descripcion = 'La descripción es obligatoria';
      return false;
    }
    
    // Validar longitud mínima
    if (this.olimpiada.descripcion_olimpiada.length < 10) {
      this.errors.descripcion = 'La descripción debe tener al menos 10 caracteres';
      return false;
    }
    
    // Validar longitud máxima
    if (this.olimpiada.descripcion_olimpiada.length > 500) {
      this.errors.descripcion = 'La descripción debe tener máximo 500 caracteres';
      return false;
    }
    
    return true;
  }

  // Validar las fechas
  validateFechas(): boolean {
    this.errors.fechas = '';
    
    if (!this.olimpiada.fecha_inicio || !this.olimpiada.fecha_final) {
      this.errors.fechas = 'Ambas fechas son obligatorias';
      return false;
    }
    
    const inicio = new Date(this.olimpiada.fecha_inicio);
    const final = new Date(this.olimpiada.fecha_final);
    
    if (inicio >= final) {
      this.errors.fechas = 'La fecha de inicio debe ser anterior a la fecha final';
      return false;
    }
    
    // Validar que no sea una fecha pasada (opcional)
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (inicio < hoy) {
      this.errors.fechas = 'La fecha de inicio no puede ser en el pasado';
      return false;
    }
    
    return true;
  }

  // Validar todos los campos
  validateAll(): boolean {
    const isNombreValid = this.validateNombreOlimpiada();
    const isDescripcionValid = this.validateDescripcion();
    const isFechasValid = this.validateFechas();
    
    return isNombreValid && isDescripcionValid && isFechasValid;
  }

  onSubmit(): void {
    this.errors.duplicado = '';
    this.ocultarModal();
  
    if (!this.validateAll()) {
      this.mostrarModalError('Completa correctamente todos los campos antes de enviar.');
      return;
    }
  
    try {
      const olimpiadaToSend: Olimpiada = {
        id: 0,
        nombre_olimpiada: this.olimpiada.nombre_olimpiada,
        descripcion_olimpiada: this.olimpiada.descripcion_olimpiada,
        fecha_inicio: this.olimpiada.fecha_inicio,
        fecha_final: this.olimpiada.fecha_final,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      this.olimpiadaService.createOlimpiada(olimpiadaToSend).pipe(
        catchError(error => {
          if (error.status === 409 || (error.error?.message?.includes('existe'))) {
            this.errors.duplicado = 'La olimpiada ya existe y no puede ser duplicada';
            this.mostrarModalError(this.errors.duplicado);
          } else {
            console.error('Error al guardar la olimpiada:', error);
            this.mostrarModalError('Hubo un error al guardar la olimpiada. Intenta nuevamente.');
          }
          return of(null);
        })
      ).subscribe({
        next: (response) => {
          if (response) {
            this.mostrarModalExito('¡Olimpiada guardada con éxito!');
            this.resetForm();
          }
        }
      });
    } catch (e) {
      console.error('Error en la ejecución:', e);
      this.mostrarModalError('Ocurrió un error inesperado.');
    }
  }
  
  // Métodos para controlar el modal
  mostrarModalExito(mensaje: string) {
    this.modalTipo = 'exito';
    this.modalMensaje = mensaje;
    this.mostrarModal = true;
  }
  
  mostrarModalError(mensaje: string) {
    this.modalTipo = 'error';
    this.modalMensaje = mensaje;
    this.mostrarModal = true;
  }
  
  ocultarModal() {
    this.mostrarModal = false;
    this.modalMensaje = '';
  }
  
  

  // Método para resetear el formulario
  resetForm() {
    this.olimpiada = {
      id: 0,
      nombre_olimpiada: '',
      descripcion_olimpiada: '',
      fecha_inicio: new Date(),
      fecha_final: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    // Limpiar los errores
    this.errors = {
      nombreOlimpiada: '',
      descripcion: '',
      fechas: '',
      duplicado: ''
    };
  }
  
}