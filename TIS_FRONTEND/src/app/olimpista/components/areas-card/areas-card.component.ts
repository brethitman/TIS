import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Area } from '../../interfaces/inscripcion.interface';
import { CommonModule } from '@angular/common';
import { NivelesCategoria } from '../../interfaces/categoria.interface';

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
  isEditModalOpen = false;

  // Índices para operaciones
  categoriaIndexToToggle: number | null = null;
  categoriaIndexToEdit: number | null = null;

  // Datos para nueva categoría
  nuevaCategoria = {
    nombre_nivel: '',
    descripcion: '',
    fecha_examen: '', // formato dd/mm/yyyy
    costo: ''
  };

  // Datos para edición
  editedCategoria = {
    nombre_nivel: '',
    descripcion: '',
    fecha_examen: '',
    costo: ''
  };

  // Abrir modal de añadir categoría
  openModal() {
    this.isModalOpen = true;
  }

  // Cerrar modal de añadir categoría
  closeModal() {
    this.isModalOpen = false;
    this.resetNuevaCategoria();
  }

  // Guardar nueva categoría (localmente)
  saveCategory() {
    const nuevaCategoria: NivelesCategoria = {
      id: 0, // Temporal
      id_area: this.Area.id,
      nombre_nivel: this.nuevaCategoria.nombre_nivel,
      descripcion: this.nuevaCategoria.descripcion,
      fecha_examen: new Date(this.formatDate(this.nuevaCategoria.fecha_examen)),
      costo: this.nuevaCategoria.costo,
      habilitacion: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.categorias.push(nuevaCategoria);
    this.closeModal();
  }

  // Abrir modal de confirmación para habilitar/deshabilitar
  openConfirmModal(index: number) {
    this.categoriaIndexToToggle = index;
    this.isConfirmModalOpen = true;
  }

  // Cerrar modal de confirmación
  closeConfirmModal() {
    this.isConfirmModalOpen = false;
    this.categoriaIndexToToggle = null;
  }

  // Cambiar estado de habilitación
  toggleHabilitar() {
    if (this.categoriaIndexToToggle !== null) {
      this.categorias[this.categoriaIndexToToggle].habilitacion = 
        !this.categorias[this.categoriaIndexToToggle].habilitacion;
      this.closeConfirmModal();
    }
  }

  private formatDateForInput(date: Date | string | null): string {
    if (!date) return ''; // Esto cubre tanto null como undefined
    
    // Si es string, intentamos convertirlo a Date
    const d = typeof date === 'string' ? new Date(date) : date;
    
    // Verificamos si la fecha es válida
    if (isNaN(d.getTime())) return '';
    
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  }
  
  // Luego en openEditModal, asegúrate de manejar el caso null
  openEditModal(index: number) {
    this.categoriaIndexToEdit = index;
    const categoria = this.categorias[index];
    
    this.editedCategoria = {
      nombre_nivel: categoria.nombre_nivel,
      descripcion: categoria.descripcion || '',
      fecha_examen: this.formatDateForInput(categoria.fecha_examen), // Ahora acepta null
      costo: categoria.costo.toString()
    };
    
    this.isEditModalOpen = true;
  }

  // Cerrar modal de edición
  closeEditModal() {
    this.isEditModalOpen = false;
    this.categoriaIndexToEdit = null;
  }

  // Guardar cambios de edición
  saveEdit() {
    if (this.categoriaIndexToEdit !== null) {
      const categoria = this.categorias[this.categoriaIndexToEdit];
      
      categoria.nombre_nivel = this.editedCategoria.nombre_nivel;
      categoria.descripcion = this.editedCategoria.descripcion;
      categoria.fecha_examen = new Date(this.formatDate(this.editedCategoria.fecha_examen));
      categoria.costo = this.editedCategoria.costo;
      categoria.updated_at = new Date();
      
      this.closeEditModal();
    }
  }

  // Helpers
  private resetNuevaCategoria() {
    this.nuevaCategoria = {
      nombre_nivel: '',
      descripcion: '',
      fecha_examen: '',
      costo: ''
    };
  }

  private formatDate(dateString: string): string {
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    }
    return dateString;
  }

}