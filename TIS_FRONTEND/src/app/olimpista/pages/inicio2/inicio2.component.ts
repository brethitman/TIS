import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InscripcionService } from '../../service/inscripcion.service'; 
import { OlimpistaService } from '../../service/olimpista.service'; 
import { TutorService } from '../../service/tutor.service';
import { AreaService } from '../../service/area.service';
import { CategoriaService } from '../../service/categoria.service'; 
import { Inscripcione } from '../../interfaces/inscripcion.interface';
import { Olimpista } from '../../interfaces/inscripcion.interface';
import { Tutor } from '../../interfaces/tutor.interface';
import { Area } from '../../interfaces/area.interface';
import { NivelesCategoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-inicio2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio2.component.html',
  //styleUrls: ['./inicio1.component.css']
})
export class Inicio2Component implements OnInit {
  olimpista: Partial<Olimpista> = {};
  tutor: Partial<Tutor> = {};
  inscripcion: Partial<Inscripcione> = { 
    area: {} as Area, 
    nivel: {} as NivelesCategoria 
  };
  areas: Area[] = [];
  niveles: NivelesCategoria[] = [];
  cargando = {
    areas: false,
    niveles: false
  };

  constructor(
    private inscripcionService: InscripcionService,
    private olimpistaService: OlimpistaService,
    private tutorService: TutorService,
    private areaService: AreaService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.cargarAreas();
  }

  cargarAreas(): void {
    this.cargando.areas = true;
    this.areaService.getAreas().subscribe({
      next: (areas) => {
        this.areas = areas;
        this.cargando.areas = false;
      },
      error: (err) => {
        console.error('Error cargando áreas:', err);
        this.cargando.areas = false;
        alert('No se pudieron cargar las áreas. Intente nuevamente.');
      }
    });
  }

  cargarNivelesPorArea(): void {
    if (this.inscripcion.area?.id) {
      this.cargando.niveles = true;
      this.niveles = []; // Limpiar niveles anteriores
      
      this.categoriaService.getNivelesPorArea(this.inscripcion.area.id).subscribe({
        next: (niveles) => {
          this.niveles = niveles;
          this.cargando.niveles = false;
        },
        error: (err) => {
          console.error('Error cargando niveles:', err);
          this.cargando.niveles = false;
          alert('No se pudieron cargar los niveles para esta área.');
        }
      });
    }
  }

  async onSubmit(): Promise<void> {
    try {
      // Validación básica
      if (!this.inscripcion.area?.id) {
        throw new Error('Debe seleccionar un área');
      }

      // 1. Registrar tutor
      const tutor = await this.tutorService.create(this.tutor).toPromise();
      if (!tutor?.id) throw new Error('Error al registrar tutor');

      // 2. Registrar olimpista
      const olimpista = await this.olimpistaService.create({
        ...this.olimpista,
        tutorId: tutor.id
      }).toPromise();
      if (!olimpista?.id) throw new Error('Error al registrar olimpista');

      // 3. Crear inscripción
      await this.inscripcionService.createInscripcion({
        olimpistaId: olimpista.id,
        tutorId: tutor.id,
        areaId: this.inscripcion.area.id,
        nivelId: this.inscripcion.nivel?.id,
        fecha_inscripcion: new Date(),
        estado: 'pendiente'
      }).toPromise();

      alert('Inscripción registrada con éxito!');
      this.resetForm();

    } catch (error) {
      console.error('Error en el proceso:', error);
      alert(error instanceof Error ? error.message : 'Error desconocido');
    }
  }

  private resetForm(): void {
    this.olimpista = {};
    this.tutor = {};
    this.inscripcion = { area: {} as Area, nivel: {} as NivelesCategoria };
    this.niveles = [];
  }
}
