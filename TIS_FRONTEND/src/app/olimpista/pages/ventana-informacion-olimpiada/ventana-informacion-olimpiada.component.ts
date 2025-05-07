import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VisualizacionPageResponse } from '../../interfaces/olimpiadaVisualizacion.interface';
import { VisualizacionService } from '../../service/Visualizacion.service';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';

@Component({
  selector: 'app-ventana-informacion-olimpiada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ventana-informacion-olimpiada.component.html',
  
})
export class VentanaInformacionOlimpiadaComponent {

  olimpiada: any;

  confirmacion: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private servicio: VisualizacionService) {
    const navigation = this.router.getCurrentNavigation();
    const stateData = navigation?.extras.state as { [key: string]: any };

    this.olimpiada = stateData ? stateData['olimpiadaData'] : null;

    if (!this.olimpiada) {
      console.error('No se recibió información de la olimpiada');
    }
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