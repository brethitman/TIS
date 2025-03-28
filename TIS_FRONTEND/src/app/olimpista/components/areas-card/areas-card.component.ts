import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../service/categoria.service';
import { Area } from '../../interfaces/inscripcion.interface';
import { NivelesCategoria } from '../../interfaces/categoria.interface';
import { HttpClient } from '@angular/common/http';

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
  categoriaToDelete: number | null = null;

  nuevaCategoria = {
    nombre_nivel: '',
    descripcion: '',
    fecha_examen: '',
    costo: ''
  };

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

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
