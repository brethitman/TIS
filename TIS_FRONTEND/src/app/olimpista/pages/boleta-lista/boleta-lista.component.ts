import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { VisualizacionService } from '../../service/Visualizacion.service';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-boleta-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boleta-lista.component.html'
})
export class BoletaListaComponent implements OnInit {
  
  students = [
    {
      id: 1,
      name: 'Colacanuto Cornamenta',
      course: '6to de Secundaria',
      area1: 'Quimica',
      category1: 'Basico',
      area2: '',
      category2: ''
    },
    {
      id: 2,
      name: 'Barbara Sprouse',
      course: '5to de Secundaria',
      area1: 'Fisica',
      category1: 'Avanzado',
      area2: 'Quimica',
      category2: 'Intermedio'
    }
  ];
   
  @Input() olimpista: any[][] = [];
  @Input() tutor: any[][] = [];
  @Input() areas: any[][] = [];

  constructor(
    private service: VisualizacionService,
    private location: Location,
  ) { }
  ngOnInit() {
    this.areas = JSON.parse(localStorage.getItem('areasInscripcion') || '[]');
    this.olimpista = JSON.parse(localStorage.getItem('olimpistas') || '[]');
    this.tutor = JSON.parse(localStorage.getItem('tutores') || '[]');

    console.log('Áreas recibidas:', this.areas);
    console.log('Olimpistas recibidos:', this.olimpista);
    console.log('Tutores recibidos:', this.tutor);
    const storedId = localStorage.getItem('selectedOlimpiadaId');
  
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
 
 volverAVisualizacion() {
    // Opción 1: Volver a la página anterior (recomendado)
    this.location.back();
    
    // Opción 2: Navegar a una ruta específica (si necesitas ir a una ruta concreta)
    // this.router.navigate(['/ruta-especifica']);
  }

}