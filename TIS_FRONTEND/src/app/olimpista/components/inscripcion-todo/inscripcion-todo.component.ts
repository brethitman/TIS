import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
// Servicios
import { InscripcionServicee } from '../../service/iscripcionn.service';
import { AreaService } from '../../service/area.service';
import { EmailService } from '../../service/email.service';

// Imports para las olimpiadas por área
import { OlimpiadaByAreaService } from '../../service/OlimpiadaByArea.service';
import { IDOlimpiadabyArea, NivelCategoria } from '../../interfaces/olimpiadaAreaCategoria.interface';

// Interfaces
import { AreaInscripcion, InscripcionPayload, Olimpista, Tutor, InscripcionPostSuccessResponse, BoletaPagoResponse } from '../../interfaces/inscripcion.types';
import { Area, Nivele } from '../../interfaces/area.interface';
import { BoletaPagoComponent } from "../boleta-pago/boleta-pago.component";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-inscripcion-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BoletaPagoComponent],
  templateUrl: './inscripcion-todo.component.html',
})
export class InscripcionTodoComponent implements OnInit, OnDestroy {

  inscripcionForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  boletaGenerada: BoletaPagoResponse | null = null;
  private destroy$ = new Subject<void>();
  areasDisponibles: IDOlimpiadabyArea[] = [];
  olimpiadaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private inscripcionService: InscripcionServicee,
    private areaService: AreaService,
    private route: ActivatedRoute,
    private router: Router,
    private olimpiadaByAreaService: OlimpiadaByAreaService,
    private emailService: EmailService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.cargarOlimpiadaId();
  }

  private cargarOlimpiadaId(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = params['id'];
      if (id) {
        this.olimpiadaId = Number(id);
        this.cargarAreas(this.olimpiadaId);
      } else {
        console.error('No se encontró ID de olimpiada en la URL');
        this.errorMessage = 'No se pudo cargar la olimpiada. Por favor, inténtelo de nuevo.';
      }
    });
  }

  private initForm(): void {
    this.inscripcionForm = this.fb.group({
      estado: ['Pendiente', Validators.required],
      olimpistas: this.fb.array([], Validators.required),
      tutors: this.fb.array([], Validators.required),
      areas: this.fb.array([], Validators.required)
    });

    this.addOlimpista();
    this.addTutor();
    this.addArea();
  }

  private cargarAreas(olimpiadaId: number): void {
    this.olimpiadaByAreaService.getAreasByOlimpiadaId(olimpiadaId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (areas) => {
          this.areasDisponibles = areas;
          console.log('Áreas cargadas:', this.areasDisponibles);
        },
        error: (error) => {
          console.error('Error cargando áreas:', error);
          this.errorMessage = 'Error al cargar las áreas disponibles. Por favor, recargue la página.';
        }
      });
  }

  // Getters para FormArrays
  get olimpistasFormArray(): FormArray { return this.inscripcionForm.get('olimpistas') as FormArray; }
  get tutorsFormArray(): FormArray { return this.inscripcionForm.get('tutors') as FormArray; }
  get areasFormArray(): FormArray { return this.inscripcionForm.get('areas') as FormArray; }

  // Métodos para Olimpistas
  private createOlimpista(): FormGroup {
    return this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      ci: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      colegio: ['', Validators.required],
      departamento: ['', Validators.required],
      provincia: ['', Validators.required]
    });
  }

  addOlimpista(): void { this.olimpistasFormArray.push(this.createOlimpista()); }
  removeOlimpista(index: number): void { 
    if (this.olimpistasFormArray.length > 1) {
      this.olimpistasFormArray.removeAt(index);
    } else {
      alert('Debe haber al menos un olimpista');
    }
  }

  // Métodos para Tutores
  private createTutor(): FormGroup {
    return this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      ci: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      contacto: ['', Validators.required]
    });
  }

  addTutor(): void { this.tutorsFormArray.push(this.createTutor()); }
  removeTutor(index: number): void { 
    if (this.tutorsFormArray.length > 1) {
      this.tutorsFormArray.removeAt(index);
    } else {
      alert('Debe haber al menos un tutor');
    }
  }

  // Métodos para Áreas
  private createArea(): FormGroup {
    return this.fb.group({
      area: [null, Validators.required],
      nivel: [{ value: null, disabled: true }, Validators.required]
    });
  }

  addArea(): void {
    const areaGroup = this.createArea();
    this.setupAreaListeners(areaGroup);
    this.areasFormArray.push(areaGroup);
  }

  private setupAreaListeners(areaGroup: FormGroup): void {
    areaGroup.get('area')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((selectedArea: IDOlimpiadabyArea) => {
        const nivelControl = areaGroup.get('nivel');
        if (selectedArea?.nivel_categorias?.length) {
          nivelControl?.enable();
          nivelControl?.setValue(null);
        } else {
          nivelControl?.disable();
          nivelControl?.setValue(null);
        }
      });
  }

  removeArea(index: number): void { 
    if (this.areasFormArray.length > 1) {
      this.areasFormArray.removeAt(index);
    } else {
      alert('Debe haber al menos un área');
    }
  }

  getNiveles(areaIndex: number): NivelCategoria[] {
    const areaControl = this.areasFormArray.at(areaIndex).get('area');
    return areaControl?.value?.nivel_categorias || [];
  }

  // Submit
  onSubmit(): void {
    this.inscripcionForm.markAllAsTouched();
    this.successMessage = null;
    this.errorMessage = null;
    this.boletaGenerada = null;

    if (this.inscripcionForm.valid) {
      console.log('Formulario válido, preparando payload...');
      try {
        const payload = this.preparePayload();
        console.log('Payload preparado:', payload);
        this.inscripcionService.crearInscripcion(payload).subscribe({
          next: (response) => this.handleSuccess(response),
          error: (error) => this.handleError(error)
        });
      } catch (error) {
        console.error('Error al preparar el payload:', error);
        this.errorMessage = 'Error al preparar los datos de inscripción. Por favor, inténtelo de nuevo.';
      }
    } else {
      console.error('Formulario inválido:', this.getFormValidationErrors());
      this.errorMessage = 'Por favor complete todos los campos requeridos.';
    }
  }

  // Método para depuración
  private getFormValidationErrors(): string[] {
    const errors: string[] = [];
    
    // Verificar olimpistas
    (this.olimpistasFormArray.controls as FormGroup[]).forEach((control, index) => {
      Object.keys(control.value).forEach(key => {
        const controlErrors = control.get(key)?.errors;
        if (controlErrors) {
          errors.push(`Olimpista #${index + 1} - ${key}: ${JSON.stringify(controlErrors)}`);
        }
      });
    });
    
    // Verificar tutores
    (this.tutorsFormArray.controls as FormGroup[]).forEach((control, index) => {
      Object.keys(control.value).forEach(key => {
        const controlErrors = control.get(key)?.errors;
        if (controlErrors) {
          errors.push(`Tutor #${index + 1} - ${key}: ${JSON.stringify(controlErrors)}`);
        }
      });
    });
    
    // Verificar áreas
    (this.areasFormArray.controls as FormGroup[]).forEach((control, index) => {
      Object.keys(control.value).forEach(key => {
        const controlErrors = control.get(key)?.errors;
        if (controlErrors) {
          errors.push(`Área #${index + 1} - ${key}: ${JSON.stringify(controlErrors)}`);
        }
      });
    });
    
    return errors;
  }

  private preparePayload(): InscripcionPayload {
    if (!this.olimpiadaId) {
      throw new Error('No se ha cargado el ID de la olimpiada');
    }
    
    // Obtener el valor del formulario
    const formValue = this.inscripcionForm.getRawValue(); // Usamos getRawValue() para incluir controles deshabilitados
    
    // Transformar los datos de las áreas al formato esperado por el backend
    const areasTransformadas = formValue.areas.map((areaGroup: any) => {
      if (!areaGroup.area || !areaGroup.nivel) {
        throw new Error('Área o nivel no seleccionado');
      }
      
      return {
        area_id: areaGroup.area.id_area,
        nivelesCategoria: [areaGroup.nivel]
      };
    });
    
    // Construir el payload final
    // Asumimos que InscripcionPayload acepta una propiedad olimpiada_id
    // Si no es así, necesitaremos actualizar la interfaz
    const payload = {
      olimpiada_id: this.olimpiadaId,
      estado: formValue.estado,
      olimpistas: formValue.olimpistas,
      tutors: formValue.tutors,
      areas: areasTransformadas
    } as InscripcionPayload;
    
    return payload;
  }

  private handleSuccess(response: InscripcionPostSuccessResponse): void {
    console.log('Respuesta exitosa:', response);
    
    const correoOlimpista = this.olimpistasFormArray.at(0).get('correo')?.value || '';
    this.successMessage = `¡Inscripción completada exitosamente! Se ha enviado un comprobante de pago al correo: ${correoOlimpista}. Por favor revise su bandeja de entrada.`;
    
    if (response && response.inscripcion && response.inscripcion.boleta_pago) {
      console.log('Boleta recibida:', response.inscripcion.boleta_pago);
      
      // Clonar la boleta para evitar modificar la original
      this.boletaGenerada = { ...response.inscripcion.boleta_pago };
      
      // Asegurar que la fecha sea válida
      if (!this.boletaGenerada.fecha_generacion) {
        this.boletaGenerada.fecha_generacion = new Date().toISOString();
      }
      
      // Asegurar que el monto tenga un valor válido y sea string
      if (this.boletaGenerada.monto === null || this.boletaGenerada.monto === undefined) {
        this.boletaGenerada.monto = '0';
      } else if (typeof this.boletaGenerada.monto === 'number') {
        // Si el monto viene como número, convertirlo a string para consistencia
        this.boletaGenerada.monto = String(this.boletaGenerada.monto);
      }
      
      console.log('Boleta procesada para mostrar:', this.boletaGenerada);
      
      // Enviar el correo electrónico con la boleta
      if (correoOlimpista) {
        this.enviarBoletaPorEmail(this.boletaGenerada, correoOlimpista);
      }
    } else {
      console.error('La respuesta no contiene datos de boleta válidos:', response);
      this.errorMessage = 'Se procesó la inscripción pero no se recibieron datos de la boleta.';
    }
    
    // Resetear el formulario y reinicializarlo
    this.inscripcionForm.reset();
    this.initForm();
  }

  private enviarBoletaPorEmail(boletaData: BoletaPagoResponse, correo: string): void {
    this.emailService.enviarBoletaPorEmail(boletaData, correo)
      .subscribe({
        next: (response) => {
          console.log('Boleta enviada por email:', response);
        },
        error: (error) => {
          console.error('Error al enviar boleta por email:', error);
          this.errorMessage = 'La inscripción fue exitosa, pero hubo un problema al enviar la boleta por email. Por favor contacte a soporte.';
        }
      });
  }

  private handleError(error: any): void {
    console.error('Error en la inscripción:', error);
    
    // Mejorar el manejo de errores para proporcionar información más específica
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.errorMessage = 'No se pudo conectar con el servidor. Por favor, verifique su conexión.';
      } else if (error.status === 400) {
        this.errorMessage = 'Datos de inscripción inválidos. Por favor, verifique la información ingresada.';
      } else if (error.status === 500) {
        this.errorMessage = 'Error interno del servidor. Por favor, inténtelo más tarde.';
      } else {
        this.errorMessage = `Error ${error.status}: ${error.error?.message || error.statusText || 'Error desconocido'}`;
      }
    } else {
      this.errorMessage = 'Error al procesar la inscripción. Intente nuevamente.';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}