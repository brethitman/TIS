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
  cards: { nombre_area: string; descripcion: string; habilitada: boolean; costo: number }[] = [];
  cardIndexToToggle: number | null = null;
  cardIndexToEdit: number | null = null;
  editedNombreArea = '';
  editedDescripcion = '';
  editedCosto = 0;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveCategory() {
    console.log('Categoría guardada');

    this.cards.push({
      nombre_area: this.Area.nombre_area,
      descripcion: this.Area.descripcion || 'No disponible',
      habilitada: true,
      costo: 0,
    });

    this.closeModal();
  }

  openConfirmModal(index: number) {
    this.cardIndexToToggle = index;
    this.isConfirmModalOpen = true;
  }

  closeConfirmModal() {
    this.isConfirmModalOpen = false;
    this.cardIndexToToggle = null;
  }

  toggleHabilitar() {
    if (this.cardIndexToToggle !== null) {
      this.cards[this.cardIndexToToggle].habilitada = !this.cards[this.cardIndexToToggle].habilitada;
      console.log(
        `Tarjeta en índice ${this.cardIndexToToggle} cambió su estado a: ${this.cards[this.cardIndexToToggle].habilitada ? 'Habilitada' : 'Deshabilitada'}`
      );
      this.closeConfirmModal();
    }
  }

  openEditModal(index: number) {
    this.cardIndexToEdit = index;
    this.editedNombreArea = this.cards[index].nombre_area;
    this.editedDescripcion = this.cards[index].descripcion;
    this.editedCosto = this.cards[index].costo;
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.cardIndexToEdit = null;
  }

  saveEdit() {
    if (this.cardIndexToEdit !== null) {
      this.cards[this.cardIndexToEdit].nombre_area = this.editedNombreArea;
      this.cards[this.cardIndexToEdit].descripcion = this.editedDescripcion;
      this.cards[this.cardIndexToEdit].costo = this.editedCosto;
      console.log(`Tarjeta en índice ${this.cardIndexToEdit} editada.`);
      this.closeEditModal();
    }
  }
}