import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaService } from '../../service/area.service';
import { CategoriaService } from '../../service/categoria.service'; 
import { OlimpistaService } from '../../service/olimpista.service';
import { TutorService } from '../../service/tutor.service'; 
import { InscripcionService } from '../../service/inscripcion.service'; 
import { Area } from '../../interfaces/area.interface';
import { NivelesCategoria } from '../../interfaces/categoria.interface';
import { Olimpista } from '../../interfaces/olimpista-response';
import { Tutor } from '../../interfaces/inscripcion.interface';
import { Inscripcion } from '../../interfaces/inscripcion.interface';

@Component({
  selector: 'app-inicio2',
  templateUrl: './inicio2.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  //styleUrls: ['./inicio2.component.css']
})
export class Inicio2Component implements OnInit {
  inscripcionForm: FormGroup;
  areas: Area[] = [];
  niveles: NivelesCategoria[] = [];
  nivelSeleccionado: NivelesCategoria | null = null;
  cargandoAreas = true;
  cargandoNiveles = false;
  mensajeExito = '';
  mensajeError = '';

  constructor(
    private fb: FormBuilder,
    private areaService: AreaService,
    private categoriaService: CategoriaService,
    private olimpistaService: OlimpistaService,
    private tutorService: TutorService,
    private inscripcionService: InscripcionService
  ) {
    this.inscripcionForm = this.fb.group({
      // Datos del olimpista
      olimpistaNombres: ['', Validators.required],
      olimpistaApellidos: ['', Validators.required],
      olimpistaCi: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[0-9]*$')]],
      
      // Datos del tutor
      tutorNombres: ['', Validators.required],
      tutorApellidos: ['', Validators.required],
      tutorCi: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      
      // Datos de la inscripción
      areaId: ['', Validators.required],
      nivelId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarAreas();
  }

  cargarAreas(): void {
    this.cargandoAreas = true;
    this.areaService.getAreas().subscribe({
      next: (areas) => {
        this.areas = areas;
        this.cargandoAreas = false;
      },
      error: (err) => {
        console.error('Error al cargar áreas:', err);
        this.mensajeError = 'Error al cargar las áreas disponibles';
        this.cargandoAreas = false;
      }
    });
  }

  onAreaSeleccionada(): void {
    const areaId = this.inscripcionForm.get('areaId')?.value;
    if (areaId) {
      this.cargandoNiveles = true;
      this.inscripcionForm.get('nivelId')?.reset();
      this.nivelSeleccionado = null;
      
      this.categoriaService.getNivelesPorArea(areaId).subscribe({
        next: (niveles) => {
          this.niveles = niveles;
          this.cargandoNiveles = false;
        },
        error: (err) => {
          console.error('Error al cargar niveles:', err);
          this.mensajeError = 'Error al cargar las categorías disponibles';
          this.cargandoNiveles = false;
        }
      });
    }
  }

  onNivelSeleccionado(): void {
    const nivelId = this.inscripcionForm.get('nivelId')?.value;
    if (nivelId) {
      this.nivelSeleccionado = this.niveles.find(n => n.id === nivelId) || null; //ERROR EM id_nivel
    } else {
      this.nivelSeleccionado = null;
    }
  }

  onSubmit(): void {
    if (this.inscripcionForm.invalid) return;
  
    const formValue = this.inscripcionForm.value;
  
    this.olimpistaService.create({
      nombres: formValue.olimpistaNombres,
      apellidos: formValue.olimpistaApellidos,
      ci: formValue.olimpistaCi
    }).subscribe({
      next: (olimpista) => {
        this.tutorService.create({
          nombres: formValue.tutorNombres,
          apellidos: formValue.tutorApellidos,
          ci: formValue.tutorCi
        }).subscribe({
          next: (tutor) => {
            const inscripcionData = {
              olimpistaId: olimpista.id,  // <-- Usa olimpistaId en lugar de id_olimpista
              tutorId: tutor.id,
              areaId: formValue.areaId,
              nivelId: formValue.nivelId,
              fecha_inscripcion: new Date(),
              estado: 'Pendiente'
            };
            
            this.inscripcionService.createInscripcion(inscripcionData).subscribe({
              next: () => {
                console.log('Inscripción exitosa');
                this.inscripcionForm.reset();
              }
            });
          }
        });
      }
    });
  }
}
