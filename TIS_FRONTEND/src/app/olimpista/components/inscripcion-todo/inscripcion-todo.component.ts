import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
// Servicios
import { InscripcionServicee } from '../../service/iscripcionn.service';
import { AreaService } from '../../service/area.service';
import { EmailService } from '../../service/email.service';
import { OlimpiadaByAreaService } from '../../service/OlimpiadaByArea.service';
// Interfaces
import { IDOlimpiadabyArea, NivelCategoria } from '../../interfaces/olimpiadaAreaCategoria.interface';
import { AreaInscripcion, InscripcionPayload, Olimpista, Tutor, InscripcionPostSuccessResponse, BoletaPagoResponse } from '../../interfaces/inscripcion.types';
import { Area, Nivele } from '../../interfaces/area.interface';
import { BoletaPagoComponent } from "../boleta-pago/boleta-pago.component";

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
  addAreaDisabled = false;
  areaWarning: string | null = null;
  
  private destroy$ = new Subject<void>();
  areasDisponibles: IDOlimpiadabyArea[] = [];

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
    this.route.params.subscribe(params => {
      const olimpiadaId = params['id'];
      if (olimpiadaId) {
        this.cargarAreas(olimpiadaId);
      } else {
        console.error('No se encontró ID de olimpiada en la URL');
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

  private cargarAreas(olimpiadaId: string): void {
    this.olimpiadaByAreaService.getAreasByOlimpiadaId(Number(olimpiadaId))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (areas) => {
          this.areasDisponibles = areas;
          console.log('Áreas cargadas:', areas);
        },
        error: (error) => {
          console.error('Error cargando áreas:', error);
          this.errorMessage = 'Error al cargar las áreas disponibles';
        }
      });
  }

  // Getters para FormArrays
  get olimpistasFormArray(): FormArray { 
    return this.inscripcionForm.get('olimpistas') as FormArray; 
  }
  
  get tutorsFormArray(): FormArray { 
    return this.inscripcionForm.get('tutors') as FormArray; 
  }
  
  get areasFormArray(): FormArray { 
    return this.inscripcionForm.get('areas') as FormArray; 
  }

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

  addOlimpista(): void { 
    this.olimpistasFormArray.push(this.createOlimpista()); 
  }
  
  removeOlimpista(index: number): void { 
    this.olimpistasFormArray.removeAt(index); 
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

  addTutor(): void { 
    this.tutorsFormArray.push(this.createTutor()); 
  }
  
  removeTutor(index: number): void { 
    this.tutorsFormArray.removeAt(index); 
  }

  // Métodos para Áreas
  private createArea(): FormGroup {
    return this.fb.group({
      area: [null, Validators.required],
      nivel: [{ value: null, disabled: true }, Validators.required]
    });
  }

  addArea(selectedArea?: IDOlimpiadabyArea): void {
    if (selectedArea && selectedArea.permite_multiples_areas !== undefined) {
      if (!selectedArea.permite_multiples_areas) {
        this.areasFormArray.clear();
        this.addAreaDisabled = true;
        this.areaWarning = `"${selectedArea.nombre_area}" no permite combinación con otras áreas`;
      } else if (this.areasFormArray.controls.some(c => !c.value.area?.permite_multiples_areas)) {
        return;
      }

      const areaGroup = this.createArea();
      areaGroup.patchValue({ area: selectedArea });
      this.setupAreaListeners(areaGroup);
      this.areasFormArray.push(areaGroup);
    } else {
      const areaGroup = this.createArea();
      this.setupAreaListeners(areaGroup);
      this.areasFormArray.push(areaGroup);
    }
  }

  private setupAreaListeners(areaGroup: FormGroup): void {
    areaGroup.get('area')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((selectedArea: IDOlimpiadabyArea | null) => {
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
    const removedArea = this.areasFormArray.at(index).value?.area;
    this.areasFormArray.removeAt(index);

    if (removedArea && !removedArea.permite_multiples_areas) {
      this.addAreaDisabled = false;
      this.areaWarning = null;
    } else if (this.areasFormArray.length === 0) {
      this.addAreaDisabled = false;
      this.areaWarning = null;
    }
  }

  getNiveles(areaIndex: number): NivelCategoria[] {
    const areaControl = this.areasFormArray.at(areaIndex)?.get('area');
    return areaControl?.value?.nivel_categorias || [];
  }

  // Submit
  onSubmit(): void {
  this.inscripcionForm.markAllAsTouched();
  this.successMessage = null;
  this.errorMessage = null;
  this.boletaGenerada = null;

  console.log('Estado del formulario:', this.inscripcionForm.valid);
  console.log('Errores del formulario:', this.getFormErrors());
  console.log('Valor del formulario:', this.inscripcionForm.value);

  // Validar áreas no combinables
  const hasNonCombinable = this.areasFormArray.controls.some(
    c => c.value?.area && !c.value.area.permite_multiples_areas
  );

  if (hasNonCombinable && this.areasFormArray.length > 1) {
    this.errorMessage = 'No se pueden combinar áreas incompatibles';
    return;
  }

  if (this.inscripcionForm.valid) {
    try {
      const payload = this.preparePayload();
      console.log('Payload preparado:', payload);

      // Validar que el payload esté bien formado
      if (!payload.olimpiada_id) {
        this.errorMessage = 'Error: ID de olimpiada no encontrado';
        return;
      }

      if (!payload.areas.length) {
        this.errorMessage = 'Error: Debe seleccionar al menos un área';
        return;
      }

      this.inscripcionService.crearInscripcion(payload)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            console.log('Respuesta exitosa:', response);
            this.handleSuccess(response);
          },
          error: (error) => {
            console.error('Error de la API:', error);
            this.handleError(error);
          }
        });
    } catch (error) {
      console.error('Error preparando payload:', error);
      this.errorMessage = 'Error al preparar los datos: ' + (error as Error).message;
    }
  } else {
    this.errorMessage = 'Por favor complete todos los campos requeridos';
    console.log('Errores específicos del formulario:', this.getFormErrors());
  }
}

  private preparePayload(): InscripcionPayload {
  const formValue = this.inscripcionForm.value;
  const olimpiadaId = this.route.snapshot.params['id'];
  
  // Validar que el olimpiadaId existe
  if (!olimpiadaId) {
    throw new Error('ID de olimpiada no encontrado');
  }
  
  // Validar y preparar las áreas
  const areas = formValue.areas.map((areaGroup: any) => {
    if (!areaGroup.area || !areaGroup.area.id_area) {
      throw new Error('Área no seleccionada correctamente');
    }
    
    if (!areaGroup.nivel || !areaGroup.nivel.id_nivel) {
      throw new Error('Nivel no seleccionado correctamente');
    }
    
    return {
      area_id: areaGroup.area.id_area,
      nivelesCategoria: [areaGroup.nivel.id_nivel] // Usar id_nivel en lugar del objeto completo
    };
  });
  
  return {
    olimpiada_id: Number(olimpiadaId),
    estado: formValue.estado,
    olimpistas: formValue.olimpistas,
    tutors: formValue.tutors,
    areas: areas
  };
}

  private handleSuccess(response: InscripcionPostSuccessResponse): void {
    const correoOlimpista = this.olimpistasFormArray.at(0)?.get('correo')?.value || '';
    this.successMessage = `¡Inscripción completada exitosamente! Se ha enviado un comprobante de pago al correo: ${correoOlimpista}. Por favor revise su bandeja de entrada.`;

    if (response?.inscripcion?.boleta_pago) {
      console.log('Boleta recibida:', response.inscripcion.boleta_pago);

      this.boletaGenerada = { ...response.inscripcion.boleta_pago };

      if (!this.boletaGenerada.fecha_generacion) {
        this.boletaGenerada.fecha_generacion = new Date().toISOString();
      }

      if (this.boletaGenerada.monto === null || this.boletaGenerada.monto === undefined) {
        this.boletaGenerada.monto = '0';
      } else if (typeof this.boletaGenerada.monto === 'number') {
        this.boletaGenerada.monto = String(this.boletaGenerada.monto);
      }

      console.log('Boleta procesada para mostrar:', this.boletaGenerada);

      if (correoOlimpista) {
        this.enviarBoletaPorEmail(this.boletaGenerada, correoOlimpista);
      }
    } else {
      console.error('La respuesta no contiene datos de boleta válidos:', response);
      this.errorMessage = 'Se procesó la inscripción pero no se recibieron datos de la boleta.';
    }

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
  
  if (error.status === 422) {
    // Errores de validación
    if (error.error && error.error.errors) {
      const validationErrors = error.error.errors;
      let errorMessages: string[] = [];
      
      // Procesar errores de validación específicos
      Object.keys(validationErrors).forEach(key => {
        if (Array.isArray(validationErrors[key])) {
          errorMessages = errorMessages.concat(validationErrors[key]);
        }
      });
      
      this.errorMessage = 'Errores de validación:\n' + errorMessages.join('\n');
    } else {
      this.errorMessage = 'Datos inválidos. Por favor revise la información ingresada.';
    }
  } else if (error.status === 500) {
    this.errorMessage = 'Error interno del servidor. Por favor verifique que todos los datos sean correctos e intente nuevamente.';
  } else if (error.status === 400) {
    this.errorMessage = 'Datos inválidos. Por favor revise la información ingresada.';
  } else if (error.status === 0) {
    this.errorMessage = 'No se pudo conectar con el servidor. Verifique su conexión a internet.';
  } else {
    this.errorMessage = 'Error al procesar la inscripción. Intente nuevamente.';
  }

  // Log adicional para debugging
  if (error.error) {
    console.error('Detalles del error:', error.error);
  }
}

  shouldShowAddAreaButton(): boolean {
    if (this.areasFormArray.length === 0) {
      return true;
    }

    const hasNonMultipleArea = this.areasFormArray.controls.some(control => {
      const area = control.value?.area;
      return area && !area.permite_multiples_areas;
    });

    return !hasNonMultipleArea;
  }

  getAreaSelectionMessage(): string | null {
    if (this.areasFormArray.length === 0) {
      return null;
    }

    const nonMultipleArea = this.areasFormArray.controls.find(control => {
      const area = control.value?.area;
      return area && !area.permite_multiples_areas;
    });

    if (nonMultipleArea) {
      const areaName = nonMultipleArea.value?.area?.nombre_area;
      return `Si elige el área "${areaName}" no puede agregar más áreas.`;
    }

    return null;
  }

  // Método auxiliar para debugging - obtener errores del formulario
  private getFormErrors(): any {
    let formErrors: any = {};

    Object.keys(this.inscripcionForm.controls).forEach(key => {
      const controlErrors = this.inscripcionForm.get(key)?.errors;
      if (controlErrors) {
        formErrors[key] = controlErrors;
      }
    });

    return formErrors;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}