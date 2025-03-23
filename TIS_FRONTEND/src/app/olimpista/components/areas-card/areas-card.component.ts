import { Component, Input } from '@angular/core';
import { Area } from '../../interfaces/inscripcion.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-areas-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './areas-card.component.html',
})
export class AreasCardComponent {
  @Input({ required: true }) Area!: Area;

  isModalOpen = false;
  isConfirmModalOpen = false;
  cards: { nombre_area: string; descripcion: string; habilitada: boolean }[] = []; // Nueva propiedad "habilitada"
  cardIndexToToggle: number | null = null; // Almacenar el índice de la tarjeta a modificar

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveCategory() {
    console.log('Categoría guardada');

    // Agregar una nueva tarjeta al array
    this.cards.push({
      nombre_area: this.Area.nombre_area,
      descripcion: this.Area.descripcion || 'No disponible',
      habilitada: true, // Por defecto, la tarjeta está habilitada
    });

    this.closeModal();
  }

  openConfirmModal(index: number) {
    this.cardIndexToToggle = index; // Almacenar el índice de la tarjeta
    this.isConfirmModalOpen = true;
  }

  closeConfirmModal() {
    this.isConfirmModalOpen = false;
    this.cardIndexToToggle = null; // Limpiar el índice almacenado
  }

  toggleHabilitar() {
    if (this.cardIndexToToggle !== null) {
      // Cambiar el estado de la tarjeta
      this.cards[this.cardIndexToToggle].habilitada = !this.cards[this.cardIndexToToggle].habilitada;
      console.log(`Tarjeta en índice ${this.cardIndexToToggle} cambió su estado a: ${this.cards[this.cardIndexToToggle].habilitada ? 'Habilitada' : 'Deshabilitada'}`);

      this.closeConfirmModal();
    }
  }
}

