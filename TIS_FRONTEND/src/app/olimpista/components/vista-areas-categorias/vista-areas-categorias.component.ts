import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IDOlimpiadabyArea } from '../../interfaces/olimpiadaAreaCategoria.interface';
import { OlimpiadaByAreaService } from '../../service/OlimpiadaByArea.service';
import { CrearAreaComponent } from '../crear-area/crear-area.component';
import { NivelService } from '../../service/post_Categoria.service';
import { 
  CreateNivelRequest, 
  CreateNivelesBulkRequest,
  CreateNivelesBulkResponse, 
  NivelResponse, 
  AreaResponse,
  OlimpiadaResponse
} from '../../interfaces/post_categoria.interface';

@Component({
  selector: 'app-vista-areas-categorias',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    CurrencyPipe,
    CrearAreaComponent,
    FormsModule
  ],
  templateUrl: './vista-areas-categorias.component.html',
})
export class VistaAreasCategoriasComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private olimpiadaByAreaService = inject(OlimpiadaByAreaService);
  private nivelService = inject(NivelService);

  // Properly typed properties
  public olimpiadaSeleccionada: OlimpiadaResponse | null = null;
  public areaSeleccionada: IDOlimpiadabyArea | null = null;
  public areaActiva: number | null = null;
  public nuevoNivel: CreateNivelRequest = this.initializeNewLevel();

  public areas: IDOlimpiadabyArea[] = [];
  public cargando: boolean = true;
  public errorCarga: string | null = null;
  public idOlimpiada: number | null = null;

  public areaActivaId: number | null = null;
  public newLevelsForArea: CreateNivelRequest[] = [];
  public currentNewLevel: CreateNivelRequest = this.initializeNewLevel();

  public enviando: boolean = false;
  public errores: string[] = [];
  public formErrors: string[] = [];
  public successMessage: string | null = null;

  ngOnInit(): void {
    this.obtenerIdOlimpiada();
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
    const timestamp = new Date().getTime();
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

  toggleFormulario(areaId: number): void {
    this.areaActiva = this.areaActiva === areaId ? null : areaId;
    this.areaActivaId = this.areaActiva;
    
    this.newLevelsForArea = [];
    this.nuevoNivel = this.initializeNewLevel();
    this.currentNewLevel = this.initializeNewLevel();
    this.errores = [];
    this.formErrors = [];
    this.successMessage = null;
  }

  crearNivel(areaId: number): void {
    if (!this.validarCurrentNewLevel()) {
      return;
    }

    this.enviando = true;
    this.errores = [];

    const nivelRequest: CreateNivelRequest = { ...this.nuevoNivel };
    
    this.nivelService.crearNivelPorArea(areaId, nivelRequest)
      .subscribe({
        next: (response: NivelResponse) => {
          this.enviando = false;
          this.successMessage = 'Nivel creado correctamente';
          this.nuevoNivel = this.initializeNewLevel();
          this.areaActiva = null;
          this.areaActivaId = null;
          
          this.cargarAreas();
        },
        error: (err: any) => {
          this.enviando = false;
          console.error('Error al crear nivel:', err);
          
          if (err.error && err.error.message) {
            this.errores = [err.error.message];
          } else if (err.message) {
            this.errores = [err.message];
          } else {
            this.errores = ['Error desconocido al crear el nivel'];
          }
        }
      });
  }

  validarCurrentNewLevel(): boolean {
    this.formErrors = [];
    const nivel = this.nuevoNivel || this.currentNewLevel;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (!nivel.nombre_nivel.trim()) {
      this.formErrors.push('El nombre del nivel es obligatorio.');
    }
    if (!nivel.gradoIniCat || !nivel.gradoIniCat.trim()) {
      this.formErrors.push('El grado inicial es obligatorio.');
    }
    if (!nivel.gradoFinCat || !nivel.gradoFinCat.trim()) {
      this.formErrors.push('El grado final es obligatorio.');
    }

    if (nivel.gradoIniCat && nivel.gradoFinCat) {
      if (nivel.gradoIniCat > nivel.gradoFinCat) {
        this.formErrors.push('El grado inicial no puede ser mayor que el grado final.');
      }
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
    
    this.errores = [...this.formErrors];

    return this.formErrors.length === 0;
  }

  agregarNivelLocal(): void {
    if (!this.validarCurrentNewLevel()) {
      return;
    }

    this.newLevelsForArea.push({ ...this.currentNewLevel });
    this.currentNewLevel = this.initializeNewLevel();
    this.formErrors = [];
    this.successMessage = null;
    this.errores = [];
  }

  removerNivelLocal(index: number): void {
    if (index >= 0 && index < this.newLevelsForArea.length) {
      this.newLevelsForArea.splice(index, 1);
      this.errores = [];
      this.successMessage = null;
    }
  }

  enviarNiveles(): void {
    if (!this.areaActivaId) {
      this.errores = ['No se ha seleccionado un área válida para agregar niveles.'];
      return;
    }

    if (this.newLevelsForArea.length === 0) {
      this.errores = ['Debe agregar al menos un nivel a la lista para poder guardar.'];
      return;
    }

    this.enviando = true;
    this.errores = [];
    this.successMessage = null;

    const bulkRequest: CreateNivelesBulkRequest = {
      niveles: this.newLevelsForArea
    };

    this.nivelService.crearNivelesEnArea(this.areaActivaId, bulkRequest)
      .subscribe({
        next: (response: CreateNivelesBulkResponse) => {
          this.successMessage = response.message || 'Niveles guardados correctamente.';
          console.log('Respuesta del backend:', response);

          this.newLevelsForArea = [];
          this.currentNewLevel = this.initializeNewLevel();
          this.areaActivaId = null;
          this.areaActiva = null;
          this.formErrors = [];

          this.cargarAreas();

        },
        error: (err: any) => {
          console.error('Error al crear niveles:', err);
          this.successMessage = null;

          if (err.error && err.error.message) {
             this.errores = [`Error al crear niveles: ${err.error.message}`];
          } else if (err.message) {
             this.errores = [`Error al crear niveles: ${err.message}`];
          }
          else {
            this.errores = ['Error desconocido al crear niveles.'];
          }
        },
        complete: () => {
          this.enviando = false;
        }
      });
  }

  isHabilitado(habilitacion: boolean | number | null | undefined): boolean {
    if (habilitacion === null || habilitacion === undefined) {
      return false;
    }
    
    // Convertimos cualquier tipo a boolean para la comparación
    return habilitacion === true || habilitacion === 1;
  }
  
  /**
   * Comprueba si el valor de habilitación debe considerarse como "deshabilitado"
   */
  isDeshabilitado(habilitacion: boolean | number | null | undefined): boolean {
    if (habilitacion === null || habilitacion === undefined) {
      return true;
    }
    
    // Convertimos cualquier tipo a boolean para la comparación
    return habilitacion === false || habilitacion === 0;
  }
  
  /**
   * Devuelve el texto del estado de habilitación
   */
  getEstadoTexto(habilitacion: boolean | number | null | undefined): string {
    return this.isHabilitado(habilitacion) ? 'Habilitado' : 'Deshabilitado';
  }
  
}