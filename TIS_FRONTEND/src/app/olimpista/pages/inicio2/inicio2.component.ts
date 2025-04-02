import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Inscripcion1Component } from '../../components/inscripcion1/inscripcion1.component';
import { Inscripcion2Component } from "../../components/inscripcion2/inscripcion2.component";
import { Inscripcion3Component } from "../../components/inscripcion3/inscripcion3.component";

@Component({
  selector: 'app-inicio2',
  templateUrl: './inicio2.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, Inscripcion1Component, Inscripcion2Component, Inscripcion3Component],
})
export class Inicio2Component {
  pasoActual = 1; // Controla en qué paso estamos

  siguientePaso() {
    if (this.pasoActual < 3) {
      this.pasoActual++;
    }
  }

  anteriorPaso() {
    if (this.pasoActual > 1) {
      this.pasoActual--;
    }
  }
}
