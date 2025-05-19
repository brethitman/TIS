import { Component, OnInit} from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OlimpiadaService } from '../../service/olimpiada.service';

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
