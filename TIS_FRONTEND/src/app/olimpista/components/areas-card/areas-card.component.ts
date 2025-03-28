import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../service/categoria.service';
import { Area } from '../../interfaces/inscripcion.interface';
import { NivelesCategoria } from '../../interfaces/categoria.interface';
import { AreaService } from '../../service/area.service'; // Importamos el servicio de áreas

@Component({
  selector: 'app-areas-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './areas-card.component.html',
})
export class AreasCardComponent implements OnInit {
  @Input({ required: true }) Area!: Area;
  categorias: NivelesCategoria[] = [];

  isModalOpen = false;
  isDeleteModalOpen = false;
  isEditAreaModalOpen = false; // Nuevo modal para editar área
  categoriaToDelete: number | null = null;

  nuevaCategoria = {
    nombre_nivel: '',
    descripcion: '',
    fecha_examen: '',
    costo: ''
  };

  areaEditData = { // Nuevo objeto para editar área
    nombre_area: '',
    descripcion: ''
  };

  constructor(
    private categoriaService: CategoriaService,
    private areaService: AreaService // Inyectamos el servicio
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  // Método para abrir el modal de edición de área
  openEditAreaModal(): void {
    this.areaEditData = {
      nombre_area: this.Area.nombre_area,
      descripcion: this.Area.descripcion || ''
    };
    this.isEditAreaModalOpen = true;
  }

  // Método para cerrar el modal de edición de área
  closeEditAreaModal(): void {
    this.isEditAreaModalOpen = false;
  }

  // Método para guardar los cambios del área
  saveAreaChanges(): void {
    this.areaService.updateArea(this.Area.id, this.areaEditData).subscribe({
      next: (updatedArea) => {
        this.Area.nombre_area = updatedArea.nombre_area;
        this.Area.descripcion = updatedArea.descripcion;
        this.closeEditAreaModal();
      },
      error: (err) => {
        console.error('Error al actualizar el área:', err);
      }
    });
  }

  // Resto del código existente...
  cargarCategorias(): void {
    this.categoriaService.obtenerNivelesCategoria().subscribe({
      next: (response) => {
        this.categorias = response.nivelesCategoria.filter(
          cat => cat.id_area === this.Area.id
        );
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetNuevaCategoria();
  }

  saveCategory(): void {
    const categoriaData = {
      id_area: this.Area.id,
      nombre_nivel: this.nuevaCategoria.nombre_nivel,
      descripcion: this.nuevaCategoria.descripcion || null,
      fecha_examen: this.nuevaCategoria.fecha_examen ? new Date(this.nuevaCategoria.fecha_examen) : null,
      costo: Number(this.nuevaCategoria.costo),
      habilitacion: true
    };

    this.categoriaService.crearNivelCategoria(categoriaData).subscribe({
      next: (response) => {
        this.categorias.push(response);
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al crear categoría:', err);
      }
    });
  }

  openDeleteModal(categoriaId: number): void {
    this.categoriaToDelete = categoriaId;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.categoriaToDelete = null;
  }

  confirmDelete(): void {
    if (this.categoriaToDelete) {
      this.categoriaService.eliminarNivel(this.categoriaToDelete).subscribe({
        next: () => {
          this.categorias = this.categorias.filter(
            cat => cat.id !== this.categoriaToDelete
          );
          this.closeDeleteModal();
        },
        error: (err) => {
          console.error('Error al eliminar categoría:', err);
        }
      });
    }
  }

  toggleHabilitacion(categoria: NivelesCategoria): void {
    const nuevosDatos = {
      habilitacion: !categoria.habilitacion
    };

    this.categoriaService.actualizarNivel(categoria.id, nuevosDatos).subscribe({
      next: (response) => {
        categoria.habilitacion = response.habilitacion;
      },
      error: (err) => {
        console.error('Error al actualizar estado:', err);
      }
    });
  }

  private resetNuevaCategoria(): void {
    this.nuevaCategoria = {
      nombre_nivel: '',
      descripcion: '',
      fecha_examen: '',
      costo: ''
    };
  }
}
