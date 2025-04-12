import { Component, Input, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
  @Input({}) NivCategoria !: NivelesCategoria;

  private progreso: boolean = false;

  isModalOpen = false;
  isDeleteModalOpen = false;
  isConfirmModalOpen = false;
  isEditModalOpen = false;
  isAreaEditModalOpen = false;
  minDate: string = '';
  maxDate: string = '';
  errorMessage: string = '';
  cardIndexToToggle: number | null = null;

  categoriaNombre: string = '';
  categoriaDescripcion: string = '';
  categoriaFechaExamen: string = ''; // formato dd/mm/yyyy
  categoriaCosto: string = ''; // Modificado para ser un string
  cardIndexToEdit: number | null = null;
  // Variables para edición de área (nuevas)
  editedAreaNombre = '';
  editedAreaDescripcion = '';
  // Índices para operaciones
  categoriaIndexToToggle: number | null = null;
  categoriaIndexToEdit: number | null = null;
  isEditOpenC = false; // Estado del modal
  editIndex: number | null = null;

  cards: {
    nombre_Categoria: string;
    descripcion: string;
    habilitada: boolean;
    costo: number;
    fecha_examen: string;
  }[] = [];

  nuevaCategoria = {
    nombre_nivel: '',
    descripcion: '',
    fecha_examen: '',
    costo: ''
  };

  editedCategoriaTemp = {
    nombre_nivel: '',
    descripcion: null as string | null,
    fecha_examen: null as Date | null, // Permitir null en fecha_examen
    costo: 0
  };

  constructor(private http: HttpClient, private categoriaService: CategoriaService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarCategorias();
    this.fechaLimite();
  }
  
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
    this.categoriaIndexToToggle = index;
    this.isConfirmModalOpen = true;
  }

  closeConfirmModal(): void {
    this.isConfirmModalOpen = false;
    this.categoriaIndexToToggle = null;
  }

  openEditModal(index: number) {
    if (index < 0 || index >= this.categorias.length) {
      console.error('Índice fuera de rango:', index);
      return;
    }

    const categoria = this.categorias[index];
    this.editedCategoriaTemp = {
      nombre_nivel: categoria.nombre_nivel,
      descripcion: categoria.descripcion,
      fecha_examen: categoria.fecha_examen 
      ? new Date(categoria.fecha_examen) 
      : null,
      costo: categoria.costo
    };
    console.log("Visualizacion del modal de Editar",this.editedCategoriaTemp)
    this.editIndex = index;
    this.isEditModalOpen = true;
  }
  closeEditModal() {
    this.isEditModalOpen = false; // Corrige la referencia a isEditModalOpen
    this.editIndex = null; // Reinicia el índice
    this.editedCategoriaTemp = {
      nombre_nivel: '',
      descripcion: '',
      fecha_examen: new Date(),
      costo: 0
    };
  }

  saveEdit() {
    if (this.editIndex !== null && this.editIndex >= 0) {
      const cambios = {
        nombre_nivel: this.editedCategoriaTemp.nombre_nivel,
        descripcion: this.editedCategoriaTemp.descripcion,
        fecha_examen: this.editedCategoriaTemp.fecha_examen || new Date(),
        costo: this.editedCategoriaTemp.costo
      };

      this.categoriaService.actualizarNivel(this.categorias[this.editIndex].id, cambios)
        .subscribe(
          (respuesta) => {
            if (this.editIndex !== null && this.editIndex >= 0) {
              this.categorias[this.editIndex] = { ...respuesta.nivelCategoria };
            } else {
              console.error('editIndex es inválido durante la actualización.');
            }
            this.closeEditModal(); // Cierra el modal después de guardar
          },
          (error) => {
            console.error('Error al actualizar la categoría:', error);
          }
        );

    }
  }

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

  saveCategory(form: NgForm): void {
    if (form.invalid) {
      // Marcar todos los campos como "touched" para mostrar errores
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
      
      console.warn('Formulario inválido. No se puede guardar la categoría.');
      return;
    }
  
    // Verificación adicional de campos requeridos
    if (!this.nuevaCategoria.nombre_nivel || !this.nuevaCategoria.descripcion || 
        !this.nuevaCategoria.fecha_examen || !this.nuevaCategoria.costo) {
      console.warn('Todos los campos son requeridos');
      return;
    }

    const categoriaData = {
      id_area: this.Area.id,
      nombre_nivel: this.nuevaCategoria.nombre_nivel,
      descripcion: this.nuevaCategoria.descripcion || null,
      fecha_examen: this.nuevaCategoria.fecha_examen ? new Date(this.nuevaCategoria.fecha_examen) : null,
      costo: Number(this.nuevaCategoria.costo),
      habilitacion: true,
    };
    console.log('Datos enviados al backend:', categoriaData);

    this.categoriaService.crearNivelCategoria(categoriaData).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        this.categorias = [...this.categorias, response.nivelCategoria];
        console.log('Lista de categorías actualizada:', this.categorias);
        this.cdr.detectChanges(); // (opcional si sigue siendo necesario)
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al crear categoría:', err);
      }
    });
}

  toggleHabilitacionModal(index: number): void {
    this.categoriaIndexToToggle = index;
    this.isConfirmModalOpen = true;
  }

  toggleHabilitar(): void {
    if (this.categoriaIndexToToggle !== null) {
      const categoria = this.categorias[this.categoriaIndexToToggle];
      const nuevoEstado = !categoria.habilitacion; 
  
      console.log('Estado antes de cambiar:', categoria.habilitacion); 
  
      this.categoriaService.habilitarCategoria(categoria.id, nuevoEstado).subscribe({
        next: (updatedCategoria) => {
          if (updatedCategoria && updatedCategoria.nivelCategoria) {
            categoria.habilitacion = updatedCategoria.nivelCategoria.habilitacion;
            console.log('Estado actualizado desde el backend:', categoria.habilitacion); 
          } else {
            console.error('La respuesta del backend no contiene nivelCategoria o habilitacion es undefined.');
          }
          this.closeConfirmModal(); 
        },
        error: (error) => {
          console.error('Error al actualizar habilitación:', error);
          this.closeConfirmModal(); 
        }
      });
    }
  }
  

  getHabilitacionTexto(): string {
    if (this.categoriaIndexToToggle === null) return '';
    const habilitacion = this.categorias[this.categoriaIndexToToggle]?.habilitacion;
    return habilitacion ? 'deshabilitar' : 'habilitar';
  }

}