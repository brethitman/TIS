import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formas-inscripcion',
  imports: [],
  templateUrl: './formas-inscripcion.component.html'

})
export class FormasInscripcionComponent {

  constructor(private router: Router) { };

  irAreas(){
    this.router.navigate(['inicio/Olimpiada/Areas']);
  }
  irAVisualizacion() {
    this.router.navigate(['inicio/Olimpiada/Recomendaciones']);
  }
}
