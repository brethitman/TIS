import { Component, OnInit, Input, signal, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { VisualizacionPageResponse, Area } from '../../interfaces/olimpiadaVisualizacion.interface';
import { VisualizacionService } from '../../service/Visualizacion.service';
import { AreasCarruselComponent } from '../../components/areas-carrusel/areas-carrusel.component';
import { OlimpiadaByAreaService } from '../../service/OlimpiadaByArea.service';
import { olimpiadabyArea, NivelCategoria } from '../../interfaces/areavisualizacion.interface';
import { CategoriasHomeComponent } from '../../components/categorias-home/categorias-home.component';
import { CategoriaVisualizacionService } from '../../service/categoriaVisualizacion.service';

// Interface actualizada para la olimpiada con los nuevos campos
interface OlimpiadaCompleta {
  id: number;
  nombre_olimpiada: string;
  descripcion_olimpiada: string;
  fecha_inicio: string | Date;
  fecha_final: string | Date;
  presentacion?: string;
  requisitos?: string;
  fecha_inscripcion_inicio?: string | Date;
  fecha_inscripcion_final?: string | Date;
  premios?: string;
  informacion_adicional?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

@Component({
  selector: 'app-ventana-informacion-olimpiada',
  standalone: true,
  imports: [CommonModule, AreasCarruselComponent, CategoriasHomeComponent],
  templateUrl: './ventana-informacion-olimpiada.component.html',
})
export class VentanaInformacionOlimpiadaComponent implements OnInit, OnDestroy {

  olimpiada: OlimpiadaCompleta | any;
  olimpiadaId: number | undefined;
  confirmacion: boolean = false;
  areasDisponibles: olimpiadabyArea[] = [];
  errorMessage: string | null = null;
  areasDisponiblest: any;
  categorias: NivelCategoria[] = [];

  public Area = signal<Area[]>([]);
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private servicio: VisualizacionService, 
    private olimpiadaByAreaService: OlimpiadaByAreaService,
    private categoriaService: CategoriaVisualizacionService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const stateData = navigation?.extras.state as { [key: string]: any };

    this.olimpiada = stateData ? stateData['olimpiadaData'] : null;
    
    if (this.olimpiada?.id) {
      this.olimpiadaId = this.olimpiada.id;
    }
    
    if (!this.olimpiada) {
      console.error('No se recibió información de la olimpiada');
    } else {
      console.log('Datos de olimpiada recibidos:', this.olimpiada);
    }
  }

  ngOnInit(): void {
    this.cargarOlimpiadaId();
    // Si no tenemos todos los datos de la olimpiada, los cargamos
    if (this.olimpiada && !this.tieneInformacionCompleta()) {
      this.cargarInformacionCompleta();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private tieneInformacionCompleta(): boolean {
    // Verificamos si tenemos al menos los campos básicos
    return this.olimpiada && 
           this.olimpiada.hasOwnProperty('presentacion') &&
           this.olimpiada.hasOwnProperty('requisitos') &&
           this.olimpiada.hasOwnProperty('premios') &&
           this.olimpiada.hasOwnProperty('informacion_adicional');
  }

  private cargarInformacionCompleta(): void {
    if (!this.olimpiadaId) return;
    
    // Aquí deberías llamar a tu servicio para obtener la información completa
    // Por ejemplo: this.servicio.getOlimpiadaCompleta(this.olimpiadaId)
    // Como no tienes ese método, usaremos los datos que ya tienes
    console.log('Cargando información completa para olimpiada ID:', this.olimpiadaId);
  }

  private cargarOlimpiadaId(): void {
    this.route.params.subscribe(params => {
      const olimpiadaId = params['id'];
      if (olimpiadaId) {
        this.olimpiadaId = Number(olimpiadaId);
        this.cargarAreas(olimpiadaId);
      } else {
        console.error('No se encontró ID de olimpiada en la URL');
      }
    });
  }

  private cargarAreas(olimpiadaId: string): void {
    this.olimpiadaByAreaService.getAreasByOlimpiadaId(Number(olimpiadaId))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (areas) => {
          this.areasDisponibles = areas.map(area => ({
            id_area: area.id_area,
            nombre_area: area.nombre_area,
            descripcion: area.descripcion,
          }));
          console.log('Áreas cargadas:', this.areasDisponibles);
        },
        error: (error) => {
          console.error('Error cargando áreas:', error);
          this.errorMessage = 'Error al cargar las áreas disponibles';
        }
      });
  }

  cargarCategoriasPorArea(areaId: number): void {
    this.categoriaService.getCategoriasPorArea(areaId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categorias) => {
          this.categorias = categorias;
          console.log('Categorías cargadas:', categorias);
        },
        error: (error) => {
          console.error('Error al cargar categorías:', error);
        }
      });
  }

  // Métodos helper para verificar si los campos opcionales tienen contenido
  tienePresentacion(): boolean {
    return this.olimpiada?.presentacion && this.olimpiada.presentacion.trim() !== '';
  }

  tieneRequisitos(): boolean {
    return this.olimpiada?.requisitos && this.olimpiada.requisitos.trim() !== '';
  }

  tienePremios(): boolean {
    return this.olimpiada?.premios && this.olimpiada.premios.trim() !== '';
  }

  tieneInformacionAdicional(): boolean {
    return this.olimpiada?.informacion_adicional && this.olimpiada.informacion_adicional.trim() !== '';
  }

  tieneFechasInscripcion(): boolean {
    return (this.olimpiada?.fecha_inscripcion_inicio && this.olimpiada?.fecha_inscripcion_final);
  }

  // Método para formatear fechas si es necesario
  formatearFecha(fecha: string | Date): string {
    if (!fecha) return '';
    
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return fechaObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }

  // Métodos de navegación existentes
  entrar(): void {
    if (!this.olimpiada?.id) {
      console.error('Error: No se puede navegar - Olimpiada sin ID');
      return;
    }
    
    this.router.navigate(
      ['inicio/look/inscripcion-todo', this.olimpiada.id],
      {
        state: {
          olimpiadaData: {
            id: this.olimpiada.id,
            nombre: this.olimpiada.nombre_olimpiada,
            descripcion: this.olimpiada.descripcion_olimpiada,
            fechaInicio: this.olimpiada.fecha_inicio,
            fechaFin: this.olimpiada.fecha_final,
            presentacion: this.olimpiada.presentacion,
            requisitos: this.olimpiada.requisitos,
            fechaInscripcionInicio: this.olimpiada.fecha_inscripcion_inicio,
            fechaInscripcionFinal: this.olimpiada.fecha_inscripcion_final,
            premios: this.olimpiada.premios,
            informacion_adicional: this.olimpiada.informacion_adicional
          }
        }
      }
    );
    console.log('Navegando con ID de olimpiada:', this.olimpiada.id);
  }

  variosEstudiantes(): void {
    if (!this.olimpiada?.id) {
      console.error('Error: No se puede navegar - Olimpiada sin ID');
      return;
    }
    
    this.router.navigate(
      ['inicio/Olimpiada', this.olimpiada.id, 'Visualizacion'],
      {
        state: {
          olimpiadaData: {
            id: this.olimpiada.id,
            nombre: this.olimpiada.nombre_olimpiada,
            descripcion: this.olimpiada.descripcion_olimpiada,
            fechaInicio: this.olimpiada.fecha_inicio,
            fechaFin: this.olimpiada.fecha_final,
            presentacion: this.olimpiada.presentacion,
            requisitos: this.olimpiada.requisitos,
            fechaInscripcionInicio: this.olimpiada.fecha_inscripcion_inicio,
            fechaInscripcionFinal: this.olimpiada.fecha_inscripcion_final,
            premios: this.olimpiada.premios,
            informacion_adicional: this.olimpiada.informacion_adicional
          }
        }
      }
    );
    console.log('Navegando con ID de olimpiada:', this.olimpiada.id);
  }
}