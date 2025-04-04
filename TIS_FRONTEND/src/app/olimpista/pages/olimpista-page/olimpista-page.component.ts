
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-Olimpista-page',
  imports: [],
  templateUrl: './Olimpista-page.component.html',

})
export class OlimpistaPageComponent {


  constructor(
    private router: Router
  ) {

    };

  
  irADatosPostulante() {
    this.router.navigate(['inicio/datosPostulante']);
  }
}

