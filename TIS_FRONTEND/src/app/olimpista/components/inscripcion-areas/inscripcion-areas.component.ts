import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AreaService } from '../../service/area.service';
import { Area } from '../../interfaces/area.interface';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-inscripcion-areas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inscripcion-areas.component.html',
})
export class InscripcionAreasComponent {
  @Output() areaCreated = new EventEmitter<Area>();
  // Propiedades para el formulario de áreas
  area: Area = {
    id: 0,
    nombre_area: '',
    descripcion: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Propiedades para las validaciones
  errors = {
    nombreArea: '',
    cursos: '',
    descripcion: '',
    duplicado: ''
  };

  // Propiedades para el desplegable de cursos
  isDropdownOpen: boolean = false;
  grades = [
    { name: '1ro de Primaria', selected: false },
    { name: '2do de Primaria', selected: false },
    { name: '3ro de Primaria', selected: false },
    { name: '4to de Primaria', selected: false },
    { name: '5to de Primaria', selected: false },
    { name: '6to de Primaria', selected: false },
    { name: '1ro de Secundaria', selected: false },
    { name: '2do de Secundaria', selected: false },
    { name: '3ro de Secundaria', selected: false },
    { name: '4to de Secundaria', selected: false },
    { name: '5to de Secundaria', selected: false },
    { name: '6to de Secundaria', selected: false },
  ];
  selectedGrades = '';

  constructor(private areaService: AreaService) {}

  // Método para abrir/cerrar el desplegable
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Método para actualizar los cursos seleccionados en tiempo real
  updateSelectedGrades() {
    const selected = this.grades.filter((grade) => grade.selected);
  
    if (selected.length > 0) {
      const primero = selected[0].name;
      const ultimo = selected[selected.length - 1].name;
      this.area.descripcion = `de ${primero} a ${ultimo}`; 
      this.errors.cursos = '';
    } else {
      this.area.descripcion = ''; // Si no hay cursos seleccionados, la descripción queda vacía
    }
  
    this.selectedGrades = selected.map((grade) => grade.name).join(', ');
    
    // Validar la longitud de la descripción
    this.validateDescripcionLength();
  }

  // Validar el nombre del área
  validateNombreArea(): boolean {
    this.errors.nombreArea = '';
    
    // Validar que no esté vacío
    if (!this.area.nombre_area || this.area.nombre_area.trim() === '') {
      this.errors.nombreArea = 'El nombre del área es obligatorio';
      return false;
    }
    
    // Validar longitud mínima
    if (this.area.nombre_area.length < 3) {
      this.errors.nombreArea = 'El nombre del área debe tener al menos 3 caracteres';
      return false;
    }
    
    // Validar longitud máxima
    if (this.area.nombre_area.length > 100) {
      this.errors.nombreArea = 'El nombre del área debe tener máximo 100 caracteres';
      return false;
    }
    
    // Validar que no contenga caracteres especiales
    const especialesRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (especialesRegex.test(this.area.nombre_area)) {
      this.errors.nombreArea = 'El nombre del área no debe contener caracteres especiales';
      return false;
    }
    
    // Validar que no sea solo números
    const numerosRegex = /^\d+$/;
    if (numerosRegex.test(this.area.nombre_area)) {
      this.errors.nombreArea = 'El nombre del área no puede contener solo números';
      return false;
    }
    
    // Validar que solo tenga caracteres alfabéticos y espacios
    const alfabeticoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    if (!alfabeticoRegex.test(this.area.nombre_area)) {
      this.errors.nombreArea = 'El nombre del área debe contener solo caracteres alfabéticos';
      return false;
    }
    
    return true;
  }

  // Validar que al menos un curso esté seleccionado
  validateCursos(): boolean {
    this.errors.cursos = '';
    
    const selected = this.grades.filter((grade) => grade.selected);
    if (selected.length === 0) {
      this.errors.cursos = 'Debe seleccionar al menos un curso';
      return false;
    }
    
    return true;
  }

  // Validar la longitud de la descripción
  validateDescripcionLength(): boolean {
    this.errors.descripcion = '';
    
    if (this.area.descripcion && this.area.descripcion.length > 50) {
      this.errors.descripcion = 'La descripción debe tener máximo 50 caracteres';
      return false;
    }
    
    return true;
  }

  // Validar todos los campos
  validateAll(): boolean {
    const isNombreValid = this.validateNombreArea();
    const isCursosValid = this.validateCursos();
    const isDescripcionValid = this.validateDescripcionLength();
    
    return isNombreValid && isCursosValid && isDescripcionValid;
  }

  onSubmit(): void {
    // Limpiar mensaje de error de duplicado
    this.errors.duplicado = '';
    
    // Realizar todas las validaciones
    if (!this.validateAll()) {
      return;
    }
  
    try {
      // Creamos una copia del objeto area para enviar, incluyendo las propiedades requeridas
      const areaToSend: Area = {
        id: 0, // Asignamos un valor temporal (el backend probablemente lo ignorará o generará uno nuevo)
        nombre_area: this.area.nombre_area,
        descripcion: this.area.descripcion, // Usamos la descripción generada
        createdAt: new Date(), // Fecha actual
        updatedAt: new Date(), // Fecha actual
      };
  
      // Verificar los datos antes de enviarlos
      console.log('Datos a enviar:', areaToSend);
  
      // Enviar el objeto completo
      this.areaService.createArea(areaToSend).pipe(
        catchError(error => {
          // Verificar si el error es debido a un área duplicada
          if (error.status === 422 && error.error && error.error.errors && error.error.errors.nombre_area) {
            // Error de validación del backend (área duplicada)
            this.errors.duplicado = 'Esta área ya existe en el sistema. Por favor, utilice un nombre diferente.';
          } else if (error.status === 409 || (error.error && error.error.message && error.error.message.includes('existe'))) {
            this.errors.duplicado = 'Esta área ya existe en el sistema. Por favor, utilice un nombre diferente.';
          } else {
            console.error('Error al guardar el área:', error);
            this.errors.duplicado = 'Ha ocurrido un error al intentar guardar el área. Por favor, intente nuevamente.';
          }
          return of(null);
        })
      ).subscribe({
        next: (response) => {
          if (response) {
            console.log('Área guardada:', response);
            alert('Área guardada con éxito');
            // Emitir el evento con la nueva área
            this.areaCreated.emit(response);
            // Resetear el formulario
            this.resetForm();
          }
        }
      });
    } catch (e) {
      console.error('Error en la ejecución:', e);
      alert('Ocurrió un error inesperado');
    }
  }

  // Método para resetear el formulario
  resetForm() {
    this.area = {
      id: 0,
      nombre_area: '',
      descripcion: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Resetear las selecciones de cursos
    this.grades.forEach((grade) => (grade.selected = false));
    this.selectedGrades = '';
    this.isDropdownOpen = false;
    
    // Limpiar los errores
    this.errors = {
      nombreArea: '',
      cursos: '',
      descripcion: '',
      duplicado: ''
    };
  }
}