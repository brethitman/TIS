import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-error',
  imports: [CommonModule ],
  templateUrl: './boleta-lista.component.html',
})
export class BoletaListaComponent {
  @Input() erroresLista: string[] = [];

  cerrarModal() {
    const modal = document.getElementById('modalError');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
