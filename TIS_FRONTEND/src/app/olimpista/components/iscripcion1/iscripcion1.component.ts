import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importa Router para la navegación
import { InscripcionDataService } from '../../service/inscripcion-data-service.service';
import { Olimpista } from '../../interfaces/inscripcion.interface';
import { BotonExelComponent } from "../boton-exel/boton-exel.component"; // Ajusta la ruta según donde tengas tus interfaces

@Component({
  selector: 'app-iscripcion1',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BotonExelComponent],
  templateUrl: './iscripcion1.component.html',
  // Removido: styleUrls, providers (si los tenías)
})
export class Iscripcion1Component implements OnInit {
  olimpistaForm: FormGroup; // Solo necesitamos el formulario para los olimpistas
  errorMessage: string | null = null;
  // Removido: areas, isLoading, successMessage (se manejan en el paso final)

  constructor(
    private fb: FormBuilder,
    private router: Router, // Inyecta Router
    private inscripcionDataService: InscripcionDataService // Inyecta el servicio de datos
    // Removido: private inscripcionService: InscripcionService
  ) {
    // Inicializa el formulario solo con el FormArray de olimpistas
    this.olimpistaForm = this.fb.group({
      olimpistas: this.fb.array([]) // Inicialmente vacío
    });
  }

  ngOnInit(): void {
    // Carga los datos guardados si el usuario regresa a este paso
    const savedOlimpistas = this.inscripcionDataService.getOlimpistas();
    if (savedOlimpistas.length > 0) {
      savedOlimpistas.forEach(olimpista => {
        this.olimpistas.push(this.createOlimpistaForm(olimpista));
      });
    } else {
      // Agrega un formulario de olimpista por defecto si no hay datos guardados
      this.addOlimpista();
    }
  }

  get olimpistas(): FormArray {
    return this.olimpistaForm.get('olimpistas') as FormArray;
  }

  // Mantenemos la función para crear un FormGroup de olimpista
  createOlimpistaForm(olimpista?: Olimpista): FormGroup {
    return this.fb.group({
      nombres: [olimpista?.nombres || '', Validators.required],
      apellidos: [olimpista?.apellidos || '', Validators.required],
      ci: [olimpista?.ci || '', Validators.required],
      fecha_nacimiento: [olimpista?.fecha_nacimiento || '', Validators.required],
      correo: [olimpista?.correo || '', [Validators.required, Validators.email]],
      telefono: [olimpista?.telefono || '', Validators.required],
      colegio: [olimpista?.colegio || '', Validators.required],
      curso: [olimpista?.curso || '', Validators.required],
      departamento: [olimpista?.departamento || '', Validators.required],
      provincia: [olimpista?.provincia || '', Validators.required]
    });
  }

  addOlimpista(): void {
    this.olimpistas.push(this.createOlimpistaForm());
  }

  removeOlimpista(index: number): void {
     // Solo permitir eliminar si hay más de un olimpista
    if (this.olimpistas.length > 1) {
        this.olimpistas.removeAt(index);
    } else {
         // Opcional: mostrar un mensaje si se intenta eliminar el único olimpista
        // this.errorMessage = 'Debe haber al menos un olimpista.';
    }
  }

  // Renombramos onSubmit a nextStep
  nextStep(): void {
    // Marca todos los campos como tocados para mostrar validación
    this.olimpistaForm.markAllAsTouched();

    // Verifica si el formulario es inválido o si no hay ningún olimpista
    if (this.olimpistaForm.invalid || this.olimpistas.length === 0) {
       this.errorMessage = 'Por favor, complete todos los campos requeridos para los olimpistas.';
       console.log('Formulario inválido:', this.olimpistaForm.errors, this.olimpistas.errors);
       return;
    }

    this.errorMessage = null; // Limpia cualquier error previo si la validación pasa

    // Guarda los datos de los olimpistas en el servicio compartido
    this.inscripcionDataService.setOlimpistas(this.olimpistaForm.value.olimpistas);

    // Navega al siguiente paso (ruta de iscripcion2)
    this.router.navigate(['/inscripcion/paso2']); // Asegúrate de que esta ruta esté configurada
  }

  // Removido: tutors, areasFormArray, createTutorForm, createAreaForm, addTutor, removeTutor, addArea, removeArea, getAreaName, onSubmit (renombrado a nextStep)
}
