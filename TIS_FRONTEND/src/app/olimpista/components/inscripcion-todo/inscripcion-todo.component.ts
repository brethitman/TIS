import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

// Servicios
import { InscripcionServicee } from '../../service/iscripcionn.service';
import { AreaService } from '../../service/area.service';
import { EmailService } from '../../service/email.service';
import { CursoAreaService } from '../../service/cursoAreaNivel.service';

// Interfaces
import { CursoWithAreas, AreaWithNiveles, NivelCategoria } from '../../interfaces/cursoAreaNiveles.interface';
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

  cursosConAreas: CursoWithAreas[] = [];
  areasDisponibles: AreaWithNiveles[] = [];

  cursoSeleccionadoId: number | null = null;
  areasDelCurso: AreaWithNiveles[] = [];
  areaSeleccionada: AreaWithNiveles | null = null;
  nivelesDelArea: NivelCategoria[] = [];




  constructor(
    private fb: FormBuilder,
    private inscripcionService: InscripcionServicee,
    private areaService: AreaService,
    private route: ActivatedRoute,
    private router: Router,
    private cursoAreaService: CursoAreaService,
    private emailService: EmailService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.cargarOlimpiadaId();
  }

  private cargarOlimpiadaId(): void {
    this.route.params.subscribe(params => {
      const olimpiadaId = params['id'];
      if (olimpiadaId) {
        this.cargarCursosConAreas(olimpiadaId);
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

  private cargarCursosConAreas(olimpiadaId: string): void {
    this.cursoAreaService.getCursosConAreasByOlimpiada(Number(olimpiadaId))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (cursos) => {
          this.cursosConAreas = cursos;
          // Extraer todas las áreas disponibles de todos los cursos
          this.areasDisponibles = this.cursosConAreas.flatMap(curso => curso.areas);
        },
        error: (error) => {
          console.error('Error cargando cursos con áreas:', error);
          this.errorMessage = 'Error al cargar las áreas disponibles';
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
  removeOlimpista(index: number): void { this.olimpistasFormArray.removeAt(index); }

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
  removeTutor(index: number): void { this.tutorsFormArray.removeAt(index); }

  // Métodos para Áreas
  private createArea(): FormGroup {
    return this.fb.group({
      area: [null, Validators.required],
      nivel: [{ value: null, disabled: true }, Validators.required]
    });
  }

  addArea(selectedArea?: AreaWithNiveles): void {
    if (selectedArea && selectedArea.permite_multiples_areas !== undefined) {
      if (!selectedArea.permite_multiples_areas) {
        this.areasFormArray.clear();
        this.addAreaDisabled = true;
        this.areaWarning = `"${selectedArea.nombre_area}" no permite combinación con otras áreas`;
      } else if (this.areasFormArray.controls.some(c => !c.value.area.permite_multiples_areas)) {
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
      .subscribe((selectedArea: AreaWithNiveles) => {
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
    const areaControl = this.areasFormArray.at(areaIndex).get('area');
    return areaControl?.value?.nivel_categorias || [];
  }

  // Submit
  onSubmit(): void {
    this.inscripcionForm.markAllAsTouched();
    this.successMessage = null;
    this.errorMessage = null;
    this.boletaGenerada = null;

    if (this.tutorsFormArray.length === 0 || this.tutorsFormArray.length > 2) {
      this.errorMessage = 'Debe registrar entre 1 y 2 tutores';
      return;
    }

    const hasNonCombinable = this.areasFormArray.controls.some(
      c => c.value?.area && !c.value.area.permite_multiples_areas
    );

    if (hasNonCombinable && this.areasFormArray.length > 1) {
      this.errorMessage = 'No se pueden combinar áreas incompatibles';
      return;
    }

    if (this.inscripcionForm.valid) {
      const payload = this.preparePayload();

      this.inscripcionService.crearInscripcion(payload)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => this.handleSuccess(response),
          error: (error) => this.handleError(error)
        });
    } else {
      this.errorMessage = 'Por favor complete todos los campos requeridos';
    }
  }

  private preparePayload(): InscripcionPayload {
    const formValue = this.inscripcionForm.value;
    console.log('Form Value:', formValue);
    return {
      ...formValue,
      olimpiada_id: Number(this.route.snapshot.params['id']),
      areas: formValue.areas.map((areaGroup: any) => {
        console.log('areaGroup.area:', areaGroup.area);
        console.log('areaGroup.nivel (antes de acceder a ID):', areaGroup.nivel);

        const nivelId = areaGroup.nivel ? areaGroup.nivel.id_nivel : null;

        if (nivelId === null || nivelId === undefined) {
          console.error('ERROR: El ID del nivel es nulo o indefinido después de intentar acceder a id_nivel', areaGroup.nivel);
        } else {
          console.log('ID de Nivel a enviar:', nivelId);
        }

        return {
          area_id: areaGroup.area.id_area,
          nivelesCategoria: [nivelId]
        };
      })
    };
  }

  private handleSuccess(response: InscripcionPostSuccessResponse): void {
    const correoOlimpista = this.olimpistasFormArray.at(0).get('correo')?.value || '';
    this.successMessage = `¡Inscripción completada exitosamente! Se ha enviado un comprobante de pago al correo: ${correoOlimpista}. Por favor revise su bandeja de entrada.`;

    if (response && response.inscripcion && response.inscripcion.boleta_pago) {
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
      console.log('Tipo del monto procesado:', typeof this.boletaGenerada.monto);

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
    this.errorMessage = 'Error al procesar la inscripción. Intente nuevamente.';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
      return `si eligue esta area "${areaName}" no puede agregar mas areas.`;
    }

    return null;
  }

  onCursoSeleccionado(event: any): void {
    this.cursoSeleccionadoId = Number(event.target.value);
    const curso = this.cursosConAreas.find(c => c.id_curso === this.cursoSeleccionadoId);
    this.areasDelCurso = curso ? curso.areas : [];
    this.areaSeleccionada = null;
    this.nivelesDelArea = [];
  }

  // Método cuando se selecciona un área
  onAreaSeleccionada(event: any): void {
    const areaId = Number(event.target.value);
    this.areaSeleccionada = this.areasDelCurso.find(a => a.id_area === areaId) || null;
    this.nivelesDelArea = this.areaSeleccionada?.nivel_categorias || [];
  }

  // Método para agregar el área seleccionada
  agregarAreaSeleccionada(): void {
    if (!this.areaSeleccionada) return;

    if (!this.areaSeleccionada.permite_multiples_areas) {
      this.areasFormArray.clear();
      this.addAreaDisabled = true;
      this.areaWarning = `"${this.areaSeleccionada.nombre_area}" no permite combinación con otras áreas`;
    }

    const areaGroup = this.fb.group({
      area: [this.areaSeleccionada, Validators.required],
      nivel: [null, Validators.required]
    });

    this.areasFormArray.push(areaGroup);
    this.areaSeleccionada = null;
    this.nivelesDelArea = [];
  }

}
