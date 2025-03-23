import { Component, Input } from '@angular/core';
import { Area } from '../../interfaces/inscripcion.interface';
import { CommonModule } from '@angular/common';
import { NivelesCategoria } from '../../interfaces/categoria.interface';
import { CategoriaService } from '../../service/categoria.service'; // Asegúrate de tener este servicio creado
import { FormsModule } from '@angular/forms'; // Para usar ngModel en el modal


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
  cards: { nombre_area: string; descripcion: string }[] = [];
  cardIndexToDelete: number | null = null; // Nueva propiedad para almacenar el índice de la tarjeta

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
    });

    this.closeModal();
  }
   openConfirmModal(index: number) {
    this.cardIndexToDelete = index; // Almacenar el índice de la tarjeta
    this.isConfirmModalOpen = true;
  }

  closeConfirmModal() {
    this.isConfirmModalOpen = false;
    this.cardIndexToDelete = null; // Limpiar el índice almacenado
  }
  disableArea() {
    if (this.cardIndexToDelete !== null) {
      console.log(`Tarjeta en índice ${this.cardIndexToDelete} deshabilitada`);

      // Eliminar la tarjeta usando su índice
      this.cards.splice(this.cardIndexToDelete, 1);

      this.closeConfirmModal();
    }
  }
}
