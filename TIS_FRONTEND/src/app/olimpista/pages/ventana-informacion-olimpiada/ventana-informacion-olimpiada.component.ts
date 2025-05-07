import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VisualizacionPageResponse } from '../../interfaces/olimpiadaVisualizacion.interface';
import { VisualizacionService } from '../../service/Visualizacion.service';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';
import { IDOlimpiadabyArea, NivelCategoria } from '../../interfaces/olimpiadaAreaCategoria.interface';
import { Subject, takeUntil } from 'rxjs';
import { OlimpiadaByAreaService } from '../../service/OlimpiadaByArea.service';

@Component({
  selector: 'app-ventana-informacion-olimpiada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ventana-informacion-olimpiada.component.html',
})
export class VentanaInformacionOlimpiadaComponent implements OnInit {

  olimpiada: any;
  olimpiadaId: number;
  areas: any[] = [];
  confirmacion: boolean = false;
  private destroy$ = new Subject<void>();
  areasDisponibles: IDOlimpiadabyArea[] = [];
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router,
     private servicio: VisualizacionService,private olimpiadaByAreaService: OlimpiadaByAreaService,) {
    const navigation = this.router.getCurrentNavigation();
    const stateData = navigation?.extras.state as { [key: string]: any };

    this.olimpiada = stateData ? stateData['olimpiadaData'] : null;
    this.olimpiadaId = this.olimpiada.id;
    if (!this.olimpiada) {
      console.error('No se recibió información de la olimpiada');
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
        const olimpiadaId = params['id'];
        if (olimpiadaId) {
          this.cargarAreas(olimpiadaId);
        } else {
          console.error('No se encontró ID de olimpiada en la URL');
          // Puedes redirigir a una página de error
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

}
