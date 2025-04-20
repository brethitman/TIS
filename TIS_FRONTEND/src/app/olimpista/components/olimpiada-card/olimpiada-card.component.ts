import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Olimpiada } from '../../interfaces/olimpiada.interfacel';
import { Router } from '@angular/router';
import { OlimpiadaService } from '../../service/olimpiada.service';

@Component({
  selector: 'app-olimpiada-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './olimpiada-card.component.html',
})
export class OlimpiadaCardComponent implements OnInit {
  @Input({ required: true }) olimpiada!: Olimpiada;
  @Output() olimpiadaEliminada = new EventEmitter<number>();

  isEditModalOpen = false;
  errorMessage: string = '';

  // Editable: versión del objeto con fechas como string
  editableOlimpiada: {
    nombre_olimpiada: string;
    descripcion_olimpiada: string;
    fecha_inicio: string;
    fecha_final: string;
  } = {
    nombre_olimpiada: '',
    descripcion_olimpiada: '',
    fecha_inicio: '',
    fecha_final: ''
  };

   // Estados para modales
   mostrarConfirmacion = false;
   mostrarModal = false;
   modalTipo: 'exito' | 'error' = 'exito';
   modalMensaje = '';
   eliminando = false;

  constructor(private router: Router, private olimpiadaService: OlimpiadaService) {}

  ngOnInit(): void {
    // No se necesita inicialización adicional
  }

    // Método para eliminar
  confirmarEliminacion() {
    this.eliminando = true;
    this.olimpiadaService.deleteOlimpiada(this.olimpiada.id).subscribe({
      next: () => {
        this.mostrarFeedback('Olimpiada eliminada correctamente', 'exito');
        setTimeout(() => {
          this.olimpiadaEliminada.emit(this.olimpiada.id);
          this.mostrarConfirmacion = false;
        }, 1500);
      },
      error: () => {
        this.mostrarFeedback('Error al eliminar la olimpiada', 'error');
        this.eliminando = false;
      }
    });
  }

  mostrarFeedback(mensaje: string, tipo: 'exito' | 'error') {
    this.modalTipo = tipo;
    this.modalMensaje = mensaje;
    this.mostrarModal = true;
    
    setTimeout(() => {
      this.mostrarModal = false;
    }, 3000);
  }

  ocultarModal() {
    this.mostrarModal = false;
  }

  // Métodos para abrir/cerrar modales (sin funcionalidad real)
  openEditModal(): void {
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

 // Guardar cambios y validar
saveEdit(): void {
  const inicio = new Date(this.editableOlimpiada.fecha_inicio);
  const fin = new Date(this.editableOlimpiada.fecha_final);

  if (fin <= inicio) {
    this.errorMessage = 'La fecha final debe ser posterior a la fecha de inicio.';
    return;
  }

  const updatedOlimpiada: Partial<Olimpiada> = {
    nombre_olimpiada: this.editableOlimpiada.nombre_olimpiada,
    descripcion_olimpiada: this.editableOlimpiada.descripcion_olimpiada,
    fecha_inicio: inicio,
    fecha_final: fin,
  };

  this.olimpiadaService.updateOlimpiada(this.olimpiada.id, updatedOlimpiada).subscribe({
    next: () => {
      this.olimpiada = {
        ...this.olimpiada,
        ...updatedOlimpiada,
      };

      this.mostrarFeedback('Olimpiada actualizada correctamente', 'exito');
      this.isEditModalOpen = false;
    },
    error: () => {
      this.errorMessage = 'Ocurrió un error al actualizar la olimpiada.';
    }
  });

  console.log('Datos a guardar:', this.editableOlimpiada);
}

  

  formatDateToInput(date: Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  
  onButton2Click(): void {
    this.editableOlimpiada = {
      nombre_olimpiada: this.olimpiada.nombre_olimpiada,
      descripcion_olimpiada: this.olimpiada.descripcion_olimpiada,
      fecha_inicio: this.formatDateToInput(this.olimpiada.fecha_inicio),
      fecha_final: this.formatDateToInput(this.olimpiada.fecha_final),
    };
    this.errorMessage = '';
    this.isEditModalOpen = true;
  }


 
  onButton3Click(): void {
    this.router.navigate(['/admin/products']);
  }

  navegarAAreas(): void {
    if (this.olimpiada?.id) {
      // Navegación con parámetro de ruta
      this.router.navigate(['/admin/olimpiadas', this.olimpiada.id, 'areas'])
        .catch(err => {
          console.error('Error de navegación:', err);
          // Puedes mostrar un mensaje al usuario aquí
        });
    }
  }
}