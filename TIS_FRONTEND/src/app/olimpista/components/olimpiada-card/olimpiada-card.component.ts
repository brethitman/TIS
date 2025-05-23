import { Component, Input, OnInit, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';
import { Router } from '@angular/router';
import { OlimpiadaService } from '../../service/olimpiada.service';
import { DatePipe } from '@angular/common';
import { Inject } from '@angular/core';
import { FormControlDirective, NgModel, FormControlName, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-olimpiada-card',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './olimpiada-card.component.html',
})
export class OlimpiadaCardComponent implements OnInit {
  @Input({ required: true }) olimpiada!: Olimpiada;
  @Output() olimpiadaEliminada = new EventEmitter<number>();
  @Output() olimpiadaActualizada = new EventEmitter<Olimpiada>();

  isEditModalOpen = false;
  errorMessage = '';

  editableOlimpiada = {
    nombre_olimpiada: '',
    descripcion_olimpiada: '',
    fecha_inicio: '',
    fecha_final: ''
  };

  mostrarConfirmacion = false;
  mostrarModal = false;
  modalTipo: 'exito' | 'error' = 'exito';
  modalMensaje = '';
  eliminando = false;
  editando = false;
  mostrarOpciones = false;

  // Inyecta el servicio Router para la navegación
  private router = inject(Router);

  constructor(

    private olimpiadaService: OlimpiadaService
  ) { }

  ngOnInit(): void { }

  toggleOpciones(): void {
    this.mostrarOpciones = !this.mostrarOpciones;
  }

  confirmarEliminacion(): void {
    this.eliminando = true;
    this.olimpiadaService.deleteOlimpiada(this.olimpiada.id).subscribe({
      next: () => {
        this.mostrarFeedback('Olimpiada eliminada correctamente', 'exito');
        setTimeout(() => {
          this.olimpiadaEliminada.emit(this.olimpiada.id);
          this.mostrarConfirmacion = false;
          this.eliminando = false;
        }, 1500);
      },
      error: () => {
        this.mostrarFeedback('Error al eliminar la olimpiada', 'error');
        this.eliminando = false;
      }
    });
  }

  mostrarFeedback(mensaje: string, tipo: 'exito' | 'error'): void {
    this.modalTipo = tipo;
    this.modalMensaje = mensaje;
    this.mostrarModal = true;

    setTimeout(() => {
      this.mostrarModal = false;
    }, 3000);
  }

  ocultarModal(): void {
    this.mostrarModal = false;
  }

  openEditModal(): void {
    this.editableOlimpiada = {
      nombre_olimpiada: this.olimpiada.nombre_olimpiada,
      descripcion_olimpiada: this.olimpiada.descripcion_olimpiada,
      fecha_inicio: this.formatDateToInput(this.olimpiada.fecha_inicio),
      fecha_final: this.formatDateToInput(this.olimpiada.fecha_final)
    };
    this.errorMessage = '';
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.errorMessage = '';
  }

  saveEdit(): void {
  // 1) Validaciones de nombre y descripción
  if (!this.validateForm()) {
    return;
  }

  // 2) Rango permitido para fecha de inicio
  const minInicio = new Date(this.olimpiada.fecha_inicio);
  const maxInicio = new Date(minInicio);
  maxInicio.setFullYear(maxInicio.getFullYear() + 1);

  // 3) Parseo de las fechas introducidas
  const inicio = new Date(this.editableOlimpiada.fecha_inicio);
  const fin    = new Date(this.editableOlimpiada.fecha_final);

  // 4) Validar que inicio sea válido y esté entre minInicio y maxInicio
  if (
    isNaN(inicio.getTime()) ||
    inicio < minInicio ||
    inicio > maxInicio
  ) {
    this.errorMessage = `La fecha de inicio debe estar entre ${this.formatDateToInput(minInicio)} y ${this.formatDateToInput(maxInicio)}.`;
    return;
  }

  // 5) Calcular el máximo para la fecha final: un año desde 'inicio'
  const maxFin = new Date(inicio);
  maxFin.setFullYear(maxFin.getFullYear() + 1);

  // 6) Validar que fin sea posterior a inicio y no exceda maxFin
  if (
    isNaN(fin.getTime()) ||
    fin <= inicio ||
    fin > maxFin
  ) {
    this.errorMessage = `La fecha final debe ser posterior a la de inicio y, como máximo un año después de la fecha inicio (${this.formatDateToInput(maxFin)}).`;
    return;
  }

  // 7) Si todo OK, seguimos con la llamada al servicio
    this.editando = true;

    const updatedOlimpiada = {
      nombre_olimpiada: this.editableOlimpiada.nombre_olimpiada.trim(),
      descripcion_olimpiada: this.editableOlimpiada.descripcion_olimpiada.trim(),
      fecha_inicio: this.editableOlimpiada.fecha_inicio,
      fecha_final: this.editableOlimpiada.fecha_final
    };

    this.olimpiadaService.updateOlimpiada(this.olimpiada.id, updatedOlimpiada as any).subscribe({
      next: (response: any) => {
        const updated: Olimpiada = {
          ...this.olimpiada,
          nombre_olimpiada: updatedOlimpiada.nombre_olimpiada,
          descripcion_olimpiada: updatedOlimpiada.descripcion_olimpiada,
          fecha_inicio: inicio,
          fecha_final: fin,
          areas: response.areas || this.olimpiada.areas,
          id: this.olimpiada.id,
          createdAt: this.olimpiada.createdAt,
          updatedAt: new Date(),
        };

        // Mostrar mensaje de éxito
        this.mostrarFeedback('Olimpiada actualizada correctamente', 'exito');

        // Emitir el evento de actualización
        this.olimpiadaActualizada.emit(updated);

        // Cerrar el modal después de un breve retraso
        setTimeout(() => {
          this.isEditModalOpen = false;

        }, 1000);
      },
      error: (error) => {
        this.editando = false;
        if (error.status === 409 || (error.error?.message?.includes('existe'))) {
          this.errorMessage = 'Ya existe una olimpiada con el mismo nombre y descripción, inténtelo de nuevo.';
          this.mostrarFeedback('Ya existe una olimpiada con el mismo nombre y descripción', 'error');
        } else {
          console.error('Error al actualizar:', error);
          this.errorMessage = error.error?.message || 'Ocurrió un error al actualizar la olimpiada.';
        }
      }
    });
  }

  // Nuevo método para formatear fechas para el backend
  private formatDateToBackend(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  formatDateToInput(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  addYearsDate(orig: Date, years: number): Date {
    const d = new Date(orig);
    d.setFullYear(d.getFullYear() + years);
    return d;
  }

  onButton2Click(): void {
    this.editableOlimpiada = {
      nombre_olimpiada: this.olimpiada.nombre_olimpiada,
      descripcion_olimpiada: this.olimpiada.descripcion_olimpiada,
      fecha_inicio: this.formatDateToInput(this.olimpiada.fecha_inicio),
      fecha_final: this.formatDateToInput(this.olimpiada.fecha_final),
    };
    this.errorMessage = '';
    this.openEditModal();
  }

  onButton3Click(): void {
    this.router.navigate(['/admin/products']);
  }

  navegarAAreas(): void {
    if (this.olimpiada?.id) {
      this.router.navigate(['/admin/olimpiadas', this.olimpiada.id, 'areas']).catch(err => {
        console.error('Error de navegación:', err);
      });
    }
  }

  validateNombreOlimpiada(): boolean {
    if (!this.editableOlimpiada.nombre_olimpiada || this.editableOlimpiada.nombre_olimpiada.trim() === '') {
      this.errorMessage = 'El nombre de la olimpiada es obligatorio';
      return false;
    }

    if (this.editableOlimpiada.nombre_olimpiada.length < 3 || this.editableOlimpiada.nombre_olimpiada.length > 30) {
      this.errorMessage = 'El nombre debe tener entre 3 y 30 caracteres';
      return false;
    }

    const caracteresPermitidos = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s!¡"']+$/;
    if (!caracteresPermitidos.test(this.editableOlimpiada.nombre_olimpiada)) {
      this.errorMessage = 'El nombre solo puede contener letras, números, espacios y los signos ! ¡ " \'';
      return false;
    }

    return true;
  }

  validateDescripcion(): boolean {
    if (!this.editableOlimpiada.descripcion_olimpiada || this.editableOlimpiada.descripcion_olimpiada.trim() === '') {
      this.errorMessage = 'La descripción es obligatoria';
      return false;
    }

    if (this.editableOlimpiada.descripcion_olimpiada.length < 10 || this.editableOlimpiada.descripcion_olimpiada.length > 500) {
      this.errorMessage = 'La descripción debe tener entre 10 y 500 caracteres';
      return false;
    }

    return true;
  }

  validateForm(): boolean {
    const isNombreValid = this.validateNombreOlimpiada();
    const isDescripcionValid = this.validateDescripcion();

    return isNombreValid && isDescripcionValid;
  }

  // Nuevo método para el botón "Entrar"
  entrar(): void {
    if (this.olimpiada?.id) {
      localStorage.setItem('olimpiadaSeleccionada', JSON.stringify(this.olimpiada));
      this.router.navigate([`inicio/look/wach/${this.olimpiada.id}`]);
    }
  }

}


