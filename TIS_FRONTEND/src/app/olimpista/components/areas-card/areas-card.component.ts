import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Area } from '../../interfaces/inscripcion.interface';
import { CommonModule } from '@angular/common';
import { NivelesCategoria } from '../../interfaces/categoria.interface';
import { CategoriaService } from '../../service/categoria.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-areas-card',
  imports: [CommonModule],
  templateUrl: './areas-card.component.html',
})

export class AreasCardComponent implements OnInit {
  @Input({ required: true }) Area!: Area;

  // Variables para modales (se mantienen todas)
  isModalOpen = false;
  isConfirmModalOpen = false;
  isEditModalOpen = false;
  isAreaEditModalOpen = false; // Nueva variable para el modal de edición de área

  // Variables para edición de área (nuevas)
  editedAreaNombre = '';
  editedAreaDescripcion = '';

  // Variables existentes para categorías (no se modifican)
  cards: {
    nombre_area: string;
    descripcion: string;
    habilitada: boolean;
    costo: number;
    fecha_examen: string;
  }[] = [];

  cardIndexToToggle: number | null = null;
  cardIndexToEdit: number | null = null;
  editedNombreArea = '';
  editedfechaExamen = '';
  editedCosto = 0;

  constructor(private http: HttpClient, private categoriaService: CategoriaService) {}

  ngOnInit() {
    // Inicialización si es necesaria
  }

  // =============================================
  // NUEVOS MÉTODOS PARA EDICIÓN DE ÁREA
  // =============================================
  openAreaEditModal() {
    this.editedAreaNombre = this.Area.nombre_area;
    this.editedAreaDescripcion = this.Area.descripcion || '';
    this.isAreaEditModalOpen = true;
  }

  closeAreaEditModal() {
    this.isAreaEditModalOpen = false;
  }

  saveAreaEdit() {
    if (!this.Area.id) {
      console.error('ID del área no disponible');
      return;
    }

    const updateData = {
      nombre_area: this.editedAreaNombre,
      descripcion: this.editedAreaDescripcion
    };

    this.http.put(`/api/areas/${this.Area.id}`, updateData)
      .subscribe({
        next: (response: any) => {
          console.log('Área actualizada exitosamente', response);
          this.Area.nombre_area = this.editedAreaNombre;
          this.Area.descripcion = this.editedAreaDescripcion;
          this.closeAreaEditModal();
        },
        error: (error) => {
          console.error('Error al actualizar el área', error);
          // Aquí puedes agregar notificación de error al usuario
        }
      });
  }

  // =============================================
  // MÉTODOS EXISTENTES DE CATEGORÍAS (NO MODIFICADOS)
  // =============================================
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
      fecha_examen: '',
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
    this.editedfechaExamen = this.cards[index].fecha_examen;
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
      this.cards[this.cardIndexToEdit].fecha_examen = this.editedfechaExamen;
      this.cards[this.cardIndexToEdit].costo = this.editedCosto;
      console.log(`Tarjeta en índice ${this.cardIndexToEdit} editada.`);
      this.closeEditModal();
    }
  }
}

