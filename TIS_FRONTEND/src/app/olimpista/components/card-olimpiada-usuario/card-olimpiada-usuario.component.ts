// card-olimpiada-usuario.component.ts
import { Component, Input, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Interfaces y servicios
import { Olimpiada } from '../../interfaces/olimpiada-interfase';
import { OlimpiadaService } from '../../service/olimpiada.service';

@Component({
  selector: 'app-card-olimpiada-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './card-olimpiada-usuario.component.html',
})
export class CardOlimpiadaUsuarioComponent {
  // Input obligatorio para recibir datos de la olimpiada
  @Input({ required: true }) olimpiada!: Olimpiada;

  // Inyección de dependencias
  private router = inject(Router);
  private olimpiadaService = inject(OlimpiadaService);

  // Método mejorado para navegación
  entrar(): void {
    if (!this.olimpiada?.id) {
      console.error('Error: No se puede navegar - Olimpiada sin ID');
      return;
    }
    this.router.navigate(
      ['/ventana-informacion-olimpiada', this.olimpiada.id],
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
  }
}
