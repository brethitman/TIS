import { Component, Input,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../service/categoria.service';
import { Area } from '../../interfaces/inscripcion.interface';
import { NivelesCategoria } from '../../interfaces/categoria.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-areas-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './areas-card.component.html',
})
export class AreasCardComponent implements OnInit {
  @Input({ required: true }) Area!: Area;
  @Input() categorias: NivelesCategoria[] = [];

  isModalOpen = false;
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
  editedNombreArea = '';
  editedfechaExamen = '';
  editedCosto = 0;

  // Variables para edición de área (nuevas)
  editedAreaNombre = '';
  editedAreaDescripcion = '';
  // Índices para operaciones
  categoriaIndexToToggle: number | null = null;
  categoriaIndexToEdit: number | null = null;
  constructor(private http: HttpClient, private categoriaService: CategoriaService) {}

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

//Funciones de categoria Anahi

  disableManualInput(event: KeyboardEvent): void {
    event.preventDefault(); // Evita que se ingresen datos manualmente con el teclado
  }

  ngOnInit(): void {
    const hoy = new Date();
    this.minDate = hoy.toISOString().split('T')[0];

    const dosAniosDespues = new Date();
    dosAniosDespues.setFullYear(hoy.getFullYear() + 2);
    this.maxDate = dosAniosDespues.toISOString().split('T')[0];
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
  private resetNuevaCategoria() {
    this.nuevaCategoria = {
      nombre_nivel: '',
      descripcion: '',
      fecha_examen: '',
      costo: ''
    };
  }


  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
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
  private formatDate(dateString: string): string {
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    }
    return dateString;
  }

}

