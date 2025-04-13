import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Olimpiada } from '../../interfaces/olimpiada.interfacel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olimpiada-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './olimpiada-card.component.html',
})
export class OlimpiadaCardComponent implements OnInit {
  @Input({ required: true }) olimpiada!: Olimpiada;

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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Al hacer clic en "Editar"
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

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  // Guardar cambios y validar
  saveEdit(): void {
    const inicio = new Date(this.editableOlimpiada.fecha_inicio);
    const fin = new Date(this.editableOlimpiada.fecha_final);

    if (fin < inicio) {
      this.errorMessage = 'La fecha final debe ser posterior o igual a la fecha de inicio.';
      return;
    }

    // Actualizar objeto original
    this.olimpiada.nombre_olimpiada = this.editableOlimpiada.nombre_olimpiada;
    this.olimpiada.descripcion_olimpiada = this.editableOlimpiada.descripcion_olimpiada;
    this.olimpiada.fecha_inicio = inicio;
    this.olimpiada.fecha_final = fin;

    this.isEditModalOpen = false;
  }

  formatDateToInput(date: Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  // Otros botones (placeholders)
  onButton1Click(): void {
    console.log('Eliminar clickeado');
  }

  onButton3Click(): void {
    console.log('Añadir área clickeado');
  }
}
