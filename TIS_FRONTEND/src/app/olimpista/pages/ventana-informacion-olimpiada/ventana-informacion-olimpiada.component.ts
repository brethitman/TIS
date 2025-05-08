import { Component, OnInit, Input, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VisualizacionPageResponse, Area } from '../../interfaces/olimpiadaVisualizacion.interface';
import { VisualizacionService } from '../../service/Visualizacion.service';
import { AreasCarruselComponent } from '../../components/areas-carrusel/areas-carrusel.component';

@Component({
  selector: 'app-ventana-informacion-olimpiada',
  standalone: true,
  imports: [CommonModule, AreasCarruselComponent],
  templateUrl: './ventana-informacion-olimpiada.component.html',
})
export class VentanaInformacionOlimpiadaComponent  {

  olimpiada: any;
  olimpiadaId: number;
  public Area = signal<Area[]>([]);
  confirmacion: boolean = false;
  areasDisponibles: any;

  constructor(private route: ActivatedRoute, private router: Router,
     private servicio: VisualizacionService) {
    const navigation = this.router.getCurrentNavigation();
    const stateData = navigation?.extras.state as { [key: string]: any };

    this.olimpiada = stateData ? stateData['olimpiadaData'] : null;
    this.olimpiadaId = this.olimpiada.id;
    if (!this.olimpiada) {
      console.error('No se recibió información de la olimpiada');
    }
  }

  cargarAreas(olimpiadaId: number): void {
    this.servicio.getAreasXOlimpiada(olimpiadaId).subscribe({
      next: (areas) => this.Area.set(areas),
      error: (error) => console.error('Error al obtener áreas:', error)
    });
    console.log('envio de areas:', this.areasDisponibles,'areas: ', this.Area)
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
