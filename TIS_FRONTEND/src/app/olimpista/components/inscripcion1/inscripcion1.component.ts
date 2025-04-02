import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscripcion1',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './inscripcion1.component.html'
})
export class Inscripcion1Component {
  constructor(private router: Router) {}

  siguiente() {
    this.router.navigate(['/inscripcion/paso2']);  // Esta ruta ahora existe en tu configuración
  }
}
