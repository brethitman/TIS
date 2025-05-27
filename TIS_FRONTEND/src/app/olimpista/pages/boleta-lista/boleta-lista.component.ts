import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-boleta-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boleta-lista.component.html'
})
export class BoletaListaComponent {
  // Datos de ejemplo
  students = [
    {
      id: 1,
      name: 'Colacanuto Cornamenta',
      course: 'Matemáticas Avanzadas',
      area1: 'Ciencias',
      category1: 'Sub-17',
      area2: 'Robótica',
      category2: 'Principiante'
    },
    {
      id: 2,
      name: 'Barbara Sprouse',
      course: 'Literatura Moderna',
      area1: 'Humanidades',
      category1: 'Avanzado',
      area2: 'Teatro',
      category2: 'Intermedio'
    }
  ];

}