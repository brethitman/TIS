<<<<<<< HEAD
=======
import { Router } from '@angular/router';
>>>>>>> ojopiojo
import { Component } from '@angular/core';

@Component({
  selector: 'app-Olimpista-page',
  imports: [],
  templateUrl: './Olimpista-page.component.html',

})
export class OlimpistaPageComponent {

<<<<<<< HEAD
}
=======
  constructor(
    private router: Router
  ) {

    };

  
  irADatosPostulante() {
    this.router.navigate(['inicio/datosPostulante']);
  }
}

>>>>>>> ojopiojo
