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
  @Input() categorias: NivelesCategoria[] = [];

  isModalOpen = false;
  isDeleteModalOpen = false;
  isConfirmModalOpen = false;
  isEditModalOpen = false;
  isAreaEditModalOpen = false;
  minDate: string = '';
  maxDate: string = '';
  errorMessage: string = '';
  cardIndexToToggle: number | null = null;
  categoriaToDelete: number | null = null;

  categoriaNombre: string = '';
  categoriaDescripcion: string = '';
  categoriaFechaExamen: string = ''; // formato dd/mm/yyyy
  categoriaCosto: string = ''; // Modificado para ser un string
  cardIndexToEdit: number | null = null;
  editedNombreArea = '';
  editedfechaExamen = '';
  editedCosto = 0;

  // Variables para edición de área (nuevas)
  editedAreaNombre = '';
  editedAreaDescripcion = '';
  // Índices para operaciones
  categoriaIndexToToggle: number | null = null;
  categoriaIndexToEdit: number | null = null;

  formData = {
    nombreCategoria: '',
    seleccionCategoria: '',
    fechaExamen: '',
    costoCategoria: '',
  };

  cards: {
    nombre_area: string;
    descripcion: string;
    habilitada: boolean;
    costo: number;
    fecha_examen: string;
  }[] = [];

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

  constructor(private http: HttpClient, private categoriaService: CategoriaService) { }

  //Funciones del Area Valeria
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

  //Funciones de categoria Andrea
  openConfirmModal(index: number) {
    this.categoriaIndexToToggle= index;
    this.isConfirmModalOpen = true;
  }

  closeConfirmModal(): void {
    this.isConfirmModalOpen = false; 
    this.categoriaIndexToToggle = null; 
  }

  openEditModal(index: number) {
    this.cardIndexToEdit = index;
    this.editedNombreArea = this.cards[index].nombre_area;
    this.editedfechaExamen = this.cards[index].fecha_examen;
    this.editedCosto = this.cards[index].costo;
    this.isEditModalOpen = true;
    const categoria = this.categorias[index];
    if (!categoria) {
      console.error('La categoría no existe en la posición:', index);
      return;
    }
    console.log(categoria.nombre_nivel); 
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
  //Funciones de categoria Anahi

  disableManualInput(event: KeyboardEvent): void {
    event.preventDefault();
  }

  fechaLimite(): void {
    const hoy = new Date();
    this.minDate = hoy.toISOString().split('T')[0]; // Fecha actual (mínima)

    const dosAniosDespues = new Date();
    dosAniosDespues.setFullYear(hoy.getFullYear() + 2); // Fecha dos años después
    this.maxDate = dosAniosDespues.toISOString().split('T')[0]; // Fecha máxima
  }

  validateDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedDate = new Date(input.value);
    const currentDate = new Date(this.minDate);
    const maxDate = new Date(this.maxDate);

    if (selectedDate < currentDate) {
      this.errorMessage = 'La fecha no debe ser anterior a la actual.';
    } else if (selectedDate > maxDate) {
      this.errorMessage = 'La fecha no debe ser mayor a dos años.';
    } else {
      this.errorMessage = '';
    }
  }

  // Helpers
  private resetNuevaCategoria(): void {
    this.nuevaCategoria = {
      nombre_nivel: '',
      descripcion: '',
      fecha_examen: '',
      costo: ''
    };
  }

  ngOnInit(): void {
    this.cargarCategorias();
    this.fechaLimite();
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

  toggleHabilitacionModal(index: number): void {
    this.categoriaIndexToToggle = index; // Guarda el índice de la categoría seleccionada
    this.isConfirmModalOpen = true; // Muestra el modal
  }

  toggleHabilitar(): void {
    if (this.categoriaIndexToToggle !== null) {
      const categoria = this.categorias[this.categoriaIndexToToggle]; // Obtiene la categoría seleccionada
      const nuevoEstado = !categoria.habilitacion; // Cambia el estado de habilitación
  
      this.categoriaService.habilitarCategoria(categoria.id, nuevoEstado).subscribe({
        next: (updatedCategoria) => {
          categoria.habilitacion = updatedCategoria.habilitacion; // Actualiza la categoría en la UI
          this.closeConfirmModal(); // Cierra el modal
        },
        error: (error) => {
          console.error('Error al actualizar habilitación:', error);
          this.closeConfirmModal(); // Cierra el modal aunque ocurra un error
        }
      });
    }
  }

  getHabilitacionTexto(): string {
    if (this.categoriaIndexToToggle === null) return ''; // Si no hay índice, devolver vacío
    const habilitacion = this.categorias[this.categoriaIndexToToggle]?.habilitacion;
    return habilitacion ? 'deshabilitar' : 'habilitar';
  }
  
}