import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InscripcionService } from '../../service/inscripcion.service';
import { Area, Olimpista, Tutor } from '../../interfaces/inscripcion.interface';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';

@Component({
    selector: 'app-iscripcion1',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './iscripcion1.component.html',
})
export class Iscripcion1Component implements OnInit {
    inscripcionForm: FormGroup;
    areas: Area[] = [];
    isLoading = false;
    errorMessage: string | null = null;
    successMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private inscripcionService: InscripcionService
    ) {
        this.inscripcionForm = this.fb.group({
            olimpistas: this.fb.array([this.createOlimpistaForm()]),
            tutors: this.fb.array([this.createTutorForm()]),
            areas: [[], Validators.required] // Inicializamos como un array vacío y requerimos al menos uno
        });
    }

    ngOnInit(): void {
        this.loadAreas();
    }

    private loadAreas(): void {
        this.inscripcionService.getAreas().subscribe({
            next: (areas) => this.areas = areas,
            error: (err) => this.errorMessage = 'Error cargando áreas: ' + err.message
        });
    }

    get olimpistas(): FormArray {
        return this.inscripcionForm.get('olimpistas') as FormArray;
    }

    get tutors(): FormArray {
        return this.inscripcionForm.get('tutors') as FormArray;
    }

    get selectedAreaIds(): number[] | null {
        return this.inscripcionForm.get('areas')?.value;
    }

    createOlimpistaForm(): FormGroup {
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

    createTutorForm(): FormGroup {
        return this.fb.group({
            nombres: ['', Validators.required],
            apellidos: ['', Validators.required],
            ci: ['', Validators.required],
            correo: ['', [Validators.required, Validators.email]],
            telefono: ['', Validators.required]
        });
    }

    addOlimpista(): void {
        this.olimpistas.push(this.createOlimpistaForm());
    }

    removeOlimpista(index: number): void {
        this.olimpistas.removeAt(index);
    }

    addTutor(): void {
        this.tutors.push(this.createTutorForm());
    }

    removeTutor(index: number): void {
        this.tutors.removeAt(index);
    }

    getAreaName(areaId: number): string | undefined {
        return this.areas.find(a => a.id === areaId)?.nombre_area;
    }

    onSubmit(): void {
        if (this.inscripcionForm.invalid) {
            this.inscripcionForm.markAllAsTouched();
            return;
        }

        const formData = {
            ...this.inscripcionForm.value,
            areas: this.inscripcionForm.get('areas')?.value // Enviamos directamente el array de IDs de áreas
        };

        this.isLoading = true;
        this.errorMessage = null;
        this.successMessage = null;

        this.inscripcionService.crearInscripcionCompleta(formData)
            .pipe(
                finalize(() => this.isLoading = false)
            )
            .subscribe({
                next: () => {
                    this.successMessage = 'Inscripción realizada con éxito!';
                    this.inscripcionForm.reset();
                    this.olimpistas.clear();
                    this.tutors.clear();
                    this.addOlimpista();
                    this.addTutor();
                },
                error: (err) => {
                    this.errorMessage = err.message || 'Error al realizar la inscripción';
                }
            });
    }
  }
