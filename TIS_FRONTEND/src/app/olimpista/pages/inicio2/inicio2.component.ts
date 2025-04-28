import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Inscripcion1Component } from '../../components/inscripcion1/inscripcion1.component';
import { Inscripcion2Component } from "../../components/inscripcion2/inscripcion2.component";
import { Inscripcion3Component } from "../../components/inscripcion3/inscripcion3.component";
import { InscripcionService } from '../../service/inscripcion.service';
import { CategoriaService } from '../../service/categoria.service';
import { NivelesCategoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-inicio2',
  templateUrl: './inicio2.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, Inscripcion1Component, Inscripcion2Component, Inscripcion3Component],
})
export class Inicio2Component {
  pasoActual = 1;
  formData: any = {
    tutor: {},
    olimpista: {},
    areaId: null
  };
  categoriaId: number | null = null;
  categoriaSeleccionada: NivelesCategoria | null = null;

  constructor(
    private inscripcionService: InscripcionService,
    private categoriaService: CategoriaService, // 👈 Inyectamos el servicio
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.formData.areaId = params['idArea'];
      this.formData.nombreCategoria = params['nombreCategoria'];
      this.formData.descripcionC = params['descripcionC'];
      this.formData.costo = params['costo'];
  
      console.log('Parámetros recibidos de Card:', this.formData);
    });
  }

  
  siguientePaso() {
    if (this.pasoActual < 3) {
      this.pasoActual++;
    }
  }

  anteriorPaso() {
    if (this.pasoActual > 1) {
      this.pasoActual--;
    }
  }

  updateTutorData(tutorData: any) {
    this.formData.tutor = tutorData;
    console.log('Datos del tutor actualizados:', this.formData.tutor);
  }

  updateOlimpistaData(olimpistaData: any) {
    this.formData.olimpista = olimpistaData;
    console.log('Datos del olimpista actualizados:', this.formData.olimpista);
  }

  updateAreaData(areaData: any) {
    this.formData.areaId = areaData;
    console.log('Área seleccionada:', this.formData.areaId);
  }

  submitInscripcion(formData: any) {
    console.log('Enviando inscripción:', formData);

    this.inscripcionService.crearInscripcionCompleta(formData).subscribe({
      next: (response) => {
        console.log('Inscripción exitosa', response);
        // Redirigir o mostrar mensaje de éxito
        alert('Inscripción completada con éxito!');
      },
      error: (err) => {
        console.error('Error en la inscripción', err);
        alert('Error al completar la inscripción. Por favor intenta nuevamente.');
      }
    });
  }
}