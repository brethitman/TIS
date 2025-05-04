import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // ✅ Añade este import
import { Router } from '@angular/router'; // ✅ Añade si necesitas navegar
// Servicios
import { InscripcionServicee } from '../../service/iscripcionn.service';
import { AreaService } from '../../service/area.service';

// Cambia estos imports
import { OlimpiadaByAreaService } from '../../service/OlimpiadaByArea.service';
import { IDOlimpiadabyArea, NivelCategoria } from '../../interfaces/olimpiadaAreaCategoria.interface';


// Interfaces
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
  //areasDisponibles: Area[] = [];
  boletaGenerada: BoletaPagoResponse | null = null;
  private destroy$ = new Subject<void>();
  areasDisponibles: IDOlimpiadabyArea[] = []; // Usa la interfaz correcta


  constructor(
    private fb: FormBuilder,
    private inscripcionService: InscripcionServicee,
    private areaService: AreaService,
    private route: ActivatedRoute, // ✅ Añade esto
    private router: Router, // ✅ Para navegación después de éxito/error
    private olimpiadaByAreaService: OlimpiadaByAreaService,

) { }

  ngOnInit(): void {

    this.initForm();
    this.cargarOlimpiadaId();
   // this.cargarAreas();

  }

  private cargarOlimpiadaId(): void {
    this.route.params.subscribe(params => {
      const olimpiadaId = params['id'];
      if (olimpiadaId) {
        this.cargarAreas(olimpiadaId);
      } else {
        console.error('No se encontró ID de olimpiada en la URL');
        // Puedes redirigir a una página de error
      }
    });
  }
  private initForm(): void {
    this.inscripcionForm = this.fb.group({
      fecha_inscripcion: ['', Validators.required],
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
        next: (areas) => this.areasDisponibles = areas,
        error: (error) => {
          console.error('Error cargando áreas:', error);
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
      curso: ['', Validators.required],
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
      telefono: ['', Validators.required]
    });
  }

  addTutor(): void { this.tutorsFormArray.push(this.createTutor()); }
  removeTutor(index: number): void { this.tutorsFormArray.removeAt(index); }

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
        if (selectedArea?.nivel_categorias?.length) { // ✅ Usa nivel_categorias
          nivelControl?.enable();
          nivelControl?.setValue(null);
        } else {
          nivelControl?.disable();
          nivelControl?.setValue(null);
        }
      });
  }

  removeArea(index: number): void { this.areasFormArray.removeAt(index); }
/*
  getNiveles(areaIndex: number): Nivele[] {
    return this.areasFormArray.at(areaIndex).get('area')?.value?.niveles || [];
  }
    */
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
      const payload = this.preparePayload();
      this.inscripcionService.crearInscripcion(payload).subscribe({
        next: (response) => this.handleSuccess(response),
        error: (error) => this.handleError(error)
      });
    } else {
      this.errorMessage = 'Por favor complete todos los campos requeridos.';
    }
  }

  private preparePayload(): InscripcionPayload {
    const formValue = this.inscripcionForm.value;
    return {
      ...formValue,
      olimpiada_id: Number(this.route.snapshot.params['id']),
      areas: formValue.areas.map((areaGroup: any) => ({
        area_id: areaGroup.area.id_area,
        nivelesCategoria: [areaGroup.nivel] // ⚠️ Solo envía el valor directamente
      }))
    };
  }
  private handleSuccess(response: InscripcionPostSuccessResponse): void {
    this.successMessage = '¡Inscripción exitosa!';
    this.boletaGenerada = response.inscripcion.boleta_pago;
    this.inscripcionForm.reset();
    this.initForm();

  }

  private handleError(error: any): void {
    console.error('Error en la inscripción:', error);
    this.errorMessage = 'Error al procesar la inscripción. Intente nuevamente.';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
