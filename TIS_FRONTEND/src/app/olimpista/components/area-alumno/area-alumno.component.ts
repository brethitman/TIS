import { Component, Input, Output, EventEmitter, OnInit, input } from '@angular/core';
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
  @Input() tutores: any[][] = [];
  @Input() estInscripcion: any[][] = [];
  @Input() areas: any[] = [];

  @Output() estudianteSeleccionado = new EventEmitter<any>();
  @Output() areaSeleccionada = new EventEmitter<any>();
  @Output() inscribir = new EventEmitter<void>();

  isStudentDropdownOpen = false;
  isCursoDropdownOpen = false;
  isAreaDropdownOpen = false;
  isAreaDropdownOpen2 = false;
  isCategoriaDropdownOpen = false;
  isCategoriaDropdownOpen2 = false;
  estudianteActual: any = null;
  estudiantesSeleccionados: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  areasDisponibles: IDOlimpiadabyArea[] = [];
  categorias!: NivelCategoria[];
  categorias2!: NivelCategoria[];
  cursos: Curso[] = [];
  isDuplicated = false;
  cursoSeleccionado: Curso | null = null;
  seleccionArea1: string = 'Seleccionar área';
  seleccionArea2: string = 'Seleccionar área';
  seleccionCategoria: string = 'Selecciona una categoría';
  seleccionCategoria2: string = 'Selecciona una categoría';
  stArea1: IDOlimpiadabyArea | null = null;
  id_categoria1: any = 0;
  id_categoria2: any = 0;
  id_area1: any = 0;
  id_area2: any = 0;
  areasInscripcion: any[] = []; //Especificamente para Inscripcion 
  clickCount = 0;//pueden eliminar es solo una prueba para la inscripcion 

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private olimpiadaByAreaService: OlimpiadaByAreaService,
    private cursoService: CursoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarOlimpiadaId();
    this.cargarCursos();
    console.log("Lista de estudiantes ", this.estudiantes);
    console.log("Lista de estudiantes ", this.tutores);
  }
  private cargarCursos(): void {
    this.cursoService.obtenerCursos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.cursos = Array.isArray(data) ? data : (data as any).cursos; // Asigna primero
          console.log('Respuesta del servicio:', this.cursos);
          console.log('Cantidad de cursos:', this.cursos.length);
          console.log('Lista de cursos:', this.cursos);
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
  seleccionarCurso(curso: Curso): void {
    this.cursoSeleccionado = curso;
    this.isCursoDropdownOpen = false;
    console.log('Curso seleccionado:', curso);
  }

  selectArea1(areaNombre: string) {
    const areaSeleccionada = this.areasDisponibles.find(area => area.nombre_area === areaNombre);
    if (areaSeleccionada) {
      this.id_area1 = areaSeleccionada.id_area;
      this.seleccionArea1 = areaNombre;
      this.categorias = areaSeleccionada.nivel_categorias ?? [];
      this.isAreaDropdownOpen = false;
      console.log("ID Área seleccionada:", this.id_area1);
      console.log("Categorias disponibles:", this.categorias);
    }
  }
  selectArea2(area2: string) {
    const areaSeleccionada = this.areasDisponibles.find(area => area.nombre_area === area2);

    if (areaSeleccionada) {
      this.id_area2 = areaSeleccionada.id_area;
      this.seleccionArea2 = area2;
      this.categorias2 = areaSeleccionada.nivel_categorias ?? [];
      this.isAreaDropdownOpen2 = false;
      console.log("ID Área seleccionada:", this.id_area2);
      console.log("Categorias", this.categorias2)
    }
  }

  inscribirEstudiante(): void {
    this.inscribir.emit();
  }

  toggleDuplicado() {
    this.isDuplicated = !this.isDuplicated;
    this.seleccionArea2 = 'Seleccionar área'
    this.seleccionCategoria2 = 'Seleccionar categoria'
  }

  toggleCategoriaDropdown() {
    this.isCategoriaDropdownOpen = !this.isCategoriaDropdownOpen;
    if (this.isCategoriaDropdownOpen) {
      this.isAreaDropdownOpen = false;
      this.isAreaDropdownOpen2 = false;
      this.isCursoDropdownOpen = false;
    }
  }

  selectCategoria(categoria1: string) {
    const categoriaSeleccionada = this.categorias.find(cat => cat.nombre_nivel === categoria1);
    if (categoriaSeleccionada) {
      this.id_categoria1 = categoriaSeleccionada.id_nivel;
      this.seleccionCategoria = categoriaSeleccionada.nombre_nivel;
      this.isCategoriaDropdownOpen = false;
      console.log("ID Nivel Categoría seleccionado:", this.seleccionCategoria);
      console.log("ID Nivel Categoría seleccionado:", this.seleccionCategoria);
    }
  }

  toggleCategoriaDropdown2() {
    this.isCategoriaDropdownOpen2 = !this.isCategoriaDropdownOpen2;
    if (this.isCategoriaDropdownOpen2) {
      this.isAreaDropdownOpen = false;
      this.isAreaDropdownOpen2 = false;
      this.isCursoDropdownOpen = false;
    }
  }

  selectCategoria2(categoria2: string) {
    const categoriaSeleccionada = this.categorias2.find(cat => cat.nombre_nivel === categoria2);
    if (categoriaSeleccionada) {
      this.id_categoria2 = categoriaSeleccionada.id_nivel;
      this.seleccionCategoria2 = categoriaSeleccionada.nombre_nivel;
      this.isCategoriaDropdownOpen2 = false;
      console.log("ID Nivel Categoría seleccionado:", this.id_categoria2);
      console.log("ID Nivel Categoría seleccionado:", this.seleccionCategoria);
    }
  }

  //inscripcion
  inscripcionEstudiante() {
    if (this.seleccionArea1 && this.seleccionCategoria) {
      const nuevaInscripcion1 = {
        area_id: this.id_area1,
        nivelesCategoria: [this.id_categoria1] 
      };

      this.areasInscripcion.push(nuevaInscripcion1);
    }

    if (this.seleccionArea2 !=="Seleccionar área" && this.seleccionCategoria2!== "Selecciona una categoría") {
      const nuevaInscripcion2 = {
        area_id: this.id_area2, 
        nivelesCategoria: [this.id_categoria2] 
      };

      this.areasInscripcion.push(nuevaInscripcion2);
    }

    this.clickCount++;

    console.log('Lista de áreas inscritas:', this.areasInscripcion);

    if (this.clickCount >= 3) {
      this.irABoletaList();
    } else if (!this.seleccionArea1 || !this.seleccionCategoria) {
      alert('Por favor, selecciona al menos un área y una categoría antes de inscribirte.');
    }
  }
  irABoletaList() {
    localStorage.setItem('areasInscripcion', JSON.stringify(this.areasInscripcion));
    localStorage.setItem('olimpistas', JSON.stringify(this.estInscripcion));
    localStorage.setItem('tutores', JSON.stringify(this.tutores));

    console.log('Datos guardados en localStorage:', {
      areasInscripcion: JSON.parse(localStorage.getItem('areasInscripcion') || '[]'),
      olimpistas: JSON.parse(localStorage.getItem('olimpistas') || '[]'),
      tutores: JSON.parse(localStorage.getItem('tutores') || '[]')
    });
    this.router.navigate(['/boletaPago']);
  }

}