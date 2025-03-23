import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AreaService } from '../../service/area.service';
import { Area } from '../../interfaces/area.interface';

@Component({
  selector: 'app-inscripcion-areas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inscripcion-areas.component.html',
})
export class InscripcionAreasComponent {
  // Propiedades para el formulario de áreas
  area: Area = {
    id: 0,
    nombre_area: '',
    descripcion: '',
    createdAt: new Date(),
    updatedAt: new Date(),
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
    } else {
      this.area.descripcion = ''; // Si no hay cursos seleccionados, la descripción queda vacía
    }
  
    this.selectedGrades = selected.map((grade) => grade.name).join(', ');
  }

  onSubmit(): void {
    // Verificar que el nombre del área no esté vacío
    if (!this.area.nombre_area || this.area.nombre_area.trim() === '') {
      alert('El nombre del área es obligatorio');
      return;
    }
  
    // Generar la descripción en el formato deseado
    const selected = this.grades.filter((grade) => grade.selected);
    if (selected.length > 0) {
      const primero = selected[0].name;
      const ultimo = selected[selected.length - 1].name;
      this.area.descripcion = `de ${primero} a ${ultimo}`; // Sin "Descripción:"
    } else {
      this.area.descripcion = ''; // Si no hay cursos seleccionados, la descripción queda vacía
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
      this.areaService.createArea(areaToSend).subscribe({
        next: (response) => {
          console.log('Área guardada:', response);
          alert('Área guardada con éxito');
          // Resetear el formulario
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al guardar el área:', error);
          alert('Hubo un error al guardar el área: ' + (error.message || 'Error desconocido'));
        },
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
  }
}