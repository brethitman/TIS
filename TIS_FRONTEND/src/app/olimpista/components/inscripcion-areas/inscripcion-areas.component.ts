import { Component } from '@angular/core';
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
  area: Area = {
    id: 0,
    nombre_area: '',
    descripcion: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  errors = {
    nombreArea: '',
    cursos: '',
    descripcion: '',
    duplicado: ''
  };

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
    
    this.validateDescripcionLength();
  }

  validateNombreArea(): boolean {
    this.errors.nombreArea = '';
    
    if (!this.area.nombre_area || this.area.nombre_area.trim() === '') {
      this.errors.nombreArea = 'El nombre del área es obligatorio';
      return false;
    }
    
    if (this.area.nombre_area.length < 3) {
      this.errors.nombreArea = 'El nombre del área debe tener al menos 3 caracteres';
      return false;
    }
    
    if (this.area.nombre_area.length > 100) {
      this.errors.nombreArea = 'El nombre del área debe tener máximo 100 caracteres';
      return false;
    }
    
    const especialesRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (especialesRegex.test(this.area.nombre_area)) {
      this.errors.nombreArea = 'El nombre del área no debe contener caracteres especiales';
      return false;
    }
    const numerosRegex = /^\d+$/;
    if (numerosRegex.test(this.area.nombre_area)) {
      this.errors.nombreArea = 'El nombre del área no puede contener solo números';
      return false;
    }
    
    const alfabeticoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    if (!alfabeticoRegex.test(this.area.nombre_area)) {
      this.errors.nombreArea = 'El nombre del área debe contener solo caracteres alfabéticos';
      return false;
    }
    
    return true;
  }

  validateCursos(): boolean {
    this.errors.cursos = '';
    
    const selected = this.grades.filter((grade) => grade.selected);
    if (selected.length === 0) {
      this.errors.cursos = 'Debe seleccionar al menos un curso';
      return false;
    }
    
    return true;
  }

  validateDescripcionLength(): boolean {
    this.errors.descripcion = '';
    
    if (this.area.descripcion && this.area.descripcion.length > 50) {
      this.errors.descripcion = 'La descripción debe tener máximo 50 caracteres';
      return false;
    }
    
    return true;
  }

  validateAll(): boolean {
    const isNombreValid = this.validateNombreArea();
    const isCursosValid = this.validateCursos();
    const isDescripcionValid = this.validateDescripcionLength();
    
    return isNombreValid && isCursosValid && isDescripcionValid;
  }

  onSubmit(): void {
    this.errors.duplicado = '';
    
    if (!this.validateAll()) {
      return;
    }
  
    try {
     
      const areaToSend: Area = {
        id: 0, 
        nombre_area: this.area.nombre_area,
        descripcion: this.area.descripcion, 
        createdAt: new Date(), 
        updatedAt: new Date(), 
      };
  
      console.log('Datos a enviar:', areaToSend);
  
      this.areaService.createArea(areaToSend).pipe(
        catchError(error => {
          if (error.status === 409 || (error.error && error.error.message && error.error.message.includes('existe'))) {
            this.errors.duplicado = 'El área ya existe y no puede ser duplicada';
          } else {
            console.error('Error al guardar el área:', error);
            alert('Hubo un error al guardar el área: ' + (error.message || 'Error desconocido'));
          }
          return of(null);
        })
      ).subscribe({
        next: (response) => {
          if (response) {
            console.log('Área guardada:', response);
            alert('Área guardada con éxito');
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

  resetForm() {
    this.area = {
      id: 0,
      nombre_area: '',
      descripcion: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.grades.forEach((grade) => (grade.selected = false));
    this.selectedGrades = '';
    this.isDropdownOpen = false;
    
    this.errors = {
      nombreArea: '',
      cursos: '',
      descripcion: '',
      duplicado: ''
    };
  }
}