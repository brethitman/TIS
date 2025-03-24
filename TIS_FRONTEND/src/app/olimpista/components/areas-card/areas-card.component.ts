import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Area } from '../../interfaces/inscripcion.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-areas-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './areas-card.component.html',
})
export class AreasCardComponent {
  @Input({ required: true }) Area!: Area;

  isModalOpen = false;
  isConfirmModalOpen = false;
  isEditModalOpen = false;

  // Estructura de las tarjetas
  cards: {
    nombre_area: string;
    descripcion: string;
    habilitada: boolean;
    costo: number;
    fecha_examen: string; // Nueva propiedad añadida
  }[] = [];

  cardIndexToToggle: number | null = null;
  cardIndexToEdit: number | null = null;

  // Propiedades para editar
  editedNombreArea = '';
  editedfechaExamen = '';
  editedCosto = 0;

  // Abrir modal de añadir categoría
  openModal() {
    this.isModalOpen = true;
  }

  // Cerrar modal de añadir categoría
  closeModal() {
    this.isModalOpen = false;
  }

  // Guardar una nueva categoría
  saveCategory() {
    console.log('Categoría guardada');

    this.cards.push({
      nombre_area: this.Area.nombre_area,
      descripcion: this.Area.descripcion || 'No disponible',
      habilitada: true,
      costo: 0,
      fecha_examen: '', // Inicializar fecha_examen vacía
    });

    this.closeModal();
  }

  // Abrir modal de confirmación para habilitar/deshabilitar
  openConfirmModal(index: number) {
    this.cardIndexToToggle = index;
    this.isConfirmModalOpen = true;
  }

  // Cerrar modal de confirmación
  closeConfirmModal() {
    this.isConfirmModalOpen = false;
    this.cardIndexToToggle = null;
  }

  // Cambiar estado de habilitación
  toggleHabilitar() {
    if (this.cardIndexToToggle !== null) {
      this.cards[this.cardIndexToToggle].habilitada = !this.cards[this.cardIndexToToggle].habilitada;
      console.log(
        `Tarjeta en índice ${this.cardIndexToToggle} cambió su estado a: ${this.cards[this.cardIndexToToggle].habilitada ? 'Habilitada' : 'Deshabilitada'}`
      );
      this.closeConfirmModal();
    }
  }

  // Abrir modal de edición
  openEditModal(index: number) {
    this.cardIndexToEdit = index;
    this.editedNombreArea = this.cards[index].nombre_area;
    this.editedfechaExamen = this.cards[index].fecha_examen;
    this.editedCosto = this.cards[index].costo;
    this.isEditModalOpen = true;
  }

  // Cerrar modal de edición
  closeEditModal() {
    this.isEditModalOpen = false;
    this.cardIndexToEdit = null;
  }

  // Guardar cambios de edición
  saveEdit() {
    if (this.cardIndexToEdit !== null) {
      this.cards[this.cardIndexToEdit].nombre_area = this.editedNombreArea;
      this.cards[this.cardIndexToEdit].fecha_examen = this.editedfechaExamen;
      this.cards[this.cardIndexToEdit].costo = this.editedCosto;
      console.log(`Tarjeta en índice ${this.cardIndexToEdit} editada.`);
      this.closeEditModal();
    }
  }
}