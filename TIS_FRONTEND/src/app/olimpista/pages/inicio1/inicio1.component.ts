import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetOlimpiadaService } from '../../service/get.olimpiada.service';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio1',
  standalone: true,
  imports: [CommonModule, DatePipe], // Añade DatePipe para formatear fechas
  templateUrl: './inicio1.component.html',
})
export class Inicio1Component implements OnInit {
  private getOlimpiadaService = inject(GetOlimpiadaService);
  private router = inject(Router);
  public olimpiadas = signal<Olimpiada[]>([]);

  ngOnInit(): void {
    this.loadOlimpiadas();
  }

  public loadOlimpiadas() {
    this.getOlimpiadaService.findAll().subscribe({
      next: (response: any) => {
        // Ajusta según la estructura real de tu API
        const data = Array.isArray(response) ? response : 
                    response?.olimpiadas || response?.data || [];
        this.olimpiadas.set(data);
      },
      error: (err) => {
        console.error('Error al cargar olimpiadas:', err);
        this.olimpiadas.set([]);
      }
    });
  }
  public navigateToOlimpiadaInfo(olimpiada: Olimpiada): void {
    console.log('Datos de la olimpiada que se envían:', olimpiada);
    this.router.navigate(['/ventana-informacion-olimpiada', olimpiada.id], {
      state: { olimpiadaData: olimpiada }
    });
  }
}