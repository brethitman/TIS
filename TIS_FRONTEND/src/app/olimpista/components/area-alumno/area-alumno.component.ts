import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { InscripcionServicee } from '../../service/iscripcionn.service';
import { OlimpiadaByAreaService } from '../../service/OlimpiadaByArea.service';
import { IDOlimpiadabyArea, NivelCategoria } from '../../interfaces/olimpiadaAreaCategoria.interface';
import { AreaService } from '../../service/area.service';
import { CursoService } from '../../service/curso.service';
import { Curso } from '../../interfaces/curso.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-area-alumno',
  standalone: true,  // Add this for standalone components
  templateUrl: './area-alumno.component.html',
  styleUrls: [],
  imports: [CommonModule, FormsModule]
})
export class AreaAlumnoComponent implements OnInit {
  @Input() estudiantes: any[] = [];
  @Input() areas: any[] = [];

  @Output() estudianteSeleccionado = new EventEmitter<any>();
  @Output() areaSeleccionada = new EventEmitter<any>();
  @Output() inscribir = new EventEmitter<void>();

  isStudentDropdownOpen = false;
  isCursoDropdownOpen = false;
  isAreaDropdownOpen = false;
  isAreaDropdownOpen2 = false;
  estudianteActual: any = null;
  estudiantesSeleccionados: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  areasDisponibles: IDOlimpiadabyArea[] = [];
  categorias!: NivelCategoria[];
  cursos: Curso[] = [];
  isDuplicated = false;
  seleccionArea1: string = 'Seleccionar área';
  seleccionArea2: string = 'Seleccionar área';
  stArea1: IDOlimpiadabyArea | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private olimpiadaByAreaService: OlimpiadaByAreaService,
    private cursoService: CursoService

  ) { }

  ngOnInit(): void {
    this.cargarOlimpiadaId();
    this.cargarCursos();
  }
  private cargarCursos(): void {
    this.cursoService.obtenerCursos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log('Respuesta del servicio:', data); // Verifica en la consola
          console.log('Cantidad de cursos:', this.cursos.length);
          console.log('Lista de cursos:', this.cursos);
          this.cursos = Array.isArray(data) ? data : (data as any).cursos; // Tipo 'any' para evitar error
        },
        error: (error) => {
          console.error('Error cargando cursos:', error);
          this.errorMessage = 'Error al cargar los cursos';
        }
      });
  }

  //traer areas y categorias
  private cargarOlimpiadaId(): void {
    this.route.params.subscribe(params => {
      const olimpiadaId = params['id'];
      if (olimpiadaId) {
        this.cargarAreas(olimpiadaId);
        console.log('datos', olimpiadaId)
      } else {
        console.error('No se encontró ID de olimpiada en la URL');
      }
    });
  }
  private cargarAreas(olimpiadaId: string): void {
    this.olimpiadaByAreaService.getAreasByOlimpiadaId(Number(olimpiadaId))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (areas) => this.areasDisponibles = areas,
        error: (error) => {
          console.error('Error cargando áreas:', error);
          this.errorMessage = 'Error al cargar las áreas disponibles';
        }
      });
  }




  //seleccion
  toggleStudentDropdown(): void {
    this.isStudentDropdownOpen = !this.isStudentDropdownOpen;
    if (this.isStudentDropdownOpen) {
      this.isAreaDropdownOpen = false;
      this.isAreaDropdownOpen2 = false
    }
  }

  toggleAreaDropdown(): void {
    this.isAreaDropdownOpen = !this.isAreaDropdownOpen;
    if (this.isAreaDropdownOpen) {
      this.isStudentDropdownOpen = false;
    }
  }
  toggleAreaDropdown2(): void {
    this.isAreaDropdownOpen2 = !this.isAreaDropdownOpen2;
    if (this.isAreaDropdownOpen2) {
      this.isStudentDropdownOpen = false;
    }
  }

  toggleCursoDropdown(): void {
    this.isCursoDropdownOpen = !this.isCursoDropdownOpen;
  }

  seleccionarEstudiante(estudiante: any): void {
    estudiante.seleccionado = !estudiante.seleccionado;
    this.actualizarSeleccionados();
    this.confirmarSeleccion();
  }
    confirmarSeleccion(): void {
    if (this.estudianteActual) {
      this.estudianteSeleccionado.emit(this.estudianteActual);
      this.isStudentDropdownOpen = false;
    }
  }
  actualizarSeleccionados(): void {
    this.estudiantesSeleccionados = this.estudiantes.filter(est => est.seleccionado);
    this.estudianteSeleccionado.emit(this.estudiantesSeleccionados);
  }
 selectArea1(areaNombre: string) {
  const areaSeleccionada = this.areasDisponibles.find(area => area.nombre_area === areaNombre);
  
  if (areaSeleccionada) {
    this.seleccionArea1 = areaNombre; 
    this.categorias = areaSeleccionada.nivel_categorias?? []; 
    this.isAreaDropdownOpen = false;
    console.log("Categorias", this.categorias)
  }
}
  selectArea2(area2: string) {
    const areaSeleccionada = this.areasDisponibles.find(area => area.nombre_area === area2);
  
  if (areaSeleccionada) {
    this.seleccionArea2 = area2; 
    this.categorias = areaSeleccionada.nivel_categorias?? []; 
    this.isAreaDropdownOpen = false;
    console.log("Categorias", this.categorias)
  }
  }

  inscribirEstudiante(): void {
    this.inscribir.emit();
  }

  toggleDuplicado() {
    this.isDuplicated = !this.isDuplicated;
    this.seleccionArea2 = 'Seleccionar área'
  }

}