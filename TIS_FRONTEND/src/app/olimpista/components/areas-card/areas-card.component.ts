import { Component, Input } from '@angular/core';
import { Area } from '../../interfaces/inscripcion.interface';
import { CommonModule } from '@angular/common';
import { NivelesCategoria } from '../../interfaces/categoria.interface';
import { CategoriaService } from '../../service/categoria.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-areas-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './areas-card.component.html',
})
export class AreasCardComponent {
  @Input({ required: true }) Area!: Area;
  @Input() categorias: NivelesCategoria[] = [];

  isModalOpen = false;
  isConfirmModalOpen = false;
  cardIndexToToggle: number | null = null;

  categoriaNombre: string = '';
  categoriaDescripcion: string = '';
  categoriaFechaExamen: string = ''; // formato dd/mm/yyyy
  categoriaCosto: string = ''; // Modificado para ser un string

  constructor(private categoriaService: CategoriaService) {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetCategoriaForm();
  }

  saveCategory() {
    if (
      !this.categoriaNombre.trim() ||
      !this.categoriaDescripcion.trim() ||
      !this.categoriaFechaExamen.trim() ||
      !this.categoriaCosto.trim()
    ) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    let fechaFormateada = this.categoriaFechaExamen;
    if (this.categoriaFechaExamen.includes('/')) {
      const partes = this.categoriaFechaExamen.split('/');
      if (partes.length === 3) {
        fechaFormateada = `${partes[2]}-${partes[1]}-${partes[0]}`; // yyyy-MM-dd
      }
    }
  
    console.log('Fecha formateada:', fechaFormateada);
  
    const nuevaCategoria: NivelesCategoria = {
      id: 0, // Se asignará en el backend
      id_area: this.Area.id,
      nombre_nivel: this.categoriaNombre,
      descripcion: this.categoriaDescripcion,
      fecha_examen: new Date(fechaFormateada),
      costo: this.categoriaCosto, // El costo es ahora un string
      habilitacion: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
  
    this.categoriaService.createCategoria(nuevaCategoria).subscribe({
      next: (response) => {
        console.log('Categoría guardada:', response);
        alert('Categoría guardada con éxito');
        this.categorias.push(response);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error al guardar la categoría:', error);
        alert('Error al guardar la categoría: ' + (error.message || 'Error desconocido'));
      },
    });
  }
  resetCategoriaForm() {
    this.categoriaNombre = '';
    this.categoriaDescripcion = '';
    this.categoriaFechaExamen = '';
    this.categoriaCosto = ''; // Resetea el campo costo a string vacío
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
      this.categorias[this.cardIndexToToggle].habilitacion = !this.categorias[this.cardIndexToToggle].habilitacion;
      console.log(
        `Categoría en índice ${this.cardIndexToToggle} cambió su estado a: ${
          this.categorias[this.cardIndexToToggle].habilitacion ? 'Habilitada' : 'Deshabilitada'
        }`
      );
      this.closeConfirmModal();
    }
  }
}
