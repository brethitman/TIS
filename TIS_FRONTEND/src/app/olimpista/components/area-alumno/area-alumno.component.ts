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
  inscripciones: any[] = [];
  estudiantesDisponibles: any[] = [];


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
  private destroy$ = new Subject<void>();

  errors = {
    estudiante: '',
    curso: '',
    area1: '',
    categoria1: '',
    area2: '',
    categoria2: ''
  };
  hasValidationRun = false;

  constructor(
    private route: ActivatedRoute,
    private olimpiadaByAreaService: OlimpiadaByAreaService,
    private cursoService: CursoService

  ) { }

  ngOnInit(): void {
    this.cargarOlimpiadaId();
    this.cargarCursos();
    this.estudiantesDisponibles = [...this.estudiantes];
    // Hacer una copia profunda para evitar problemas de referencia
  this.estudiantesDisponibles = JSON.parse(JSON.stringify(this.estudiantes));
  this.mostrarFinalizar = this.estudiantesDisponibles.length === 0;
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
    this.estudianteActual = estudiante;
    this.isStudentDropdownOpen = false; // Cerrar el dropdown después de seleccionar
    if (this.hasValidationRun) {
      this.validateAllFields();
    }
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
  if (this.hasValidationRun) {
    this.validateAllFields();
  }
  console.log('Curso seleccionado:', curso);
}
  
  selectArea1(areaNombre: string) {
    const areaSeleccionada = this.areasDisponibles.find(area => area.nombre_area === areaNombre);

    if (areaSeleccionada) {
      this.seleccionArea1 = areaNombre;
      this.categorias = areaSeleccionada.nivel_categorias ?? [];
      this.isAreaDropdownOpen = false;
      if (this.hasValidationRun) {
      this.validateAllFields();
      }
      console.log("Categorias", this.categorias)
    }
  }
  selectArea2(area2: string) {
    const areaSeleccionada = this.areasDisponibles.find(area => area.nombre_area === area2);

    if (areaSeleccionada) {
      this.seleccionArea2 = area2;
      this.categorias2 = areaSeleccionada.nivel_categorias ?? [];
      this.isAreaDropdownOpen2 = false;
      if (this.hasValidationRun) {
      this.validateAllFields();
      }
      console.log("Categorias", this.categorias2)
    }
  }

  get areasFiltradasParaArea2() {
  return this.areasDisponibles.filter(area => area.nombre_area !== this.seleccionArea1);
}


  inscribirEstudiante(): void {
      console.log('Validando inscripción con:');
      console.log('estudianteActual:', this.estudianteActual);
      console.log('cursoSeleccionado:', this.cursoSeleccionado);
      console.log('seleccionArea1:', this.seleccionArea1);
      console.log('seleccionCategoria:', this.seleccionCategoria);
      console.log('isDuplicated:', this.isDuplicated);
      console.log('seleccionArea2:', this.seleccionArea2);
      console.log('seleccionCategoria2:', this.seleccionCategoria2);

    // Marcar que se ha intentado validar
    this.hasValidationRun = true;
    
    // Validar todos los campos
    this.validateAllFields();
    
    // Verificar si hay errores
    const hasErrors = Object.values(this.errors).some(error => error !== '');
    
    if (hasErrors) {
      this.errorMessage = 'Por favor complete todos los campos requeridos';
      return;
    }

    // Crear objeto de inscripción
    const nuevaInscripcion = {
      estudiante: this.estudianteActual,
      curso: this.cursoSeleccionado,
      area1: this.seleccionArea1,
      categoria1: this.seleccionCategoria,
      area2: this.isDuplicated ? this.seleccionArea2 : null,
      categoria2: this.isDuplicated ? this.seleccionCategoria2 : null,
      fechaInscripcion: new Date()
    };

    // Verificar si el estudiante ya está inscrito
    const yaInscrito = this.inscripciones.some(
    insc => insc.estudiante.ci === this.estudianteActual.ci
    );

    if (yaInscrito) {
      this.errorMessage = 'Este estudiante ya está inscrito';
      return;
    }

    // Agregar a las inscripciones
    this.inscripciones.push(nuevaInscripcion);

    // Eliminar estudiante del array original de estudiantes y de los disponibles
    this.estudiantes = this.estudiantes.filter(
      e => e.ci !== this.estudianteActual.ci
    );
    this.estudiantesDisponibles = this.estudiantesDisponibles.filter(
      e => e.ci !== this.estudianteActual.ci
    );


  // Mostrar mensaje de éxito
  this.successMessage = `Estudiante ${this.estudianteActual.nombre} ${this.estudianteActual.apellido} inscrito correctamente`;
  this.errorMessage = null;

  // Resetear el formulario
  this.resetearFormulario();
}

resetearFormulario(): void {
  // Resetear campos del formulario
  this.estudianteActual = null;
  this.cursoSeleccionado = null;
  this.seleccionArea1 = 'Seleccionar área';
  this.seleccionCategoria = 'Selecciona una categoría';
  this.seleccionArea2 = 'Seleccionar área';
  this.seleccionCategoria2 = 'Selecciona una categoría';
  this.isDuplicated = false;
  for (const key of Object.keys(this.errors)) {
      this.errors[key as keyof typeof this.errors] = '';
    }

  // Cerrar todos los dropdowns
  this.isStudentDropdownOpen = false;
  this.isCursoDropdownOpen = false;
  this.isAreaDropdownOpen = false;
  this.isAreaDropdownOpen2 = false;
  this.isCategoriaDropdownOpen = false;
  this.isCategoriaDropdownOpen2 = false;

  // Actualizar estado del botón Finalizar
  this.mostrarFinalizar = this.estudiantesDisponibles.length === 0;

  // Limpiar mensajes después de 3 segundos
  setTimeout(() => {
    this.successMessage = null;
    this.errorMessage = null;
  }, 3000);
}

  toggleDuplicado() {
    this.isDuplicated = !this.isDuplicated;
    this.seleccionArea2 = 'Seleccionar área'
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
    this.seleccionCategoria = categoria1;
    this.isCategoriaDropdownOpen = false;
    if (this.hasValidationRun) {
      this.validateAllFields();
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
    this.seleccionCategoria2 = categoria2;
    this.isCategoriaDropdownOpen2 = false;
    if (this.hasValidationRun) {
      this.validateAllFields();
    }
  }


  mostrarFinalizar = false;

  verificarFinalizacion() {
    if (this.estudiantes.length === 0) {
      this.mostrarFinalizar = true;
    }
  }

  validateAllFields(): void {
    // Limpiar errores previos
    for (const key of Object.keys(this.errors)) {
      this.errors[key as keyof typeof this.errors] = '';
    }

    // Validar cada campo solo si se ha intentado validar antes
    if (this.hasValidationRun) {
      if (!this.estudianteActual) {
        this.errors.estudiante = 'Debe seleccionar un estudiante';
      }
      if (!this.cursoSeleccionado) {
        this.errors.curso = 'Debe seleccionar un curso';
      }
      if (this.seleccionArea1 === 'Seleccionar área') {
        this.errors.area1 = 'Debe seleccionar al menos un área';
      }
      if (this.seleccionCategoria === 'Selecciona una categoría') {
        this.errors.categoria1 = 'Debe seleccionar una categoría para el área principal';
      }
      if (this.isDuplicated) {
        if (this.seleccionArea2 === 'Seleccionar área') {
          this.errors.area2 = 'Debe seleccionar un área adicional';
        }
        if (this.seleccionCategoria2 === 'Selecciona una categoría') {
          this.errors.categoria2 = 'Debe seleccionar una categoría para el área adicional';
        }
      }
    }
  }

}