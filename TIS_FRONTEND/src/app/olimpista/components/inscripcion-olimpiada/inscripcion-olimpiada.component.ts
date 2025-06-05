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
    presentacion: '',
    requisitos: '',
    fecha_inscripcion_inicio: undefined,
    fecha_inscripcion_final: undefined,
    premios: '',
    informacion_adicional: '',
    areas: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Errores de validación
  errors = {
    nombreOlimpiada: '',
    descripcion: '',
    presentacion: '',
    requisitos: '',
    premios: '',
    informacionAdicional: '',
    fechas: '',
    fechasInscripcion: '',
    duplicado: ''
  };

  // Propiedades para fechas de olimpiada
  minDate: string;
  maxStartDate: string;
  minEndDate: string | null = null;
  maxEndDate: string | null = null;
  fechaFinalHabilitada: boolean = false;

  // Propiedades para fechas de inscripción
  maxInscripcionStartDate: string | null = null;
  minInscripcionEndDate: string | null = null;
  maxInscripcionEndDate: string | null = null;
  fechaInscripcionFinalHabilitada: boolean = false;

  // Propiedades del modal
  mostrarModal: boolean = false;
  modalTipo: 'exito' | 'error' = 'exito';
  modalMensaje: string = '';

  constructor(private olimpiadaService: OlimpiadaService) {
    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);
    
    this.minDate = this.formatDate(today);
    this.maxStartDate = this.formatDate(nextYear);
    
    this.olimpiada.fecha_inicio = today;
    this.olimpiada.fecha_final = new Date(today.getTime() + 86400000);
    this.fechaFinalHabilitada = false;
    this.fechaInscripcionFinalHabilitada = false;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Manejo de fechas de olimpiada
  onStartDateChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const dateString = inputElement.value;
    
    if (dateString) {
      this.fechaFinalHabilitada = true;
      
      const selectedDate = new Date(dateString);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);
      
      const oneYearLater = new Date(selectedDate);
      oneYearLater.setFullYear(selectedDate.getFullYear() + 1);
      
      this.minEndDate = this.formatDate(nextDay);
      this.maxEndDate = this.formatDate(oneYearLater);
      
      // Actualizar límites para fechas de inscripción
      this.maxInscripcionStartDate = this.formatDate(selectedDate);
      this.maxInscripcionEndDate = this.formatDate(selectedDate);
      
      if (new Date(this.olimpiada.fecha_final) < nextDay) {
        this.olimpiada.fecha_final = nextDay;
      }

      // Validar fechas de inscripción si ya están establecidas
      if (this.olimpiada.fecha_inscripcion_inicio || this.olimpiada.fecha_inscripcion_final) {
        this.validateFechasInscripcion();
      }
    } else {
      this.fechaFinalHabilitada = false;
      this.maxInscripcionStartDate = null;
      this.maxInscripcionEndDate = null;
    }
    
    this.validateFechas();
  }

  // Manejo de fechas de inscripción
  onInscripcionStartDateChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const dateString = inputElement.value;
    
    if (dateString) {
      this.fechaInscripcionFinalHabilitada = true;
      
      const selectedDate = new Date(dateString);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);
      
      this.minInscripcionEndDate = this.formatDate(nextDay);
      
      if (this.olimpiada.fecha_inscripcion_final && new Date(this.olimpiada.fecha_inscripcion_final) < nextDay) {
        this.olimpiada.fecha_inscripcion_final = nextDay;
      }
    } else {
      this.fechaInscripcionFinalHabilitada = false;
      this.minInscripcionEndDate = null;
    }
    
    this.validateFechasInscripcion();
  }

  // Validaciones
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

  validatePresentacion(): boolean {
    this.errors.presentacion = '';

    if (this.olimpiada.presentacion && this.olimpiada.presentacion.trim() !== '') {
      if (this.olimpiada.presentacion.length < 10) {
        this.errors.presentacion = 'La presentación debe tener al menos 10 caracteres y máximo 1000 caracteres';
        return false;
      }

      if (this.olimpiada.presentacion.length > 1000) {
        this.errors.presentacion = 'La presentación debe tener al menos 10 caracteres y máximo 1000 caracteres';
        return false;
      }
    }
    
    return true;
  }

  validateRequisitos(): boolean {
    this.errors.requisitos = '';

    if (this.olimpiada.requisitos && this.olimpiada.requisitos.trim() !== '') {
      if (this.olimpiada.requisitos.length < 10) {
        this.errors.requisitos = 'Los requisitos deben tener al menos 10 caracteres y máximo 1000 caracteres';
        return false;
      }

      if (this.olimpiada.requisitos.length > 1000) {
        this.errors.requisitos = 'Los requisitos deben tener al menos 10 caracteres y máximo 1000 caracteres';
        return false;
      }
    }
    
    return true;
  }

  validatePremios(): boolean {
    this.errors.premios = '';

    if (this.olimpiada.premios && this.olimpiada.premios.trim() !== '') {
      if (this.olimpiada.premios.length < 10) {
        this.errors.premios = 'Los premios deben tener al menos 10 caracteres y máximo 1000 caracteres';
        return false;
      }

      if (this.olimpiada.premios.length > 1000) {
        this.errors.premios = 'Los premios deben tener al menos 10 caracteres y máximo 1000 caracteres';
        return false;
      }
    }
    
    return true;
  }

  validateInformacionAdicional(): boolean {
    this.errors.informacionAdicional = '';

    if (this.olimpiada.informacion_adicional && this.olimpiada.informacion_adicional.trim() !== '') {
      if (this.olimpiada.informacion_adicional.length < 10) {
        this.errors.informacionAdicional = 'La información adicional debe tener al menos 10 caracteres y máximo 1000 caracteres';
        return false;
      }

      if (this.olimpiada.informacion_adicional.length > 1000) {
        this.errors.informacionAdicional = 'La información adicional debe tener al menos 10 caracteres y máximo 1000 caracteres';
        return false;
      }
    }
    
    return true;
  }

  validateFechas(): boolean {
    this.errors.fechas = '';
    
    if (!this.olimpiada.fecha_inicio || !this.olimpiada.fecha_final || 
        isNaN(new Date(this.olimpiada.fecha_inicio).getTime()) || 
        isNaN(new Date(this.olimpiada.fecha_final).getTime())) {
      this.errors.fechas = 'Ambas fechas de la olimpiada son obligatorias';
      return false;
    }
    
    const inicio = new Date(this.olimpiada.fecha_inicio);
    const final = new Date(this.olimpiada.fecha_final);
    const today = new Date(this.formatDate(new Date()));
    const maxStart = new Date(this.maxStartDate);
    
    if (isNaN(inicio.getTime()) || inicio < today || inicio > maxStart) {
      this.errors.fechas = `La fecha de inicio debe estar entre ${this.minDate} y ${this.maxStartDate}`;
      return false;
    }

    if (inicio >= final) {
      this.errors.fechas = 'La fecha final debe ser posterior a la fecha inicial';
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

  validateFechasInscripcion(): boolean {
    this.errors.fechasInscripcion = '';
    
    // Si no hay fechas de inscripción, es válido (son opcionales)
    if (!this.olimpiada.fecha_inscripcion_inicio && !this.olimpiada.fecha_inscripcion_final) {
      return true;
    }

    // Si hay fecha de inicio pero no final
    if (this.olimpiada.fecha_inscripcion_inicio && !this.olimpiada.fecha_inscripcion_final) {
      this.errors.fechasInscripcion = 'Si establece fecha de inicio de inscripciones, debe establecer también la fecha final';
      return false;
    }

    // Si hay fecha final pero no inicio
    if (!this.olimpiada.fecha_inscripcion_inicio && this.olimpiada.fecha_inscripcion_final) {
      this.errors.fechasInscripcion = 'Si establece fecha final de inscripciones, debe establecer también la fecha de inicio';
      return false;
    }

    // Validar que ambas fechas sean válidas
    const inicioInscripcion = new Date(this.olimpiada.fecha_inscripcion_inicio!);
    const finalInscripcion = new Date(this.olimpiada.fecha_inscripcion_final!);
    const today = new Date(this.formatDate(new Date()));

    if (isNaN(inicioInscripcion.getTime()) || isNaN(finalInscripcion.getTime())) {
      this.errors.fechasInscripcion = 'Las fechas de inscripción no son válidas';
      return false;
    }

    // La fecha de inicio de inscripciones no puede ser anterior a hoy
    if (inicioInscripcion < today) {
      this.errors.fechasInscripcion = 'La fecha de inicio de inscripciones no puede ser anterior a hoy';
      return false;
    }

    // La fecha final debe ser posterior a la inicial
    if (inicioInscripcion >= finalInscripcion) {
      this.errors.fechasInscripcion = 'La fecha final de inscripciones debe ser posterior a la fecha inicial';
      return false;
    }

    // Las fechas de inscripción deben ser anteriores o iguales a la fecha de inicio de la olimpiada
    if (this.olimpiada.fecha_inicio) {
      const inicioOlimpiada = new Date(this.olimpiada.fecha_inicio);
      
      if (finalInscripcion > inicioOlimpiada) {
        this.errors.fechasInscripcion = 'Las inscripciones deben cerrar antes o el mismo día que inicie la olimpiada';
        return false;
      }
    }
    
    return true;
  }

  validateAll(): boolean {
    const isNombreValid = this.validateNombreOlimpiada();
    const isDescripcionValid = this.validateDescripcion();
    const isPresentacionValid = this.validatePresentacion();
    const isRequisitosValid = this.validateRequisitos();
    const isPremiosValid = this.validatePremios();
    const isInformacionAdicionalValid = this.validateInformacionAdicional();
    const isFechasValid = this.validateFechas();
    const isFechasInscripcionValid = this.validateFechasInscripcion();
    
    return isNombreValid && isDescripcionValid && isPresentacionValid && 
           isRequisitosValid && isPremiosValid && isInformacionAdicionalValid &&
           isFechasValid && isFechasInscripcionValid;
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
      presentacion: this.olimpiada.presentacion || undefined,
      requisitos: this.olimpiada.requisitos || undefined,
      fecha_inscripcion_inicio: this.olimpiada.fecha_inscripcion_inicio || undefined,
      fecha_inscripcion_final: this.olimpiada.fecha_inscripcion_final || undefined,
      premios: this.olimpiada.premios || undefined,
      informacion_adicional: this.olimpiada.informacion_adicional || undefined,
      areas: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Debug: mostrar qué datos se están enviando
    console.log('Datos que se envían al servidor:', olimpiadaToSend);
    console.log('Tipos de datos de fechas:');
    console.log('fecha_inicio:', typeof olimpiadaToSend.fecha_inicio, olimpiadaToSend.fecha_inicio);
    console.log('fecha_final:', typeof olimpiadaToSend.fecha_final, olimpiadaToSend.fecha_final);
    console.log('fecha_inscripcion_inicio:', typeof olimpiadaToSend.fecha_inscripcion_inicio, olimpiadaToSend.fecha_inscripcion_inicio);
    console.log('fecha_inscripcion_final:', typeof olimpiadaToSend.fecha_inscripcion_final, olimpiadaToSend.fecha_inscripcion_final);

    this.olimpiadaService.createOlimpiada(olimpiadaToSend).pipe(
      catchError(error => {
        console.error('Error completo:', error);
        console.error('Status:', error.status);
        console.error('Status Text:', error.statusText);
        console.error('Error body:', error.error);
        console.error('Error message:', error.message);
        
        // Mostrar detalles específicos del error 422
        if (error.status === 422) {
          console.error('Errores de validación del servidor:', error.error.errors || error.error.message || error.error);
          
          let errorMessage = 'Error de validación: ';
          if (error.error.errors) {
            // Si el servidor devuelve errores estructurados
            const serverErrors = error.error.errors;
            Object.keys(serverErrors).forEach(key => {
              errorMessage += `${key}: ${serverErrors[key].join(', ')}; `;
            });
          } else if (error.error.message) {
            errorMessage += error.error.message;
          } else {
            errorMessage += 'Los datos enviados no son válidos.';
          }
          
          this.mostrarModalError(errorMessage);
        } else if (error.status === 409 || (error.error?.message?.includes('existe'))) {
          this.errors.duplicado = 'Ya existe una Olimpiada con el mismo nombre y descripción, intente nuevamente.';
          this.mostrarModalError(this.errors.duplicado);
        } else {
          this.mostrarModalError('Ocurrió un error al guardar la olimpiada. Inténtalo nuevamente.');
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

  // Métodos del modal
  mostrarModalExito(mensaje: string): void {
    this.modalTipo = 'exito';
    this.modalMensaje = mensaje;
    this.mostrarModal = true;
  }
  
  mostrarModalError(mensaje: string): void {
    this.modalTipo = 'error';
    this.modalMensaje = mensaje;
    this.mostrarModal = true;
  }
  
  ocultarModal(): void {
    this.mostrarModal = false;
    this.modalMensaje = '';
  }

  // Resetear formulario
  resetForm(): void {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 86400000);
    
    this.olimpiada = {
      id: 0,
      nombre_olimpiada: '',
      descripcion_olimpiada: '',
      fecha_inicio: today,
      fecha_final: tomorrow,
      presentacion: '',
      requisitos: '',
      fecha_inscripcion_inicio: undefined,
      fecha_inscripcion_final: undefined,
      premios: '',
      informacion_adicional: '',
      areas: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);
    
    this.minDate = this.formatDate(today);
    this.maxStartDate = this.formatDate(nextYear);
    this.minEndDate = null;
    this.maxEndDate = null;
    this.maxInscripcionStartDate = null;
    this.minInscripcionEndDate = null;
    this.maxInscripcionEndDate = null;

    this.fechaFinalHabilitada = false;
    this.fechaInscripcionFinalHabilitada = false;
    
    this.errors = {
      nombreOlimpiada: '',
      descripcion: '',
      presentacion: '',
      requisitos: '',
      premios: '',
      informacionAdicional: '',
      fechas: '',
      fechasInscripcion: '',
      duplicado: ''
    };
  }
}