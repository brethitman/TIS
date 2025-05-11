import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { InscripcionServicee } from '../../service/iscripcionn.service';
import { OlimpiadaByAreaService } from '../../service/OlimpiadaByArea.service';
import { IDOlimpiadabyArea, NivelCategoria } from '../../interfaces/olimpiadaAreaCategoria.interface';
import { AreaService } from '../../service/area.service';

@Component({
  selector: 'app-area-alumno', // ← Este debe coincidir con el usado en el HTML
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
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private olimpiadaByAreaService: OlimpiadaByAreaService,

  ) { }

  ngOnInit(): void {
    this.cargarOlimpiadaId();
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
