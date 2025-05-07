import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-area-alumno', // ← Este debe coincidir con el usado en el HTML
  templateUrl: './area-alumno.component.html',
  styleUrls: [],
  imports: [CommonModule]
})
export class AreaAlumnoComponent {
  @Input() estudiantes: any[] = [];
  @Input() areas: any[] = [];

  @Output() estudianteSeleccionado = new EventEmitter<any>();
  @Output() areaSeleccionada = new EventEmitter<any>();
  @Output() inscribir = new EventEmitter<void>();

  isStudentDropdownOpen = false;
  isAreaDropdownOpen = false;
  estudianteActual: any = null;

  toggleStudentDropdown(): void {
    this.isStudentDropdownOpen = !this.isStudentDropdownOpen;
    if (this.isStudentDropdownOpen) {
      this.isAreaDropdownOpen = false;
    }
  }

  toggleAreaDropdown(): void {
    this.isAreaDropdownOpen = !this.isAreaDropdownOpen;
    if (this.isAreaDropdownOpen) {
      this.isStudentDropdownOpen = false;
    }
  }
  seleccionarEstudiante(estudiante: any): void {
    this.estudianteSeleccionado.emit(estudiante);
    this.isStudentDropdownOpen = false;
  }

  seleccionarArea(area: any): void {
    this.areaSeleccionada.emit(area);
    this.isAreaDropdownOpen = false;
  }

  inscribirEstudiante(): void {
    this.inscribir.emit();
  }
}
