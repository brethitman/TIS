// area-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Area ,Nivele} from '../../interfaces/area.interface';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-area-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Añadir ReactiveFormsModule
  templateUrl: './area-card.component.html',
})
export class AreaCardComponent {
  @Input({ required: true }) Area!: Area;
  @Output() areaUpdated = new EventEmitter<Area>();

  showForm = false;
  nivelForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.nivelForm = this.fb.group({
      nombre_nivel: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_examen: ['', Validators.required],
      costo: ['', [Validators.required, Validators.min(0)]],
      habilitacion: [true]
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmit() {
    if (this.nivelForm.valid) {
      const formValue = this.nivelForm.value;

      const newNivel: any = {
        nombre_nivel: formValue.nombre_nivel,
        descripcion: formValue.descripcion,
        fecha_examen: new Date(formValue.fecha_examen),
        costo: formValue.costo.toFixed(2),
        habilitacion: formValue.habilitacion
      };

      const updatedArea: Area = {
        ...this.Area,
        niveles: [...this.Area.niveles, newNivel as Nivele]
      };

      this.areaUpdated.emit(updatedArea);
      this.nivelForm.reset();
      this.showForm = false;
    }
  }
}
