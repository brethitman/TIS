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

@Component({
  selector: 'app-area-alumno',
  standalone: true,  // Add this for standalone components
  templateUrl: './area-alumno.component.html',
  styleUrls: [],
  imports: [CommonModule]
})
export class AreaAlumnoComponent implements OnInit {
  @Input() estudiantes: any[] = [];
  @Input() areas: any[] = [];

  @Output() estudianteSeleccionado = new EventEmitter<any>();
  @Output() areaSeleccionada = new EventEmitter<any>();
  @Output() inscribir = new EventEmitter<void>();

  isStudentDropdownOpen = false;
  isAreaDropdownOpen = false;
  estudianteActual: any = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  areasDisponibles: IDOlimpiadabyArea[] = [];
  categorias!: NivelCategoria[];
  cursos: Curso[] = [];
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
  this.cursoService.obtenerCursos().subscribe({
    next: (response: any) => {
      // Fuerza la conversión a array sin importar el formato
      const rawData = JSON.parse(JSON.stringify(response));
      
      // Extrae los cursos sin importar cómo vengan
      this.cursos = rawData?.data || rawData?.cursos || rawData || [];
      
      // DEBUG: Verifica TODOS los cursos recibidos
      console.log('=== DEBUG: TODOS LOS CURSOS RECIBIDOS ===');
      console.table(this.cursos);
      
      // DEBUG: Filtra específicamente primaria
      console.log('=== DEBUG: CURSOS PRIMARIA ===');
      console.table(this.cursos.filter((c: any) => c.nameCurso?.includes('primaria')));
      
      // Asignación final forzada (incluyendo manualmente si es necesario)
      if (!this.cursos.some((c: any) => c.nameCurso === '1ro primaria')) {
        this.cursos.unshift({ id: 13, nameCurso: '1ro primaria', nivelCategorias: [] });
      }
      if (!this.cursos.some((c: any) => c.nameCurso === '2do primaria')) {
        this.cursos.unshift({ id: 14, nameCurso: '2do primaria', nivelCategorias: [] });
      }
    },
    error: (error) => {
      console.error('Error:', error);
      // Asignación manual de emergencia
      this.cursos = [
        { id: 13, nameCurso: '1ro primaria', nivelCategorias: [] },
        { id: 14, nameCurso: '2do primaria', nivelCategorias: [] },
        // ... otros cursos manualmente si es necesario
      ];
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
    }
  }

  toggleAreaDropdown(): void {
    this.isAreaDropdownOpen = !this.isAreaDropdownOpen;
    if (this.isAreaDropdownOpen) {
      this.isStudentDropdownOpen = false;
    }
  }
  isCursoDropdownOpen = false;

  toggleCursoDropdown(): void {
    this.isCursoDropdownOpen = !this.isCursoDropdownOpen;
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