import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Olimpiada } from '../../interfaces/olimpiada.interfacel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-olimpiada-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './olimpiada-card.component.html',
})
export class OlimpiadaCardComponent implements OnInit {
  @Input({ required: true }) olimpiada!: Olimpiada;

  // Variables para modales (simplificadas)
  isModalOpen = false;
  isDeleteModalOpen = false;
  isEditModalOpen = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // No se necesita inicialización adicional
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
    console.log('Botón 1 clickeado');
  }

  onButton2Click(): void {
    console.log('Botón 2 clickeado');
  }

  onButton3Click(): void {
    console.log('Botón 3 clickeado');
    this.router.navigate(['/admin/products']);
  }
}