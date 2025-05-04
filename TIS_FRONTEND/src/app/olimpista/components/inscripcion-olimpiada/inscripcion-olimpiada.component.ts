import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OlimpiadaService } from '../../service/olimpiada.service';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';
import { Area } from '../../interfaces/olimpiada-interfase';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-inscripcion-olimpiada',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inscripcion-olimpiada.component.html',
})
export class InscripcionOlimpiadaComponent {
  @Output() olimpiadaCreada = new EventEmitter<Olimpiada>();

  // Propiedades para el formulario de olimpiada
  olimpiada: Olimpiada = {
    id: 0,
    nombre_olimpiada: '',
    descripcion_olimpiada: '',
    fecha_inicio: new Date(),
    fecha_final: new Date(),
    areas: [], // Inicializamos el array de áreas vacío
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Resto del código permanece igual...
  errors = {
    nombreOlimpiada: '',
    descripcion: '',
    fechas: '',
    duplicado: ''
  };

  minDate: string;
  maxStartDate: string;
  minEndDate: string | null = null;
  maxEndDate: string | null = null;

  mostrarModal: boolean = false;
  modalTipo: 'exito' | 'error' = 'exito';
  modalMensaje: string = '';
  fechaFinalHabilitada: boolean = false;

  constructor(private olimpiadaService: OlimpiadaService) {
    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);
    
    this.minDate = this.formatDate(today);
    this.maxStartDate = this.formatDate(nextYear);
    
    this.olimpiada.fecha_inicio = today;
    this.olimpiada.fecha_final = new Date(today.getTime() + 86400000);
    this.fechaFinalHabilitada = false;
  }

  // Resto de métodos auxiliares permanecen igual...
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onStartDateChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const dateString = inputElement.value;
    
    // Solo habilitar fecha final si se seleccionó una fecha válida
    if (dateString) {
      this.fechaFinalHabilitada = true;
      
      const selectedDate = new Date(dateString);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);
      
      const oneYearLater = new Date(selectedDate);
      oneYearLater.setFullYear(selectedDate.getFullYear() + 1);
      
      this.minEndDate = this.formatDate(nextDay);
      this.maxEndDate = this.formatDate(oneYearLater);
      
      if (new Date(this.olimpiada.fecha_final) < nextDay) {
        this.olimpiada.fecha_final = nextDay;
      }
    } else {
      this.fechaFinalHabilitada = false;
    }
    
    this.validateFechas();
  }

  // Validar el nombre de la olimpiada
  validateNombreOlimpiada(): boolean {
    this.errors.nombreOlimpiada = '';

    
    if (!this.olimpiada.nombre_olimpiada || this.olimpiada.nombre_olimpiada.trim() === '') {
      this.errors.nombreOlimpiada = 'El nombre de la olimpiada es obligatorio';
      return false;
    }

    
    if (this.olimpiada.nombre_olimpiada.length < 3) {
      this.errors.nombreOlimpiada = 'El nombre debe tener al menos 3 caracteres y máximo 30 caracteres';
      return false;
    }
    
    if (this.olimpiada.nombre_olimpiada.length > 30) {
      this.errors.nombreOlimpiada = 'El nombre debe tener al menos 3 caracteres y máximo 30 caracteres';
      return false;
    }
    
    const caracteresPermitidos = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s!¡"']+$/;
    if (!caracteresPermitidos.test(this.olimpiada.nombre_olimpiada)) {
      this.errors.nombreOlimpiada = 'El nombre solo puede contener letras, números, espacios y los signos ! ¡ " \'';
      return false;
    }
    
    return true;
  }

  // Validar la descripción
  validateDescripcion(): boolean {
    this.errors.descripcion = '';

    
    if (!this.olimpiada.descripcion_olimpiada || this.olimpiada.descripcion_olimpiada.trim() === '') {
      this.errors.descripcion = 'La descripción es obligatoria';
      return false;
    }
    

    if (this.olimpiada.descripcion_olimpiada.length < 10) {
      this.errors.descripcion = 'La descripción debe tener al menos 10 caracteres y máximo 500 caracteres';
      return false;
    }

    
    if (this.olimpiada.descripcion_olimpiada.length > 500) {
      this.errors.descripcion = 'La descripción debe tener al menos 10 caracteres y máximo 500 caracteres';
      return false;
    }
    
    return true;
  }

  // Validar las fechas
  validateFechas(): boolean {
    this.errors.fechas = '';
    
    if (!this.olimpiada.fecha_inicio || !this.olimpiada.fecha_final || isNaN(new Date(this.olimpiada.fecha_inicio).getTime()) || isNaN(new Date(this.olimpiada.fecha_final).getTime())) {
      this.errors.fechas = 'Ambas fechas son obligatorias';
      return false;
    }
    
    const inicio = new Date(this.olimpiada.fecha_inicio);
    const final = new Date(this.olimpiada.fecha_final);
    
    if (inicio >= final) {
      this.errors.fechas = 'La fecha final debe ser posterior a la fecha incial';
      return false;
    }
    
    const maxAllowedEndDate = new Date(inicio);
    maxAllowedEndDate.setFullYear(inicio.getFullYear() + 1);
    
    if (final > maxAllowedEndDate) {
      this.errors.fechas = 'La fecha final no puede ser más de un año después de la fecha de inicio';
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

  // Modificamos el método onSubmit para incluir el array de áreas vacío
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
        areas: [], // Incluimos el array de áreas vacío
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      this.olimpiadaService.createOlimpiada(olimpiadaToSend).pipe(
        catchError(error => {
          if (error.status === 409 || (error.error?.message?.includes('existe'))) {
            this.errors.duplicado = 'Ya existe una Olimpiada con el mismo nombre y descripción, intente nuevamente.';
            this.mostrarModalError(this.errors.duplicado);
          } else {
            console.error('Error al guardar la olimpiada:', error);
            this.mostrarModalError('Completa correctamente todos los campos antes de enviar.');
          }
          return of(null);
        })
      ).subscribe({
        next: (response) => {
          if (response) {
            this.mostrarModalExito('¡Olimpiada guardada con éxito!');
            this.olimpiadaCreada.emit(response);
            this.resetForm();
          }
        }
      });
    } catch (e) {
      console.error('Error en la ejecución:', e);
      this.mostrarModalError('Ocurrió un error inesperado.');
    }
  }
  
  // Métodos del modal permanecen igual...
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
  
  // Modificamos el resetForm para incluir el array de áreas vacío
  resetForm() {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 86400000);
    
    this.olimpiada = {
      id: 0,
      nombre_olimpiada: '',
      descripcion_olimpiada: '',
      fecha_inicio: today,
      fecha_final: tomorrow,
      areas: [], // Incluimos el array de áreas vacío
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);
    
    this.minDate = this.formatDate(today);
    this.maxStartDate = this.formatDate(nextYear);
    this.minEndDate = this.formatDate(tomorrow);
    this.maxEndDate = this.formatDate(nextYear);

    this.fechaFinalHabilitada = false;
    
    this.errors = {
      nombreOlimpiada: '',
      descripcion: '',
      fechas: '',
      duplicado: ''
    };
  }
}