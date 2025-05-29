import { Component, OnInit, Input, signal, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { VisualizacionPageResponse, Area } from '../../interfaces/olimpiadaVisualizacion.interface';
import { VisualizacionService } from '../../service/Visualizacion.service';
import { AreasCarruselComponent } from '../../components/areas-carrusel/areas-carrusel.component';
import { OlimpiadaByAreaService } from '../../service/OlimpiadaByArea.service';
import { IDOlimpiadabyArea, IDNivelCategoria, OlimpiadaResponse } from '../../interfaces/post_categoria.interface';
import { CategoriasHomeComponent } from '../../components/categorias-home/categorias-home.component';
import { CategoriaVisualizacionService } from '../../service/categoriaVisualizacion.service'; 

@Component({
  selector: 'app-ventana-informacion-olimpiada',
  standalone: true,
  imports: [CommonModule, AreasCarruselComponent, CategoriasHomeComponent],
  templateUrl: './ventana-informacion-olimpiada.component.html',
})
export class VentanaInformacionOlimpiadaComponent implements OnInit {
  olimpiada: OlimpiadaResponse | null = null;
  olimpiadaId: number;
  confirmacion: boolean = false;
  areasDisponibles: IDOlimpiadabyArea[] = [];
  errorMessage: string | null = null;
  categorias: IDNivelCategoria[] = [];

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
    this.olimpiadaId = this.olimpiada?.id_olimpiada || 0;
    if (!this.olimpiada) {
      console.error('No se recibió información de la olimpiada');
    }
  }

  ngOnInit(): void {
    this.cargarOlimpiadaId();
  }

  private cargarOlimpiadaId(): void {
    this.route.params.subscribe(params => {
      const olimpiadaId = params['id'];
      if (olimpiadaId) {
        this.cargarDetallesOlimpiada(olimpiadaId);
        this.cargarAreas(olimpiadaId);
      } else {
        console.error('No se encontró ID de olimpiada en la URL');
      }
    });
  }

  private cargarDetallesOlimpiada(olimpiadaId: string): void {
    this.olimpiadaByAreaService.getOlimpiadaById(Number(olimpiadaId))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (olimpiada) => {
          console.log('Detalles de la olimpiada cargados:', olimpiada);
          this.olimpiada = olimpiada;
        },
        error: (error) => {
          console.error('Error cargando detalles de la olimpiada:', error);
          this.errorMessage = 'Error al cargar los detalles de la olimpiada';
        }
      });
  }

  private cargarAreas(olimpiadaId: string): void {
    this.olimpiadaByAreaService.getAreasByOlimpiadaId(Number(olimpiadaId))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (areas) => {
          console.log('Áreas cargadas:', areas);
          this.areasDisponibles = areas;
        },
        error: (error) => {
          console.error('Error cargando áreas:', error);
          this.errorMessage = 'Error al cargar las áreas disponibles';
        }
      });
  }

  cargarCategoriasPorArea(areaId: number): void {
    this.categoriaService.getCategoriasPorArea(areaId).subscribe(
      (categorias) => {
        console.log('Categorías cargadas:', categorias);
        this.categorias = categorias;
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
      }
    );
  }

  entrar(): void {
    if (!this.olimpiada?.id_olimpiada) {
      console.error('Error: No se puede navegar - Olimpiada sin ID');
      return;
    }
    this.router.navigate(
      ['inicio/look/inscripcion-todo', this.olimpiada.id_olimpiada],
      {
        state: {
          olimpiadaData: {
            nombre: this.olimpiada.nombre_olimpiada,
            fechaInicio: this.olimpiada.fecha_inicio,
            fechaFin: this.olimpiada.fecha_final
          }
        }
      }
    );
  }

  variosEstudiantes(): void {
    if (!this.olimpiada?.id_olimpiada) {
      console.error('Error: No se puede navegar - Olimpiada sin ID');
      return;
    }
    this.router.navigate(
      ['inicio/Olimpiada', this.olimpiada.id_olimpiada, 'Visualizacion'],
      {
        state: {
          olimpiadaData: {
            nombre: this.olimpiada.nombre_olimpiada,
            fechaInicio: this.olimpiada.fecha_inicio,
            fechaFin: this.olimpiada.fecha_final
          }
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}