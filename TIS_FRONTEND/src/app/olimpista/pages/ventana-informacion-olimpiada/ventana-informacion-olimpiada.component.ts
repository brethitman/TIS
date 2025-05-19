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

@Component({
  selector: 'app-ventana-informacion-olimpiada',
  standalone: true,
  imports: [CommonModule, AreasCarruselComponent, CategoriasHomeComponent],
  templateUrl: './ventana-informacion-olimpiada.component.html',

})
export class VentanaInformacionOlimpiadaComponent implements OnInit {

  olimpiada: any;
  olimpiadaId: number;
  confirmacion: boolean = false;
  areasDisponibles:  olimpiadabyArea[]= [];
  errorMessage: string | null = null;
  areasDisponiblest: any;
  categorias: NivelCategoria[] = [];

  public Area = signal<Area[]>([]);
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private router: Router,
    private servicio: VisualizacionService, private olimpiadaByAreaService: OlimpiadaByAreaService,
    private categoriaService: CategoriaVisualizacionService) {
    const navigation = this.router.getCurrentNavigation();
    const stateData = navigation?.extras.state as { [key: string]: any };

    this.olimpiada = stateData ? stateData['olimpiadaData'] : null;
    this.olimpiadaId = this.olimpiada.id;
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
        this.categorias = categorias;
        console.log('Categorías:', categorias);
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
      }
    );
  }

  //Botones
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
            nombre: this.olimpiada.nombre_olimpiada,
            fechaInicio: this.olimpiada.fecha_inicio,
            fechaFin: this.olimpiada.fecha_final
          }
        }
      }
    );
    console.log('id de olimpiada: ', this.olimpiada.id)
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
            nombre: this.olimpiada.nombre_olimpiada,
            fechaInicio: this.olimpiada.fecha_inicio,
            fechaFin: this.olimpiada.fecha_final
          }
        }
      }
    );
    console.log('id de olimpiada: ', this.olimpiada.id)
  }

}