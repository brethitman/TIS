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

@Component({
  selector: 'app-vista-areas-categorias',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    CrearAreaComponent,
    FormsModule
  ],
  templateUrl: './vista-areas-categorias.component.html',
})
export class VistaAreasCategoriasComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private olimpiadaByAreaService = inject(OlimpiadaByAreaService);
  private nivelService = inject(NivelService);

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
  public formErrors: string[] = [];
  public successMessage: string | null = null;

  // Selector de grados
  public grados: string[] = [
    '1ro Primaria', '2do Primaria', '3ro Primaria', '4to Primaria', '5to Primaria', '6to Primaria',
    '1ro Secundaria', '2do Secundaria', '3ro Secundaria', '4to Secundaria', '5to Secundaria', '6to Secundaria'
  ];
  public mostrarSelectorGrados: boolean = false;
  public gradosSeleccionadosNivel: boolean[] = [];
  public advertenciaMultiplesGrados: boolean = false;

  // Modal
  public mostrarModal: boolean = false;
  public modalTipo: 'exito' | 'error' = 'exito';
  public modalMensaje: string = '';

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
    this.cargarAreas();
    this.cargarOlimpiada();
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
          this.formErrors = ['Error al cargar áreas. Por favor, intente de nuevo.'];
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
  }

  seleccionarArea(area: IDOlimpiadabyArea): void {
    this.areaSeleccionada = area;
    this.areaActivaId = null;
    this.resetForm();
  }

  toggleFormulario(areaId: number): void {
    this.areaActivaId = this.areaActivaId === areaId ? null : areaId;
    this.resetForm();
  }

  private resetForm(): void {
    this.currentNewLevel = this.initializeNewLevel();
    this.gradosSeleccionadosNivel = this.grados.map(() => false);
    this.advertenciaMultiplesGrados = false;
    this.mostrarSelectorGrados = false;
    this.formErrors = [];
    this.successMessage = null;
  }

  // Métodos del selector de grados
  toggleSelectorGrados(): void {
    this.mostrarSelectorGrados = !this.mostrarSelectorGrados;
  }

  onNivelCheckboxChange(index: number): void {
    this.gradosSeleccionadosNivel[index] = !this.gradosSeleccionadosNivel[index];
    
    // Obtener todos los índices seleccionados
    const indicesSeleccionados = this.gradosSeleccionadosNivel
      .map((selected, i) => selected ? i : -1)
      .filter(i => i !== -1);

    if (indicesSeleccionados.length >= 2) {
      // Ordenar los índices
      indicesSeleccionados.sort((a, b) => a - b);
      
      // Obtener el primer y último índice seleccionado
      const primerIndice = indicesSeleccionados[0];
      const ultimoIndice = indicesSeleccionados[indicesSeleccionados.length - 1];
      
      // Seleccionar todos los grados entre el primer y último índice
      for (let i = primerIndice; i <= ultimoIndice; i++) {
        this.gradosSeleccionadosNivel[i] = true;
      }
    }

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

  public validarFormulario(): boolean {
    this.formErrors = [];
    const nivel = this.currentNewLevel;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (!nivel.nombre_nivel.trim()) {
      this.formErrors.push('Por favor, ingrese un nombre para el nivel.');
    }

    if (!nivel.gradoIniCat || !nivel.gradoFinCat) {
      this.formErrors.push('Debe seleccionar al menos un grado para el nivel.');
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
      } else {
        fechaExamen.setHours(0, 0, 0, 0);

        // Primero validar que no sea una fecha pasada
        if (fechaExamen < hoy) {
          this.formErrors.push('La fecha del examen debe ser en el futuro.');
        } else {
          // Luego validar que esté dentro del rango de la olimpiada
          if (this.olimpiadaSeleccionada) {
            const fechaInicioOlimpiada = new Date(this.olimpiadaSeleccionada.fecha_inicio);
            const fechaFinOlimpiada = new Date(this.olimpiadaSeleccionada.fecha_final);
            
            // Ajustar las horas para comparar solo las fechas
            fechaInicioOlimpiada.setHours(0, 0, 0, 0);
            fechaFinOlimpiada.setHours(23, 59, 59, 999);

            if (fechaExamen < fechaInicioOlimpiada) {
              this.formErrors.push(`La fecha del examen debe ser posterior o igual al inicio de la olimpiada (${this.formatearFecha(this.olimpiadaSeleccionada.fecha_inicio)}).`);
            } else if (fechaExamen > fechaFinOlimpiada) {
              this.formErrors.push(`La fecha del examen debe ser anterior o igual al fin de la olimpiada (${this.formatearFecha(this.olimpiadaSeleccionada.fecha_final)}).`);
            }
          }
        }
      }
    }

    if (nivel.costo === null || nivel.costo === undefined || isNaN(nivel.costo) || nivel.costo < 0) {
      this.formErrors.push('El costo debe ser un número válido y no negativo.');
    }

    return this.formErrors.length === 0;
  }

  public getFechaMinima(): string {
    const hoy = new Date();
    const fechaInicioOlimpiada = this.olimpiadaSeleccionada ? new Date(this.olimpiadaSeleccionada.fecha_inicio) : null;
    
    // Si la fecha de inicio de la olimpiada es posterior a hoy, usar esa fecha
    if (fechaInicioOlimpiada && fechaInicioOlimpiada > hoy) {
      return this.olimpiadaSeleccionada!.fecha_inicio;
    }
    
    // Si no, usar la fecha de hoy
    return hoy.toISOString().split('T')[0];
  }

  public formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  public enviarNiveles(): void {
    if (!this.areaActivaId) {
      this.formErrors = ['No se ha seleccionado un área válida para agregar niveles.'];
      return;
    }

    if (!this.validarFormulario()) {
      return;
    }

    this.enviando = true;
    this.formErrors = [];
    this.successMessage = null;

    const nivel: CreateNivelRequest = {
      ...this.currentNewLevel,
      habilitacion: this.currentNewLevel.habilitacion ? 1 : 0
    };

    this.nivelService.crearNivelPorArea(this.areaActivaId, nivel).subscribe({
      next: (response: NivelResponse) => {
        this.enviando = false;
        this.mostrarModalMensaje('exito', 'Nivel creado exitosamente');
        this.resetForm();
        this.cargarAreas();
      },
      error: (err: Error) => {
        this.enviando = false;
        console.error('Error al crear nivel:', err);
        if (err instanceof Error) {
          this.formErrors = [`Error al crear nivel: ${err.message}`];
        } else {
          this.formErrors = ['Error desconocido al crear el nivel.'];
        }
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
    if (habilitacion === null || habilitacion === undefined) {
      return true;
    }
    return habilitacion === false || habilitacion === 0;
  }

  getEstadoTexto(habilitacion: boolean | number | null | undefined): string {
    return this.isHabilitado(habilitacion) ? 'Habilitado' : 'Deshabilitado';
  }

  toggleHabilitacion(nivel: NivelCategoria): void {
    if (!nivel.id_nivel) {
      this.mostrarModalMensaje('error', 'ID de nivel no válido');
      return;
    }

    const nuevoEstado = !nivel.habilitacion;

    this.nivelService.updateHabilitacion(nivel.id_nivel, nuevoEstado).subscribe({
      next: (response: any) => {
        nivel.habilitacion = nuevoEstado;
        this.mostrarModalExito(`Nivel ${nuevoEstado ? 'habilitado' : 'deshabilitado'} exitosamente`);
      },
      error: (error: any) => {
        console.error('Error al actualizar estado del nivel:', error);
        this.mostrarModalMensaje('error', 'Error al actualizar el estado del nivel');
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