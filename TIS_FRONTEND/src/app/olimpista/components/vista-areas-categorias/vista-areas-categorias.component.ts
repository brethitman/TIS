import { Component, inject, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IDOlimpiadabyArea, NivelCategoria } from '../../interfaces/olimpiadaAreaCategoria.interface';
import { OlimpiadaByAreaService } from '../../service/OlimpiadaByArea.service';
import { CrearAreaComponent } from '../crear-area/crear-area.component';
import { NivelService } from '../../service/post_Categoria.service';
import {
  CreateNivelRequest,
  CreateNivelesBulkRequest,
  CreateNivelesBulkResponse,
  NivelResponse,
  AreaResponse,
  OlimpiadaResponse,
} from '../../interfaces/post_categoria.interface';
import { CursoAreaService } from '../../service/cursoAreaNivel.service';
import { CursoWithAreas } from '../../interfaces/cursoAreaNiveles.interface';

@Component({
  selector: 'app-vista-areas-categorias',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    CrearAreaComponent,
    FormsModule
  ],
  templateUrl: './vista-areas-categorias.component.html'
})
export class VistaAreasCategoriasComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private olimpiadaByAreaService = inject(OlimpiadaByAreaService);
  private nivelService = inject(NivelService);
  // private cursoAreaService = inject(CursoAreaService);

  // Propiedades principales
  public olimpiadaSeleccionada: OlimpiadaResponse | null = null;
  public areaSeleccionada: IDOlimpiadabyArea | null = null;
  public areas: IDOlimpiadabyArea[] = [];
  public idOlimpiada: number | null = null;

  // Estados de UI
  public cargando: boolean = true;
  public errorCarga: string | null = null;
  public mostrarCrearArea: boolean = false;
  public areaActivaId: number | null = null;
  // Variables para el carrusel
  currentIndex = 0;
  itemsPerPage = 4;

  // Formulario de nivel
  public currentNewLevel: CreateNivelRequest = this.initializeNewLevel();
  public enviando: boolean = false;
  public errores: string[] = [];
  public formErrors: string[] = [];
  public successMessage: string | null = null;

  // Propiedades para el selector de grados
  public grados: string[] = [
    '1ro Primaria', '2do Primaria', '3ro Primaria', '4to Primaria', '5to Primaria', '6to Primaria',
    '1ro Secundaria', '2do Secundaria', '3ro Secundaria', '4to Secundaria', '5to Secundaria', '6to Secundaria'
  ];
  public gradosDisponibles: string[] = [];
  public mostrarSelectorGrados: boolean = false;
  public gradosSeleccionadosNivel: boolean[] = [];
  public advertenciaMultiplesGrados: boolean = false;

  // Modal
  public mostrarModal: boolean = false;
  public modalTipo: 'exito' | 'error' = 'exito';
  public modalMensaje: string = '';

  constructor(
    private cursoAreaService: CursoAreaService
  ) { }

  // Métodos para el carrusel
  getAreaGroups() {
    const groups = [];
    for (let i = 0; i < this.areas.length; i += this.itemsPerPage) {
      groups.push(this.areas.slice(i, i + this.itemsPerPage));
    }
    return groups;
  }

  getTotalPages() {
    return Math.ceil(this.areas.length / this.itemsPerPage);
  }

  getPaginationDots() {
    return Array(this.getTotalPages()).fill(0);
  }

  prevArea() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextArea() {
    if (this.currentIndex < this.getTotalPages() - 1) {
      this.currentIndex++;
    }
  }

  goToArea(index: number) {
    this.currentIndex = index;
  }

  ngOnInit(): void {
    this.obtenerIdOlimpiada();
    this.gradosSeleccionadosNivel = this.grados.map(() => false);
    if (this.idOlimpiada) {
      this.cargarAreas();
      this.cargarCursosConAreas();
    }
  }

  private initializeNewLevel(): CreateNivelRequest {
    return {
      nombre_nivel: '',
      gradoIniCat: '',
      gradoFinCat: '',
      descripcion: '',
      fecha_examen: '',
      costo: 0,
      habilitacion: true
    };
  }

  private obtenerIdOlimpiada(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.idOlimpiada = idParam ? Number(idParam) : null;

    if (!this.idOlimpiada || isNaN(this.idOlimpiada)) {
      this.errorCarga = 'ID de olimpiada inválido';
      this.cargando = false;
      return;
    }
  }

  private cargarOlimpiada(): void {
    if (!this.idOlimpiada) return;

    this.olimpiadaByAreaService.getOlimpiadaById(this.idOlimpiada)
      .subscribe({
        next: (data: OlimpiadaResponse) => {
          this.olimpiadaSeleccionada = data;
        },
        error: (err: any) => {
          console.error('Error al cargar datos de la olimpiada:', err);
        }
      });
  }

  public cargarAreas(): void {
    this.cargando = true;
    this.olimpiadaByAreaService.getAreasByOlimpiadaId(this.idOlimpiada!)
      .subscribe({
        next: (data: IDOlimpiadabyArea[]) => {
          this.areas = data;
          this.cargando = false;
          this.errorCarga = null;

          if (this.areaSeleccionada) {
            const updatedArea = this.areas.find(a => a.id_area === this.areaSeleccionada?.id_area);
            if (updatedArea) {
              this.areaSeleccionada = updatedArea;
            }
          }
        },
        error: (err: any) => {
          console.error('Error al cargar áreas:', err);
          this.errorCarga = 'Error al cargar áreas';
          this.cargando = false;
          this.errores = ['Error al cargar áreas. Por favor, intente de nuevo.'];
        }
      });
  }

  private cargarCursosConAreas(): void {
    if (!this.idOlimpiada) return;

    this.cursoAreaService.getCursosConAreasByOlimpiada(this.idOlimpiada).subscribe({
      next: (cursosConAreas: CursoWithAreas[]) => {
        console.log('Cursos con áreas cargados:', cursosConAreas);
        // Mapear los cursos a cada área
        this.areas = this.areas.map(area => {
          const cursosArea = cursosConAreas
            .filter(curso => curso.areas.some(a => a.id_area === area.id_area))
            .map(curso => curso.nameCurso);
          return { ...area, cursos: cursosArea };
        });
      },
      error: (error) => {
        console.error('Error al cargar cursos con áreas:', error);
        this.errorCarga = 'Error al cargar los cursos asociados a las áreas';
      }
    });
  }

  // Métodos de UI
  toggleCrearArea(): void {
    this.mostrarCrearArea = !this.mostrarCrearArea;
  }

  onAreaCreada(): void {
    this.mostrarCrearArea = false;
    this.cargarAreas();
    this.mostrarModalMensaje('exito', 'Área creada exitosamente');
  }

  seleccionarArea(area: IDOlimpiadabyArea): void {
    this.areaSeleccionada = area;
    this.areaActivaId = null;
    this.resetForm();
  }

  toggleFormulario(areaId: number): void {
    this.areaActivaId = this.areaActivaId === areaId ? null : areaId;
    this.resetForm();
    if (this.areaActivaId) {
      const area = this.areas.find(a => a.id_area === areaId);
      if (area) {
        this.areaSeleccionada = area;
      }
    }
  }

  private resetForm(): void {
    this.currentNewLevel = this.initializeNewLevel();
    this.gradosSeleccionadosNivel = this.grados.map(() => false);
    this.advertenciaMultiplesGrados = false;
    this.mostrarSelectorGrados = false;
    this.formErrors = [];
    this.errores = [];
    this.successMessage = null;
  }

  // Métodos del selector de grados
  toggleSelectorGrados(): void {
    this.mostrarSelectorGrados = !this.mostrarSelectorGrados;
  }

  onNivelCheckboxChange(index: number): void {
    const grado = this.grados[index];
    if (!this.isGradoEnRango(grado)) {
      this.mostrarModalMensaje('error', 'El grado seleccionado está fuera del rango permitido para esta área');
      return;
    }

    this.gradosSeleccionadosNivel[index] = !this.gradosSeleccionadosNivel[index];
    this.actualizarGradosNivel();

    const gradosSeleccionados = this.gradosSeleccionadosNivel.filter(selected => selected).length;
    this.advertenciaMultiplesGrados = gradosSeleccionados > 1;
  }

  actualizarGradosNivel(): void {
    const primerIndice = this.gradosSeleccionadosNivel.findIndex(selected => selected);
    const ultimoIndice = this.gradosSeleccionadosNivel.lastIndexOf(true);

    if (primerIndice !== -1 && ultimoIndice !== -1) {
      this.currentNewLevel.gradoIniCat = this.grados[primerIndice];
      this.currentNewLevel.gradoFinCat = this.grados[ultimoIndice];
    } else {
      this.currentNewLevel.gradoIniCat = '';
      this.currentNewLevel.gradoFinCat = '';
    }
  }

  // Método para obtener los grados disponibles según el rango del área
  private actualizarGradosDisponibles(): void {
    if (!this.areaSeleccionada) {
      this.gradosDisponibles = [];
      return;
    }

    const areaIniIndex = this.grados.indexOf(this.areaSeleccionada.gradoIniAr || '');
    const areaFinIndex = this.grados.indexOf(this.areaSeleccionada.gradoFinAr || '');

    if (areaIniIndex !== -1 && areaFinIndex !== -1) {
      this.gradosDisponibles = this.grados.slice(areaIniIndex, areaFinIndex + 1);
    } else {
      this.gradosDisponibles = [...this.grados];
    }

    // Reiniciar las selecciones
    this.gradosSeleccionadosNivel = this.gradosDisponibles.map(() => false);
  }

  // Método para verificar si un grado está dentro del rango del área
  public isGradoEnRango(grado: string): boolean {
    if (!this.areaSeleccionada) {
      console.log('No hay área seleccionada');
      return false;
    }

    // Verificar si el área tiene cursos asociados
    const cursosArea = (this.areaSeleccionada as any).cursos;
    if (!cursosArea || cursosArea.length === 0) {
      console.log('El área no tiene cursos asociados');
      return false;
    }

    // Normalizar los nombres de los cursos para que coincidan con el formato de grados
    const cursosNormalizados = cursosArea.map((curso: string) => {
      // Convertir "1ro primaria" a "1ro Primaria"
      const partes = curso.split(' ');
      if (partes.length === 2) {
        return partes[0] + ' ' + partes[1].charAt(0).toUpperCase() + partes[1].slice(1);
      }
      return curso;
    });

    // Obtener el índice del grado actual
    const gradoIndex = this.grados.indexOf(grado);
    
    // Obtener los índices de los cursos del área
    const indicesCursos = cursosNormalizados.map((curso: string) => this.grados.indexOf(curso));
    const minIndex = Math.min(...indicesCursos);
    const maxIndex = Math.max(...indicesCursos);

    // Verificar si el grado está dentro del rango
    const enRango = gradoIndex >= minIndex && gradoIndex <= maxIndex;
    
    console.log('Verificando rango:', {
      grado,
      gradoIndex,
      cursosArea,
      cursosNormalizados,
      indicesCursos,
      minIndex,
      maxIndex,
      enRango
    });
    
    return enRango;
  }

  // Validaciones
  private verificarRangoArea(): boolean {
    if (!this.areaSeleccionada) return false;

    const areaIniIndex = this.grados.indexOf(this.areaSeleccionada.gradoIniAr || '');
    const areaFinIndex = this.grados.indexOf(this.areaSeleccionada.gradoFinAr || '');
    const nivelIniIndex = this.grados.indexOf(this.currentNewLevel.gradoIniCat);
    const nivelFinIndex = this.grados.indexOf(this.currentNewLevel.gradoFinCat);

    if (areaIniIndex !== -1 && areaFinIndex !== -1 &&
      nivelIniIndex !== -1 && nivelFinIndex !== -1) {
      if (nivelIniIndex < areaIniIndex || nivelFinIndex > areaFinIndex) {
        this.formErrors.push('Los grados del nivel deben estar dentro del rango del área.');
        return false;
      }
    }

    return true;
  }

  // Métodos para las fechas
  public getFechaMinima(): string {
    if (!this.olimpiadaSeleccionada?.fecha_inicio) {
      return new Date().toISOString().split('T')[0]; // Fecha actual como fallback
    }
    return this.olimpiadaSeleccionada.fecha_inicio.split('T')[0];
  }

  public getFechaMaxima(): string {
    if (!this.olimpiadaSeleccionada?.fecha_final) {
      return ''; // Sin fecha máxima como fallback
    }
    return this.olimpiadaSeleccionada.fecha_final.split('T')[0];
  }

  private validarFormulario(): boolean {
    this.formErrors = [];
    const nivel = this.currentNewLevel;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (!nivel.nombre_nivel.trim()) {
      this.formErrors.push('El nombre del nivel es obligatorio.');
    }

    if (!nivel.gradoIniCat || !nivel.gradoFinCat) {
      this.formErrors.push('Debe seleccionar al menos un grado para el nivel.');
    } else if (!this.isGradoEnRango(nivel.gradoIniCat) || !this.isGradoEnRango(nivel.gradoFinCat)) {
      this.formErrors.push('Los grados seleccionados deben estar dentro del rango del área.');
    }

    if (!this.verificarRangoArea()) {
      // El mensaje ya se agrega en verificarRangoArea()
    }

    if (!nivel.fecha_examen) {
      this.formErrors.push('La fecha del examen es obligatoria.');
    } else {
      const fechaExamen = new Date(nivel.fecha_examen);
      if (isNaN(fechaExamen.getTime())) {
        this.formErrors.push('Formato de fecha de examen inválido.');
      } else if (fechaExamen < hoy) {
        this.formErrors.push('La fecha del examen debe ser en el futuro.');
      }

      // Validar que la fecha del examen esté dentro del rango de la olimpiada
      if (this.olimpiadaSeleccionada) {
        const fechaInicioOlimpiada = new Date(this.olimpiadaSeleccionada.fecha_inicio);
        const fechaFinOlimpiada = new Date(this.olimpiadaSeleccionada.fecha_final);
        
        // Normalizar las fechas para comparar solo la fecha (sin hora)
        fechaInicioOlimpiada.setHours(0, 0, 0, 0);
        fechaFinOlimpiada.setHours(0, 0, 0, 0);
        fechaExamen.setHours(0, 0, 0, 0);

        if (fechaExamen < fechaInicioOlimpiada || fechaExamen > fechaFinOlimpiada) {
          this.formErrors.push(`La fecha del examen debe estar dentro del rango de la olimpiada (${fechaInicioOlimpiada.toLocaleDateString()} - ${fechaFinOlimpiada.toLocaleDateString()})`);
          return false; // Retornar false inmediatamente si la fecha está fuera de rango
        }
      }
    }

    if (nivel.costo === null || nivel.costo === undefined || isNaN(nivel.costo) || nivel.costo < 0) {
      this.formErrors.push('El costo debe ser un número válido y no negativo.');
    }

    this.errores = [...this.formErrors];
    return this.formErrors.length === 0;
  }

  // Envío de datos
  enviarNiveles(): void {
    if (!this.validarFormulario()) {
      return;
    }

    if (!this.areaActivaId) {
      this.errores = ['No se ha seleccionado un área válida para agregar niveles.'];
      return;
    }

    this.enviando = true;
    this.errores = [];
    this.successMessage = null;

    const bulkRequest: CreateNivelesBulkRequest = {
      niveles: [this.currentNewLevel]
    };

    this.nivelService.crearNivelesEnArea(this.areaActivaId, bulkRequest)
      .subscribe({
        next: (response: CreateNivelesBulkResponse) => {
          this.mostrarModalExito('Nivel creado exitosamente');
          this.resetForm();
          this.areaActivaId = null;
          this.cargarAreas();
        },
        error: (err: any) => {
          console.error('Error al crear nivel:', err);
          if (err.error && err.error.message) {
            this.errores = [`Error al crear nivel: ${err.error.message}`];
          } else if (err.message) {
            this.errores = [`Error al crear nivel: ${err.message}`];
          } else {
            this.errores = ['Error desconocido al crear el nivel.'];
          }
        },
        complete: () => {
          this.enviando = false;
        }
      });
  }

  // Métodos de utilidad
  isHabilitado(habilitacion: boolean | number | null | undefined): boolean {
    if (habilitacion === null || habilitacion === undefined) {
      return false;
    }
    return habilitacion === true || habilitacion === 1;
  }

  isDeshabilitado(habilitacion: boolean | number | null | undefined): boolean {
    return !this.isHabilitado(habilitacion);
  }

  getEstadoTexto(habilitacion: boolean | number | null | undefined): string {
    return this.isHabilitado(habilitacion) ? 'Habilitado' : 'Deshabilitado';
  }

  toggleHabilitacion(nivel: NivelCategoria): void {
    if (!nivel.id_nivel) {
      this.mostrarModalMensaje('error', 'ID de nivel no válido');
      return;
    }

    const nuevoEstado = !this.isHabilitado(nivel.habilitacion);

    this.nivelService.updateHabilitacion(nivel.id_nivel, nuevoEstado).subscribe({
      next: (response: any) => {
        // Actualizar el estado local
        nivel.habilitacion = nuevoEstado;
        
        // Mostrar mensaje de éxito
        this.mostrarModalMensaje('exito', `Nivel ${nuevoEstado ? 'habilitado' : 'deshabilitado'} exitosamente`);
        
        // Recargar las áreas para asegurar que tenemos el estado más reciente
        this.cargarAreas();
      },
      error: (error: any) => {
        console.error('Error al actualizar estado del nivel:', error);
        this.mostrarModalMensaje('error', 'Error al actualizar el estado del nivel. Por favor, intente nuevamente.');
      }
    });
  }

  // Métodos del modal
  mostrarModalMensaje(tipo: 'exito' | 'error', mensaje: string): void {
    this.modalTipo = tipo;
    this.modalMensaje = mensaje;
    this.mostrarModal = true;
  }

  private mostrarModalExito(mensaje: string): void {
    this.mostrarModalMensaje('exito', mensaje);
  }

  ocultarModal(): void {
    this.mostrarModal = false;
  }
}