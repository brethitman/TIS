import { CommonModule, DatePipe } from '@angular/common'; // Importa DatePipe
import { Component, inject, Input } from '@angular/core'; // No se necesita OnInit si no hay loadArea
import { Olimpiada } from '../../interfaces/olimpiada-interfase'; // Asegúrate de que esta interfaz es correcta

import { Router } from '@angular/router'; // <-- Importar Router

@Component({
  selector: 'app-olimpiada-card',
  standalone: true,
  imports: [CommonModule, DatePipe], // Añade DatePipe para usar el pipe 'date' en el template
  templateUrl: './olimpiada-card.component.html',

})
export class OlimpiadaCardComponent { // Ya no implementa OnInit

  // Recibe el objeto Olimpiada como entrada (Input)
  @Input({ required: true }) Olimpiada!: Olimpiada;

  // Inyecta el servicio Router para la navegación
  private router = inject(Router);

  // Este método se llama al hacer clic en el botón "Entrar"
  // Navega a la ruta que mostrará las áreas de la olimpiada
  entrar() {
    // La ruta incluye el ID de la olimpiada para que el componente de destino lo use
    this.router.navigate([`inicio/look/wach/${this.Olimpiada.id}`]);
  }

  // El método handleAreaUpdated (y la carga de áreas) no son necesarios aquí
  // ya que la vista de áreas se carga en otro componente.
  // Si handleAreaUpdated realiza otra función, puedes dejarlo.
}
