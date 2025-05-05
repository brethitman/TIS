import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OlimpiadaService } from '../../service/olimpiada.service';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';

@Component({
  selector: 'app-ventana-informacion-olimpiada',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './ventana-informacion-olimpiada.component.html',
})
export class VentanaInformacionOlimpiadaComponent implements OnInit {
  olimpiadaId!: number;
  olimpiada: Olimpiada | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private olimpiadaService: OlimpiadaService
  ) {}

  ngOnInit(): void {
    // Primero intenta obtener los datos del estado de navegación
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { olimpiadaData: Olimpiada };

    if (state?.olimpiadaData) {
      this.olimpiada = state.olimpiadaData;
      this.loading = false;
    } else {
      // Si no hay datos en el estado, carga desde el servicio
      this.route.params.subscribe(params => {
        this.olimpiadaId = +params['id'];
        this.loadOlimpiadaData();
      });
    }
  }

  private loadOlimpiadaData(): void {
    this.olimpiadaService.getOlimpiadaById(this.olimpiadaId)
      .subscribe({
        next: (data: Olimpiada) => {
          this.olimpiada = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error cargando olimpiada:', err);
          this.error = 'No se pudo cargar la información de la olimpiada.';
          this.loading = false;
        }
      });
  }
}