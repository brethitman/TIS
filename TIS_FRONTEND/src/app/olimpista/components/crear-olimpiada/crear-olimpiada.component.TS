import { Component, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetOlimpiadaService } from '../../service/get.olimpiada.service';

@Component({
  selector: 'app-crear-olimpiada',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-olimpiada.component.html',

})
export class CrearOlimpiadaComponent {
  @Output() onSuccess = new EventEmitter<any>();
  olimpiadaForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private olimpiadaService: GetOlimpiadaService
  ) {
    this.olimpiadaForm = this.fb.group({
      nombre_olimpiada: ['', [Validators.required, Validators.minLength(3)]],
      descripcion_olimpiada: ['', [Validators.required, Validators.minLength(10)]],
      fecha_inicio: ['', Validators.required],
      fecha_final: ['', Validators.required],
      areas: this.fb.array([this.crearAreaFormGroup()])
    });
  }

  crearAreaFormGroup(): FormGroup {
    return this.fb.group({
      nombre_area: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  get areas(): FormArray {
    return this.olimpiadaForm.get('areas') as FormArray;
  }

  agregarArea(): void {
    this.areas.push(this.crearAreaFormGroup());
  }

  eliminarArea(index: number): void {
    if (this.areas.length > 1) {
      this.areas.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.olimpiadaForm.valid) {
      this.isLoading = true;

      const formData = {
        nombre_olimpiada: this.olimpiadaForm.value.nombre_olimpiada,
        descripcion_olimpiada: this.olimpiadaForm.value.descripcion_olimpiada,
        fecha_inicio: this.formatDate(this.olimpiadaForm.value.fecha_inicio),
        fecha_final: this.formatDate(this.olimpiadaForm.value.fecha_final),
        areas: this.olimpiadaForm.value.areas.map((area: any) => ({
          nombre_area: area.nombre_area,
          descripcion: area.descripcion
        }))
      };

      this.olimpiadaService.crearOlimpiada(formData).subscribe({
        next: (response) => {
          this.onSuccess.emit(response.data);
          this.isLoading = false;
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al crear olimpiada:', err);
          this.isLoading = false;
        }
      });
    }
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }

  resetForm(): void {
    this.olimpiadaForm.reset();
    this.areas.clear();
    this.areas.push(this.crearAreaFormGroup());
  }
}
