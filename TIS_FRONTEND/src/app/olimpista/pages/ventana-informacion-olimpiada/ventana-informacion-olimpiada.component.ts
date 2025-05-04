import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormasInscripcionComponent } from '../../components/formas-inscripcion/formas-inscripcion.component';

import { OlimpiadaService } from '../../service/olimpiada.service';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';


@Component({
  selector: 'app-ventana-informacion-olimpiada',
  standalone: true,
  imports: [CommonModule, FormasInscripcionComponent],
  templateUrl: './ventana-informacion-olimpiada.component.html',
})
export class VentanaInformacionOlimpiadaComponent implements OnInit {
  @Input({ required: true }) olimpiada!: Olimpiada;
  olimpiadaId!: number;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private olimpiadaService: OlimpiadaService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.olimpiadaId = +params['id'];
      console.log('ID Olimpiada:', this.olimpiadaId);

      // 2. Resetear estados
      this.loading = true;
      this.error = '';
      this.olimpiadaService.getOlimpiadaById(this.olimpiadaId)
        .subscribe({
          next: (data: Olimpiada) => {
            console.log('Payload Olimpiada:', data);
            console.log('Olimpiadas', this.olimpiada.descripcion_olimpiada)
            this.olimpiada = data;
            this.loading = false;
          },

          error: (err) => {
            console.error('Error cargando olimpiada:', err);
            this.error = 'No se pudo cargar la información de la olimpiada.';
            this.loading = false;
          }
        });
    });
  }
}
