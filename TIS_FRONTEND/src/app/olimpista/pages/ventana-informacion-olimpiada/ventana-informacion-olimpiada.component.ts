import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { OlimpiadaService } from '../../service/olimpiada.service';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';

@Component({
  selector: 'app-ventana-informacion-olimpiada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ventana-informacion-olimpiada.component.html',
  
})
export class VentanaInformacionOlimpiadaComponent implements OnInit {
  olimpiadaId!: number;
  olimpiada: Olimpiada | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private olimpiadaService: OlimpiadaService
  ) {}

  ngOnInit(): void {
    // 1. Leer el param 'id' como número
    this.route.params.subscribe(params => {
      this.olimpiadaId = +params['id'];
      console.log('ID Olimpiada:', this.olimpiadaId);

      // 2. Resetear estados
      this.loading = true;
      this.error = '';
      this.olimpiada = null;

      // 3. Llamar al servicio getOlimpiadaById
      this.olimpiadaService.getOlimpiadaById(this.olimpiadaId)
        .subscribe({
          next: (data: Olimpiada) => {
            console.log('Payload Olimpiada:', data);
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