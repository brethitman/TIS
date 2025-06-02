import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { VisualizacionService } from '../../service/Visualizacion.service';
import { BoletaPagoResponse } from '../../interfaces/inscripcion.types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-boleta-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boleta-lista.component.html'
})
export class BoletaListaComponent implements OnInit {

  @Input() olimpista: any[][] = [];
  @Input() tutor: any[][] = [];
  @Input() areas: any[][] = [];
   @Input() inscripciones: any[][] = [];
  
  boletaTutor: any[] = [];


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

  boletaPago: BoletaPagoResponse | null = null;
  mensaje: string = "";

  constructor(private service: VisualizacionService) { }

  ngOnInit() {
    this.areas = JSON.parse(localStorage.getItem('areasInscripcion') || '[]');
    this.olimpista = JSON.parse(localStorage.getItem('olimpistas') || '[]');
    this.tutor = JSON.parse(localStorage.getItem('tutores') || '[]');
    this.inscripciones = JSON.parse(localStorage.getItem('inscripciones') || '[]');
    this.boletaTutor = this.tutor[0];//OBTIENE SOLO LA INFOEMCION DEL TUTOR RESPONSABLE
    console.log('Áreas recibidas:', this.areas);
    console.log('Olimpistas recibidos:', this.olimpista);
    console.log('Tutores recibidos:', this.tutor);
    console.log('tutor boleta', this.boletaTutor);
    console.log('inscripciones', this.inscripciones);
  }

  /* Métodos corregidos para contar y listar áreas únicas
countUniqueAreas(): number {
  if (!this.areas || !Array.isArray(this.areas)) return 0;
  
  const uniqueAreas = new Set<string>();
  this.areas.forEach(areaObj => {
    if (areaObj && areaObj.area_id) {
      // Agrega el ID del área como string
      uniqueAreas.add(areaObj.area_id.toString()); 
    }
  });
  return uniqueAreas.size;
}

getUniqueAreas(): string[] {
  if (!this.areas || !Array.isArray(this.areas)) return [];
  
  const uniqueAreas = new Set<string>();
  this.areas.forEach(areaObj => {
    if (areaObj && areaObj.area_id) {
      uniqueAreas.add(`Área ${areaObj.area_id}`);
    }
  });
  return Array.from(uniqueAreas);
}

// Métodos para contar y listar colegios únicos (estos están bien)
countUniqueSchools(): number {
  if (!this.olimpista || !Array.isArray(this.olimpista)) return 0;
  
  const uniqueSchools = new Set<string>();
  this.olimpista.forEach(estudiante => {
    if (estudiante && estudiante[6]) {
      uniqueSchools.add(estudiante[6]);
    }
  });
  return uniqueSchools.size;
}

getUniqueSchools(): string[] {
  if (!this.olimpista || !Array.isArray(this.olimpista)) return [];
  
  const uniqueSchools = new Set<string>();
  this.olimpista.forEach(estudiante => {
    if (estudiante && estudiante[6]) {
      uniqueSchools.add(estudiante[6]);
    }
  });
  return Array.from(uniqueSchools);
}*/

  inscribir() {
    // Verifica primero que tengas datos válidos
    if (!this.olimpista || this.olimpista.length === 0) {
      console.error('No hay datos de olimpistas');
      return;
    }

    // Prepara los datos de forma más segura
    const olimpistaData = this.olimpista.map(olimpista => {
      // Verifica que olimpista tenga los elementos esperados
      if (!olimpista || olimpista.length < 9) {
        console.error('Datos de olimpista incompletos:', olimpista);
        return null;
      }

      // Manejo más robusto de la fecha
      let fechaNacimiento = null;
      try {
        const fechaParts = olimpista[3]?.split('/');
        if (fechaParts && fechaParts.length === 3) {
          const day = fechaParts[0].padStart(2, '0');
          const month = fechaParts[1].padStart(2, '0');
          const year = fechaParts[2];
          fechaNacimiento = `${year}-${month}-${day}`;
        }
      } catch (e) {
        console.error('Error procesando fecha:', e);
      }

      return {
        nombres: olimpista[0] || '',
        apellidos: olimpista[1] || '',
        ci: String(olimpista[2] || ''),
        fecha_nacimiento: fechaNacimiento,
        correo: olimpista[4] || '',
        telefono: String(olimpista[5] || ''),
        colegio: olimpista[6] || '',
        departamento: olimpista[7] || '',
        provincia: olimpista[8] || ''
      };
    }).filter(ol => ol !== null); // Filtra cualquier olimpista inválido

    const tutorData = this.tutor.map(tutor => {
      if (!tutor || tutor.length < 5) {
        console.error('Datos de tutor incompletos:', tutor);
        return null;
      }

      return {
        nombres: tutor[0] || '',
        apellidos: tutor[1] || '',
        ci: String(tutor[2] || ''),
        correo: tutor[3] || '',
        telefono: String(tutor[4] || '')
      };
    }).filter(t => t !== null);

    if (!this.areas || this.areas.length === 0) {
      console.error('No hay áreas seleccionadas');
      return;
    }

    const inscripcionData = {
      estado: 'Pendiente',
      olimpistas: olimpistaData,
      tutors: tutorData,
      areas: this.areas
    };

    console.log('Datos que se enviarán:', JSON.stringify(inscripcionData, null, 2));

    this.service.storeInscripcion(inscripcionData).subscribe(
      response => {
        console.log('Inscripción exitosa:', response);
        if (response?.inscripcion?.boleta_pago) {
          this.boletaPago = response.inscripcion.boleta_pago;
          alert('Inscripción realizada correctamente');
        } else {
          alert('Inscripción exitosa, pero no se generó boleta de pago.');
        }
      },
      error => {
        console.error('Error completo:', error);
        if (error.error) {
          console.error('Detalles del error:', error.error);
          alert(`Error al inscribirse: ${error.error.message || 'Datos inválidos enviados al servidor'}`);
        } else {
          alert('Error desconocido al intentar inscribirse');
        }
      }
    );

  }

  descargarBoleta() {
    const element = document.getElementById("boletaPago");
    if (!element) {
      console.error('No se encontró el elemento boletaPago');
      return;
    }
    element.style.color = "black"; // Evita errores de colores avanzados
    element.style.backgroundColor = "white"; // Asegura fondo blanco

    html2canvas(element, { useCORS: true, ignoreElements: (el) => el.tagName === "STYLE" }).then(canvas => {
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 190, (canvas.height * 190) / canvas.width);
      pdf.save("BoletaInscripcion.pdf");
    });
  }


}