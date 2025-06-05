import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

// Servicios
import { InscripcionServicee } from '../../service/iscripcionn.service';
import { EmailService } from '../../service/email.service';
import { CursoAreaService } from '../../service/cursoAreaNivel.service';

// Interfaces
import { CursoWithAreas, AreaWithNiveles, NivelCategoria } from '../../interfaces/cursoAreaNiveles.interface';
import { InscripcionPayload, InscripcionPostSuccessResponse, BoletaPagoResponse } from '../../interfaces/inscripcion.types';

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

  cursosConAreas: CursoWithAreas[] = [];

  // Propiedades para la selección de curso y áreas filtradas
  cursoSeleccionado: CursoWithAreas | null = null;
  areasFiltradasPorCurso: AreaWithNiveles[] = [];
  olimpiadaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private inscripcionService: InscripcionServicee,
    private route: ActivatedRoute,
    private router: Router,
    private cursoAreaService: CursoAreaService,
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
        this.olimpiadaId = Number(olimpiadaId);
        this.cargarCursosConAreas(olimpiadaId);
      } else {
        console.error('No se encontró ID de olimpiada en la URL');
        this.errorMessage = 'No se encontró ID de olimpiada en la URL';
      }
    });
  }

  private initForm(): void {
    this.inscripcionForm = this.fb.group({
      estado: ['Pendiente', Validators.required],
      curso_id: [null, Validators.required], // Agregado el campo curso_id
      olimpistas: this.fb.array([], Validators.required),
      tutors: this.fb.array([], Validators.required),
      areas: this.fb.array([], Validators.required)
    });

    this.addOlimpista();
    this.addTutor();
    // No agregamos área automáticamente hasta que se seleccione un curso
  }

  private cargarCursosConAreas(olimpiadaId: string): void {
    this.cursoAreaService.getCursosConAreasByOlimpiada(Number(olimpiadaId))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (cursos) => {
          this.cursosConAreas = cursos;
          console.log('Cursos cargados:', cursos);
        },
        error: (error) => {
          console.error('Error cargando cursos con áreas:', error);
          this.errorMessage = 'Error al cargar los cursos y áreas disponibles';
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
    if (this.olimpistasFormArray.length > 1) {
      this.olimpistasFormArray.removeAt(index);
    } else {
      this.errorMessage = 'Debe haber al menos un olimpista';
      setTimeout(() => this.errorMessage = null, 3000);
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

  addTutor(): void {
    if (this.tutorsFormArray.length < 2) {
      this.tutorsFormArray.push(this.createTutor());
    } else {
      console.warn('Máximo 2 tutores permitidos');
      this.errorMessage = 'Solo se permiten máximo 2 tutores';
      setTimeout(() => this.errorMessage = null, 5000);
    }
  }

  removeTutor(index: number): void {
    if (this.tutorsFormArray.length > 1) {
      this.tutorsFormArray.removeAt(index);
    } else {
      this.errorMessage = 'Debe haber al menos un tutor';
      setTimeout(() => this.errorMessage = null, 3000);
    }
  }

  // Métodos para Áreas
  private createAreaFormGroup(): FormGroup {
    const areaGroup = this.fb.group({
      area: [null, Validators.required],
      nivel: [{ value: null, disabled: true }, Validators.required]
    });

    // Suscribirse a los cambios del área seleccionada
    areaGroup.get('area')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((selectedArea: AreaWithNiveles | null) => {
        const nivelControl = areaGroup.get('nivel');
        if (selectedArea && selectedArea.nivel_categorias && selectedArea.nivel_categorias.length > 0) {
          nivelControl?.enable();
          nivelControl?.setValue(null);
        } else {
          nivelControl?.disable();
          nivelControl?.setValue(null);
        }
      });

    return areaGroup;
  }

  addAreaToFormArray(): void {
    // Verificar si ya existe un área que no permite múltiples
    if (this.areasFormArray.controls.some(c => c.value.area && !c.value.area.permite_multiples_areas)) {
      this.areaWarning = `Ya tienes un área seleccionada que no permite combinación con otras.`;
      setTimeout(() => this.areaWarning = null, 5000);
      return;
    }

    // Verificar límite máximo de áreas
    if (this.areasFormArray.length >= 2) {
      this.errorMessage = 'Máximo 2 áreas permitidas.';
      setTimeout(() => this.errorMessage = null, 5000);
      return;
    }

    this.areasFormArray.push(this.createAreaFormGroup());
  }

  removeArea(index: number): void {
    this.areasFormArray.removeAt(index);
    this.areaWarning = null;
  }

  // Evento al seleccionar un curso
  onCursoSeleccionado(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const cursoId = Number(selectElement.value);

    this.cursoSeleccionado = this.cursosConAreas.find(c => c.id_curso === cursoId) || null;
    this.areasFiltradasPorCurso = this.cursoSeleccionado ? this.cursoSeleccionado.areas : [];

    // Actualizar el valor del curso_id en el formulario
    this.inscripcionForm.patchValue({ curso_id: cursoId });

    // Limpiar las áreas seleccionadas
    this.areasFormArray.clear();
    this.addAreaDisabled = false;
    this.areaWarning = null;

    // Agregar la primera área si hay un curso seleccionado
    if (this.cursoSeleccionado) {
      this.addAreaToFormArray();
    }
  }

  // Obtener los niveles disponibles para un área específica
  getNivelesParaAreaEnFormArray(areaControl: AbstractControl): NivelCategoria[] {
    if (areaControl instanceof FormGroup) {
      const area = areaControl.get('area')?.value;
      return area?.nivel_categorias || [];
    }
    return [];
  }

  // Validación del formulario y envío
  onSubmit(): void {
    this.inscripcionForm.markAllAsTouched();
    this.successMessage = null;
    this.errorMessage = null;
    this.boletaGenerada = null;

    // Validaciones específicas
    if (this.olimpistasFormArray.length === 0) {
      this.errorMessage = 'Debe registrar al menos un olimpista';
      return;
    }

    if (this.tutorsFormArray.length === 0 || this.tutorsFormArray.length > 2) {
      this.errorMessage = 'Debe registrar entre 1 y 2 tutores';
      return;
    }

    if (this.areasFormArray.length === 0) {
      this.errorMessage = 'Debe seleccionar al menos un área y su nivel.';
      return;
    }

    if (!this.cursoSeleccionado) {
      this.errorMessage = 'Debe seleccionar un curso';
      return;
    }

    // Validar áreas incompatibles
    const hasNonCombinable = this.areasFormArray.controls.some(
      c => c.value?.area && !c.value.area.permite_multiples_areas
    );

    if (hasNonCombinable && this.areasFormArray.length > 1) {
      this.errorMessage = 'No se pueden combinar áreas incompatibles';
      return;
    }

    // Validar que todas las áreas tengan nivel seleccionado
    const hasIncompleteAreas = this.areasFormArray.controls.some(
      c => !c.value?.area || !c.value?.nivel
    );

    if (hasIncompleteAreas) {
      this.errorMessage = 'Todas las áreas deben tener un nivel seleccionado';
      return;
    }

    if (this.inscripcionForm.valid) {
      const payload = this.preparePayload();
      console.log('Payload a enviar:', payload);

      this.inscripcionService.crearInscripcion(payload)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => this.handleSuccess(response),
          error: (error) => this.handleError(error)
        });
    } else {
      this.errorMessage = 'Por favor complete todos los campos requeridos y corrija los errores.';
      console.error('Formulario inválido:', this.inscripcionForm.errors);
      this.logFormErrors();
    }
  }

  private preparePayload(): InscripcionPayload {
    const formValue = this.inscripcionForm.value;
    console.log('Form Value antes de preparar payload:', formValue);

    const payload: InscripcionPayload = {
      estado: formValue.estado,
      curso_id: formValue.curso_id, // Incluir curso_id en el payload
      olimpistas: formValue.olimpistas,
      tutors: formValue.tutors,
      areas: formValue.areas.map((areaGroup: any) => {
        const areaId = areaGroup.area ? areaGroup.area.id_area : null;
        const nivelId = areaGroup.nivel ? areaGroup.nivel.id_nivel : null;

        if (areaId === null || areaId === undefined) {
          console.error('ERROR: El ID del área es nulo o indefinido', areaGroup.area);
          throw new Error('El ID del área no pudo ser obtenido.');
        }

        if (nivelId === null || nivelId === undefined) {
          console.error('ERROR: El ID del nivel es nulo o indefinido', areaGroup.nivel);
          throw new Error('El ID del nivel no pudo ser obtenido.');
        }

        return {
          area_id: areaId,
          nivelesCategoria: [nivelId]
        };
      })
    };

    console.log('Payload preparado:', payload);
    return payload;
  }

  private handleSuccess(response: InscripcionPostSuccessResponse): void {
    const correoTutor = this.tutorsFormArray.at(0).get('correo')?.value || '';
    this.successMessage = `¡Inscripción completada exitosamente! Se ha enviado un comprobante de pago al correo del tutor: ${correoTutor}. Por favor revise su bandeja de entrada.`;

    if (response && response.inscripcion && response.inscripcion.boleta_pago) {
      console.log('Boleta recibida:', response.inscripcion.boleta_pago);

      this.boletaGenerada = { ...response.inscripcion.boleta_pago };

      // Procesar la boleta para mostrar
      if (!this.boletaGenerada.fecha_generacion) {
        this.boletaGenerada.fecha_generacion = new Date().toISOString();
      }

      if (this.boletaGenerada.monto === null || this.boletaGenerada.monto === undefined) {
        this.boletaGenerada.monto = '0';
      } else if (typeof this.boletaGenerada.monto === 'number') {
        this.boletaGenerada.monto = String(this.boletaGenerada.monto);
      }

      console.log('Boleta procesada para mostrar:', this.boletaGenerada);

      // Enviar boleta por email al tutor
      if (correoTutor) {
        this.enviarBoletaPorEmail(this.boletaGenerada, correoTutor);
      }
    } else {
      console.error('La respuesta no contiene datos de boleta válidos:', response);
      this.errorMessage = 'Se procesó la inscripción pero no se recibieron datos de la boleta.';
    }

    // Resetear el formulario
    this.resetForm();
  }

  private enviarBoletaPorEmail(boletaData: BoletaPagoResponse, correo: string): void {
    this.emailService.enviarBoletaPorEmail(boletaData, correo)
      .subscribe({
        next: (response) => {
          console.log('Boleta enviada por email:', response);
        },
        
      });
  }

  private handleError(error: any): void {
    console.error('Error en la inscripción:', error);

    if (error.status === 400 && error.error) {
      // Manejar errores de validación del backend
      if (typeof error.error === 'string') {
        this.errorMessage = `Error de validación: ${error.error}`;
      } else if (error.error.message) {
        this.errorMessage = `Error de validación: ${error.error.message}`;
      } else {
        this.errorMessage = 'Error de validación en los datos enviados';
      }
    } else if (error.error && typeof error.error === 'string') {
      this.errorMessage = `Error al procesar la inscripción: ${error.error}`;
    } else if (error.message) {
      this.errorMessage = `Error al procesar la inscripción: ${error.message}`;
    } else {
      this.errorMessage = 'Error al procesar la inscripción. Intente nuevamente.';
    }
  }

  private resetForm(): void {
    this.inscripcionForm.reset();
    this.initForm();
    this.addAreaDisabled = false;
    this.areaWarning = null;
    this.cursoSeleccionado = null;
    this.areasFiltradasPorCurso = [];
  }

  private logFormErrors(): void {
    Object.keys(this.inscripcionForm.controls).forEach(key => {
      const control = this.inscripcionForm.get(key);
      if (control && control.errors) {
        console.error(`Error en ${key}:`, control.errors);
      }
    });
  }

  // Lógica para mostrar/ocultar el botón "Añadir Área"
  shouldShowAddAreaButton(): boolean {
    if (!this.cursoSeleccionado) {
      return false;
    }

    // Verificar si hay áreas no combinables seleccionadas
    const hasNonCombinableAreaSelected = this.areasFormArray.controls.some(
      c => {
        const areaValue = c.get('area')?.value;
        return areaValue && areaValue.permite_multiples_areas === 0;
      }
    );

    if (hasNonCombinableAreaSelected) {
      return false;
    }

    // Verificar límite máximo
    if (this.areasFormArray.length >= 2) {
      return false;
    }

    return true;
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
      return `Si eliges esta área "${areaName}", no puedes agregar más áreas.`;
    }

    return null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}