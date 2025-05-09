import { Component, inject, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { IDOlimpiadabyArea, NivelCategoria } from '../../interfaces/olimpiadaAreaCategoria.interface';
import { OlimpiadaByAreaService } from '../../service/OlimpiadaByArea.service';
import { CrearAreaComponent } from '../crear-area/crear-area.component';
import { NivelService } from '../../service/post_Categoria.service';
import { CreateNivelRequest, CreateNivelesBulkRequest,
  CreateNivelesBulkResponse, NivelResponse, AreaResponse  } from '../../interfaces/post_categoria.interface';

@Component({
  selector: 'app-vista-areas-categorias',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    //CurrencyPipe,
    CrearAreaComponent,
    FormsModule
  ],
  templateUrl: './vista-areas-categorias.component.html',
})
export class VistaAreasCategoriasComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private olimpiadaByAreaService = inject(OlimpiadaByAreaService);
  private nivelService = inject(NivelService);

  @Input() olimpiadaSeleccionada: IDOlimpiadabyArea | null = null;
  @Input() idOlimpiada: number | null = null;

  areas: IDOlimpiadabyArea[] = [];
  areaSeleccionada: IDOlimpiadabyArea | null = null;
  areaActiva: number | null = null;

  public cargando: boolean = true;
  public errorCarga: string | null = null;

  // Propiedades para la gestión de niveles por área
  public areaActivaId: number | null = null; // ID del área cuyo formulario de niveles está activo
  public currentNewLevel: CreateNivelRequest = this.initializeNewLevel(); // Datos del nivel actual en el formulario

  public enviando: boolean = false;
  public errores: string[] = [];
  public formErrors: string[] = [];
  public successMessage: string | null = null;

  // Lista de grados disponibles
  public grados: string[] = [
    '1° Primaria', '2° Primaria', '3° Primaria', '4° Primaria', '5° Primaria', '6° Primaria',
    '1° Secundaria', '2° Secundaria', '3° Secundaria', '4° Secundaria', '5° Secundaria', '6° Secundaria'
  ];

  // Control para selección de grados en niveles
  public mostrarSelectorGrados: boolean = false;
  public gradosSeleccionadosNivel: boolean[] = [];
  public advertenciaMultiplesGrados: boolean = false;

  // Modal
  mostrarModal: boolean = false;
  modalTipo: 'exito' | 'error' = 'exito';
  modalMensaje: string = '';

  ngOnInit(): void {
    this.obtenerIdOlimpiada();
    // Inicializar array para los checkboxes de grados de nivel
    this.gradosSeleccionadosNivel = this.grados.map(() => false);
  }

  private initializeNewLevel(): CreateNivelRequest {
    return {
      nombre_nivel: '',
      gradoIniCat: '',
      gradoFinCat: '',
      descripcion: '', // Se mantiene para evitar errores en el backend, pero se ocultará en el UI
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
  }

  public cargarAreas(): void {
    this.cargando = true;
    const timestamp = new Date().getTime();
    this.olimpiadaByAreaService.getAreasByOlimpiadaId(this.idOlimpiada!)
      .subscribe({
        next: (data) => {
          this.areas = data;
          this.cargando = false;
          this.errorCarga = null; 
        },
        error: (err) => {
          console.error('Error al cargar áreas:', err);
          this.errorCarga = 'Error al cargar áreas';
          this.cargando = false;
          this.errores = ['Error al cargar áreas. Por favor, intente de nuevo.'];
        }
      });
  }

  toggleFormulario(areaId: number): void {
    this.areaActivaId = this.areaActivaId === areaId ? null : areaId;
    this.currentNewLevel = this.initializeNewLevel();
    this.errores = [];
    this.formErrors = [];
    this.successMessage = null;
    this.mostrarSelectorGrados = false;
    this.gradosSeleccionadosNivel = this.grados.map(() => false);
    this.advertenciaMultiplesGrados = false;
  }

  seleccionarArea(area: IDOlimpiadabyArea): void {
    this.areaSeleccionada = area;
    this.areaActivaId = null;
  }

  // Método para manejar el click en el botón para seleccionar grados de nivel
  toggleSelectorGrados(): void {
    this.mostrarSelectorGrados = !this.mostrarSelectorGrados;
  }

  // Gestión de la selección de grados para niveles
  onNivelCheckboxChange(index: number): void {
    this.gradosSeleccionadosNivel[index] = !this.gradosSeleccionadosNivel[index];
    this.actualizarGradosNivel();
    
    // Verificar si hay más de un grado seleccionado para mostrar advertencia
    const gradosSeleccionados = this.gradosSeleccionadosNivel.filter(selected => selected).length;
    this.advertenciaMultiplesGrados = gradosSeleccionados > 1;
  }

  // Actualiza los campos gradoIniCat y gradoFinCat del nivel según los grados seleccionados
  actualizarGradosNivel(): void {
    // Encontrar el primer grado seleccionado
    const primerIndice = this.gradosSeleccionadosNivel.findIndex(selected => selected);
    
    // Encontrar el último grado seleccionado
    const ultimoIndice = this.gradosSeleccionadosNivel.lastIndexOf(true);
    
    if (primerIndice !== -1 && ultimoIndice !== -1) {
      this.currentNewLevel.gradoIniCat = this.grados[primerIndice];
      this.currentNewLevel.gradoFinCat = this.grados[ultimoIndice];
    } else {
      this.currentNewLevel.gradoIniCat = '';
      this.currentNewLevel.gradoFinCat = '';
    }
  }

  // Verificar si los grados seleccionados están dentro del rango del área
  verificarRangoArea(): boolean {
    if (!this.areaSeleccionada) return false;
    
    // Encontrar índices de grados del área
    const areaIniIndex = this.grados.indexOf(this.areaSeleccionada.gradoIniAr || '');
    const areaFinIndex = this.grados.indexOf(this.areaSeleccionada.gradoFinAr || '');
    
    // Encontrar índices de grados del nivel
    const nivelIniIndex = this.grados.indexOf(this.currentNewLevel.gradoIniCat);
    const nivelFinIndex = this.grados.indexOf(this.currentNewLevel.gradoFinCat);
    
    // El nivel debe estar dentro del rango del área
    if (areaIniIndex !== -1 && areaFinIndex !== -1 && 
        nivelIniIndex !== -1 && nivelFinIndex !== -1) {
      if (nivelIniIndex < areaIniIndex || nivelFinIndex > areaFinIndex) {
        this.formErrors.push('Los grados del nivel deben estar dentro del rango del área.');
        return false;
      }
    }
    
    return true;
  }

  validarCurrentNewLevel(): boolean {
    this.formErrors = [];
    const nivel = this.currentNewLevel;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (!nivel.nombre_nivel.trim()) {
      this.formErrors.push('El nombre del nivel es obligatorio.');
    }
    if (!nivel.gradoIniCat || !nivel.gradoIniCat.trim()) {
      this.formErrors.push('Debe seleccionar al menos un grado para el nivel.');
    }
    if (!nivel.gradoFinCat || !nivel.gradoFinCat.trim()) {
      this.formErrors.push('Debe seleccionar al menos un grado para el nivel.');
    }

    // Verificar que los grados están dentro del rango del área
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
    }

    if (nivel.costo === null || nivel.costo === undefined || isNaN(nivel.costo) || nivel.costo < 0) {
      this.formErrors.push('El costo debe ser un número válido y no negativo.');
    }

    return this.formErrors.length === 0;
  }

  mostrarModalMensaje(tipo: 'exito' | 'error', mensaje: string) {
    this.modalTipo = tipo;
    this.modalMensaje = mensaje;
    this.mostrarModal = true;
  }

  ocultarModal() {
    this.mostrarModal = false;
  }

  enviarNiveles(): void {
    if (!this.areaActivaId) {
      this.mostrarModalMensaje('error', 'No se ha seleccionado un área válida para agregar niveles.');
      return;
    }

    if (!this.validarCurrentNewLevel()) {
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
        next: (response) => {
          this.mostrarModalMensaje('exito', response.message || 'Nivel guardado correctamente.');
          this.currentNewLevel = this.initializeNewLevel();
          this.areaActivaId = null;
          this.formErrors = [];
          this.gradosSeleccionadosNivel = this.grados.map(() => false);
          this.advertenciaMultiplesGrados = false;
          this.cargarAreas();
        },
        error: (err) => {
          console.error('Error al crear nivel:', err);
          let mensajeError = 'Error desconocido al crear el nivel.';
          if (err.error?.message) {
            mensajeError = `Error al crear nivel: ${err.error.message}`;
          } else if (err.message) {
            mensajeError = `Error al crear nivel: ${err.message}`;
          }
          this.mostrarModalMensaje('error', mensajeError);
        },
        complete: () => {
          this.enviando = false;
        }
      });
  }

  getEstadoTexto(habilitacion: boolean): string {
    return habilitacion ? 'Habilitado' : 'Deshabilitado';
  }
}