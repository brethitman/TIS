import { Component, Input, OnInit, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';
import { Router } from '@angular/router';
import { OlimpiadaService } from '../../service/olimpiada.service';
import { DatePipe } from '@angular/common';
import { Inject } from '@angular/core';
import { FormControlDirective,NgModel ,FormControlName,ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-olimpiada-card',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './olimpiada-card.component.html',
})
export class OlimpiadaCardComponent implements OnInit {


  @Input({ required: true }) olimpiada!: Olimpiada;
  @Output() olimpiadaEliminada = new EventEmitter<number>();

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

  // Inyecta el servicio Router para la navegación
  private router = inject(Router);

  constructor(
    private olimpiadaService: OlimpiadaService
  ) {}

  ngOnInit(): void {}

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
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.errorMessage = '';
  }

  saveEdit(): void {
    const inicio = new Date(this.editableOlimpiada.fecha_inicio);
    const fin = new Date(this.editableOlimpiada.fecha_final);

    if (fin <= inicio) {
      this.errorMessage = 'La fecha final debe ser posterior a la fecha de inicio.';
      return;
    }

    const updatedOlimpiada: Partial<Olimpiada> = {
      nombre_olimpiada: this.editableOlimpiada.nombre_olimpiada.trim(),
      descripcion_olimpiada: this.editableOlimpiada.descripcion_olimpiada.trim(),
      fecha_inicio: inicio,
      fecha_final: fin,
    };

    this.olimpiadaService.updateOlimpiada(this.olimpiada.id, updatedOlimpiada).subscribe({
      next: () => {
        this.olimpiada = { ...this.olimpiada, ...updatedOlimpiada };
        this.mostrarFeedback('Olimpiada actualizada correctamente', 'exito');
        this.isEditModalOpen = false;
      },
      error: () => {
        this.errorMessage = 'Ocurrió un error al actualizar la olimpiada.';
      }
    });

    console.log('Datos a guardar:', this.editableOlimpiada);
  }

  formatDateToInput(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
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

  // Nuevo método para el botón "Entrar"
  entrar(): void {
    if (this.olimpiada?.id) {
      localStorage.setItem('olimpiadaSeleccionada', JSON.stringify(this.olimpiada));
      this.router.navigate([`inicio/look/wach/${this.olimpiada.id}`]);
    }
  }
  

}