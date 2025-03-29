import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { InscripcionService } from '../../service/inscripcion.service';
import { OlimpistaService } from '../../service/olimpista.service';
import { TutorService } from '../../service/tutor.service';
import { AreaService } from '../../service/area.service';
import { CategoriaService } from '../../service/categoria.service';
import { Inscripcione, Olimpista, Tutor, Area, NivelesCategoria } from '../../interfaces/inscripcion.interface';

@Component({
  selector: 'app-inscripcion-form',
  templateUrl: './inscripcion-form.component.html',
  styleUrls: ['./inscripcion-form.component.css'],
  imports: [CommonModule, FormsModule],
})
export class InscripcionFormComponent {
  olimpista: Partial<Olimpista> = {};
  tutor: Partial<Tutor> = {};
  inscripcion: Partial<Inscripcione> = { 
    area: {} as Area, 
    nivel: {} as NivelesCategoria 
  };
  areas: Area[] = [];
  niveles: NivelesCategoria[] = [];

  constructor(
    private inscripcionService: InscripcionService,
    private olimpistaService: OlimpistaService,
    private tutorService: TutorService,
    private areaService: AreaService,
    private categoriaService: CategoriaService
  ) {
    this.cargarAreas();
  }

  cargarAreas(): void {
    this.areaService.getAreas().subscribe({
      next: (areas) => this.areas = areas,
      error: (err) => console.error('Error cargando áreas', err)
    });
  }

  cargarNiveles(): void {
    if (this.inscripcion.area?.id) {
      this.categoriaService.getNivelesPorArea(this.inscripcion.area.id).subscribe({
        next: (niveles) => {
          this.niveles = niveles;
          this.inscripcion.nivel = {} as NivelesCategoria; // Resetear selección
        },
        error: (err) => console.error('Error cargando niveles', err)
      });
    } else {
      this.niveles = [];
    }
  }

  async onSubmit(): Promise<void> {
    try {
      // 1. Guardar tutor
      const tutor = await this.tutorService.create(this.tutor).toPromise();
      if (!tutor?.id) throw new Error('Error al registrar tutor');
      
      // 2. Guardar olimpista
      const olimpista = await this.olimpistaService.create({
        ...this.olimpista,
        tutorId: tutor.id
      }).toPromise();
      if (!olimpista?.id) throw new Error('Error al registrar olimpista');

      // 3. Validar área
      if (!this.inscripcion.area?.id) throw new Error('Debe seleccionar un área');

      // 4. Crear inscripción
      await this.inscripcionService.createInscripcion({
        olimpistaId: olimpista.id,
        tutorId: tutor.id,
        areaId: this.inscripcion.area.id,
        nivelId: this.inscripcion.nivel?.id,
        fecha_inscripcion: new Date(),
        estado: 'pendiente'
      }).toPromise();

      alert('Inscripción exitosa!');
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : 'Error en el proceso');
    }
  }
}