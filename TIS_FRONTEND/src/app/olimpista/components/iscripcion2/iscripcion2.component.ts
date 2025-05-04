import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importa Router para la navegación
import { InscripcionDataService } from '../../service/inscripcion-data-service.service';
import { Tutor } from '../../interfaces/inscripcion.interface'; // Ajusta la ruta

@Component({
  selector: 'app-iscripcion2',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './iscripcion2.component.html',
  // Removido: styleUrls, providers
})
export class Iscripcion2Component implements OnInit {
  tutorForm: FormGroup; // Formulario solo para tutores
  errorMessage: string | null = null;
  // Removido: successMessage, isLoading

  constructor(
    private fb: FormBuilder,
    private router: Router, // Inyecta Router
    private inscripcionDataService: InscripcionDataService // Inyecta el servicio de datos
  ) {
    // Inicializa el formulario solo con el FormArray de tutores
    this.tutorForm = this.fb.group({
      tutors: this.fb.array([]) // Inicialmente vacío
    });
  }

  ngOnInit(): void {
      // *** Importante: Verificar que los datos del paso anterior existan ***
      const olimpistasData = this.inscripcionDataService.getOlimpistas();
      if (!olimpistasData || olimpistasData.length === 0) {
           // Si no hay datos de olimpistas, redirige al paso 1 para evitar saltar pasos
           this.router.navigate(['/inscripcion/paso1']);
           return; // Detiene la ejecución si redirigimos
      }

      // Carga los datos guardados si el usuario regresa a este paso
      const savedTutors = this.inscripcionDataService.getTutors();
      if (savedTutors.length > 0) {
         savedTutors.forEach(tutor => {
           this.tutors.push(this.createTutorForm(tutor));
         });
      } else {
        // Agrega un formulario de tutor por defecto si no hay datos guardados
        this.addTutor();
      }
  }

  get tutors(): FormArray {
    return this.tutorForm.get('tutors') as FormArray;
  }

  // Mantenemos la función para crear un FormGroup de tutor
  createTutorForm(tutor?: Tutor): FormGroup {
    return this.fb.group({
      nombres: [tutor?.nombres || '', Validators.required],
      apellidos: [tutor?.apellidos || '', Validators.required],
      ci: [tutor?.ci || '', Validators.required],
      correo: [tutor?.correo || '', [Validators.required, Validators.email]],
      telefono: [tutor?.telefono || '', Validators.required]
    });
  }

  addTutor(): void {
    this.tutors.push(this.createTutorForm());
  }

  removeTutor(index: number): void {
     // Solo permitir eliminar si hay más de un tutor
    if (this.tutors.length > 1) {
        this.tutors.removeAt(index);
    } else {
         // Opcional: mostrar un mensaje si se intenta eliminar el único tutor
        // this.errorMessage = 'Debe haber al menos un tutor.';
    }
  }

  // Función para ir al siguiente paso
  nextStep(): void {
     // Marca todos los campos como tocados para mostrar validación
    this.tutorForm.markAllAsTouched();

    // Verifica si el formulario es inválido o si no hay ningún tutor
    if (this.tutorForm.invalid || this.tutors.length === 0) {
       this.errorMessage = 'Por favor, complete todos los campos requeridos para los tutores.';
       console.log('Formulario inválido:', this.tutorForm.errors, this.tutors.errors);
      return;
    }

     this.errorMessage = null; // Limpia cualquier error previo

    // Guarda los datos de los tutores en el servicio compartido
    this.inscripcionDataService.setTutors(this.tutorForm.value.tutors);

    // Navega al siguiente paso (ruta de iscripcion3)
    this.router.navigate(['/inscripcion/paso3']); // Asegúrate de que esta ruta esté configurada
  }

   // Función para ir al paso anterior
   prevStep(): void {
      // Opcional: Guarda los datos actuales de los tutores antes de navegar hacia atrás
      this.inscripcionDataService.setTutors(this.tutorForm.value.tutors);
      this.router.navigate(['/inscripcion/paso1']); // Navega de regreso al paso 1
   }
}
