import { Component, Input } from '@angular/core';
import { Area } from '../../interfaces/inscripcion.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-areas-card',
  imports: [CommonModule],
  templateUrl: './areas-card.component.html',
})
export class AreasCardComponent {
  @Input({required: true}) 
  Area!: Area;

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true; 
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveCategory() {
    console.log('Categoría guardada');
    this.closeModal(); 
  }
}
