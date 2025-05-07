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
export class VentanaInformacionOlimpiadaComponent implements OnInit {

  olimpiada:any;
  
  confirmacion: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private servicio: VisualizacionService) { }

  ngOnInit() {
  this.cargaDatos();
}

cargaDatos() {
  this.route.params.subscribe(params => {
    const olimpiadaId = params['id'];
    if (olimpiadaId) {
      this.servicio.getOlimpiadaById(olimpiadaId).subscribe({
        next: (data) => {
          this.olimpiada = data;
          this.confirmacion = true;
          console.log('Datos cargados desde servicio:', this.olimpiada);
        },
        error: (err) => {
          console.error('Error al obtener datos:', err);
        }
      });
    }
  });
}


}
