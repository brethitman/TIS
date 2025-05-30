import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { VisualizacionService } from '../../service/Visualizacion.service';


@Component({
  selector: 'app-boleta-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boleta-lista.component.html'
})
export class BoletaListaComponent implements OnInit {

  inscripciones: any[] = [];
  areasInscripcion: any[] = [];
  olimpistas: any[] = [];
  tutores: any[] = [];

  @Input() olimpista: any[][] = [];
  @Input() tutor: any[][] = [];
  @Input() areas: any[][] = [];

  constructor(private service: VisualizacionService) { }

  ngOnInit() {
    this.areas = JSON.parse(localStorage.getItem('areasInscripcion') || '[]');
    this.olimpista = JSON.parse(localStorage.getItem('olimpistas') || '[]');
    this.tutor = JSON.parse(localStorage.getItem('tutores') || '[]');

    console.log('Áreas recibidas:', this.areas);
    console.log('Olimpistas recibidos:', this.olimpista);
    console.log('Tutores recibidos:', this.tutor);

    this.inscripciones = this.olimpistas.map((olimpista, index) => {
      const areas = this.areasInscripcion[index] || {};
      return {
        id: index + 1,
        name: `${olimpista[0]} ${olimpista[1]}`, // nombres + apellidos
        course: olimpista[6], // colegio (ajusta según tu estructura real)
        area1: this.getAreaName(areas[0]?.area_id),
        category1: this.getCategoryName(areas[0]?.nivelesCategoria?.[0]),
        area2: areas[1] ? this.getAreaName(areas[1]?.area_id) : '',
        category2: areas[1] ? this.getCategoryName(areas[1]?.nivelesCategoria?.[0]) : ''
      };
    });

    console.log('Inscripciones procesadas:', this.inscripciones);
  }

  // Métodos auxiliares para obtener nombres de áreas y categorías
  private getAreaName(areaId: number): string {
    // Implementa lógica para mapear ID de área a nombre
    // Esto depende de cómo tengas almacenadas las áreas
    return `Área ${areaId}`; // Ejemplo básico
  }

  private getCategoryName(categoryId: number): string {
    // Implementa lógica para mapear ID de categoría a nombre
    return `Categoría ${categoryId}`; // Ejemplo básico
  }

  inscribir() {
    const inscripcionData = {
      estado: 'Pendiente',
      olimpistas: this.olimpista.map(olimpista => {
        // Transformar fecha de nacimiento si está en formato DD/MM/YYYY
        const fechaParts = olimpista[3].split('/'); // Divide "10/5/2004" en partes
        const fechaValida = fechaParts.length === 3 ?
          `${fechaParts[2]}-${fechaParts[1].padStart(2, '0')}-${fechaParts[0].padStart(2, '0')}` :
          olimpista[3]; // Si ya está bien, la mantiene

        // Verificar si la fecha es válida antes de usar new Date()
        const fechaNacimiento = new Date(fechaValida);
        const fechaFinal = isNaN(fechaNacimiento.getTime()) ? null : fechaNacimiento.toISOString().split('T')[0];

        return {
          nombres: olimpista[0],
          apellidos: olimpista[1],
          ci: String(olimpista[2]),
          fecha_nacimiento: fechaFinal, // Fecha formateada o `null`
          correo: olimpista[4],
          telefono: String(olimpista[5]),
          colegio: olimpista[6],
          departamento: olimpista[7],
          provincia: olimpista[8]
        };
      }),
      tutors: this.tutor.map(tutor => ({
        nombres: tutor[0],
        apellidos: tutor[1],
        ci: String(tutor[2]),
        correo: tutor[3],
        telefono: String(tutor[4])
      })),
      areas: this.areas
    };

    console.log('Datos que se enviarán:', JSON.stringify(inscripcionData, null, 2));

    this.service.storeInscripcion(inscripcionData).subscribe(
      response => {
        console.log('Inscripción exitosa:', response);
        alert('Inscripción realizada correctamente');
      },
      error => {
        console.error('Error al inscribir:', error);
        alert('Hubo un problema con la inscripción');
      }
    );
  }

}