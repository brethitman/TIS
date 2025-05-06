import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VisualizacionPageResponse } from '../../interfaces/olimpiadaVisualizacion.interface';
import { VisualizacionService } from '../../service/Visualizacion.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ventana-informacion-olimpiada',
  standalone: true,
  imports: [CommonModule,  HttpClientModule],
  templateUrl: './ventana-informacion-olimpiada.component.html',
})
export class VentanaInformacionOlimpiadaComponent implements OnInit {

  olimpiada: any = null;
  olimpiadaOtro: any = null;
  confirmacion: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private servicio: VisualizacionService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const olimpiadaId = params['id'];
      if (olimpiadaId) {
        this.servicio.getOlimpiadaById(olimpiadaId).subscribe({
          next: (data) => {
            this.olimpiada = data;
            console.log('Datos cargados:', this.olimpiada);
          },
          error: (err) => {
            console.error('Error al obtener datos:', err);
          }
        });
      } else {
        console.error('No se encontró ID en la URL');
      }
    });
    console.log('Datos:', this.olimpiada);
  }
}
