import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Olimpiada } from '../../interfaces/olimpiada.interfacel';
import { Router } from '@angular/router';
import { OlimpiadaService } from '../../service/olimpiada.service';

@Component({
  selector: 'app-olimpiada-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './olimpiada-card.component.html',
})
export class OlimpiadaCardComponent implements OnInit {
  @Input({ required: true }) olimpiada!: Olimpiada;
  @Output() olimpiadaEliminada = new EventEmitter<number>();

  // Variables para modales (simplificadas)
  isModalOpen = false;
  isDeleteModalOpen = false;
  isEditModalOpen = false;

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

  openDeleteModal(): void {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  // Métodos de botones (sin funcionalidad)
  onButton1Click(): void {
    this.openDeleteModal();
  }

  onButton2Click(): void {
    console.log('Botón 2 clickeado');
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