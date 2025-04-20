import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscripcion2',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inscripcion2.component.html'
})
export class Inscripcion2Component {
  olimpistaData = {
    nombres: '',
    apellidos: '',
    ci: '',
    fecha_nacimiento: '',
    correo: '',
    telefono: '',
    colegio: '',
    curso: '',
    departamento: '',
    provincia: ''
  };

  @Output() continuar = new EventEmitter<void>();
  @Output() atras = new EventEmitter<void>();
  @Output() olimpistaChanged = new EventEmitter<any>();

  onOlimpistaChange() {
    this.olimpistaChanged.emit(this.olimpistaData);
  }

  siguiente() {
    if (this.validarDatos()) {
      this.onOlimpistaChange();
      this.continuar.emit();
    }
  }

  volver() {
    this.atras.emit();
  }

  validarDatos(): boolean {
    return !!this.olimpistaData.nombres &&
           !!this.olimpistaData.apellidos &&
           !!this.olimpistaData.ci;
  }
}