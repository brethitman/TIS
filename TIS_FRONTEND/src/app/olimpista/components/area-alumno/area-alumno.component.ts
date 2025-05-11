import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Define the Curso interface here since the file is missing
interface Curso {
  id: number;
  nameCurso: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-area-alumno',
  standalone: true,  // Add this for standalone components
  templateUrl: './area-alumno.component.html',
  styleUrls: [],
  imports: [CommonModule, HttpClientModule]  // Add HttpClientModule here
})
export class AreaAlumnoComponent implements OnInit {
  cursos: Curso[] = [];
  isCursoDropdownOpen = false;
  
  constructor(private http: HttpClient) {}
  
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

  ngOnInit(): void {
    this.obtenerCursos();
  }

  obtenerCursos(): void {
    this.http.get<Curso[]>('http://127.0.0.1:8000/api/cursos').subscribe(
      (data: Curso[]) => {
        this.cursos = data;
      },
      (error: any) => {
        console.error('Error al obtener cursos:', error);
      }
    );
  }

  toggleCursoDropdown(): void {
    this.isCursoDropdownOpen = !this.isCursoDropdownOpen;
  }
}