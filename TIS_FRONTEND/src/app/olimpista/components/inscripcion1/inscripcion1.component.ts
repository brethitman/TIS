import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscripcion1',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inscripcion1.component.html'
})
export class Inscripcion1Component {
  tutorData = {
    nombres: '',
    apellidos: '',
    ci: '',
    correo: '',
    telefono: ''
  };

  @Output() continuar = new EventEmitter<void>();
  @Output() tutorChanged = new EventEmitter<any>();

  onTutorChange() {
    this.tutorChanged.emit(this.tutorData);
  }

  siguiente() {
    if (this.validarDatos()) {
      this.onTutorChange();
      this.continuar.emit();
    }
  }

  validarDatos(): boolean {
    return !!this.tutorData.nombres &&
           !!this.tutorData.apellidos &&
           !!this.tutorData.ci &&
           !!this.tutorData.correo &&
           !!this.tutorData.telefono;
  }
}
