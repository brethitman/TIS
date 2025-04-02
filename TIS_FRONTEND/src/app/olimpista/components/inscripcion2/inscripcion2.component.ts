import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscripcion2',
  imports: [],
  templateUrl: './inscripcion2.component.html',

})
export class Inscripcion2Component {

constructor(private router: Router) {}

  siguiente() {
    this.router.navigate(['/inscripcion/paso3']);  // Esta ruta ahora existe en tu configuración
  }

}
