import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { VisualizacionService } from '../../service/Visualizacion.service';
import { BoletaPagoResponse } from '../../interfaces/inscripcion.types';
import { jsPDF } from 'jspdf';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { EmailService } from '../../service/email.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-boleta-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boleta-lista.component.html'
})
export class BoletaListaComponent implements OnInit {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  @Input() olimpista: any[][] = [];
  @Input() tutor: any[][] = [];
  @Input() areas: any[][] = [];
  @Input() inscripciones: any[] = [];

  boletaTutor: any[] = [];
  colegios: any[] = [];

  boletaPago: BoletaPagoResponse | null = null;
  mensaje: string = "";
  errorMessage: string | null = null;
  boletaGenerada = false;


  constructor(private service: VisualizacionService, private emailService: EmailService,) {
  }

  ngOnInit() {
    this.areas = JSON.parse(localStorage.getItem('areasInscripcion') || '[]');
    this.olimpista = JSON.parse(localStorage.getItem('olimpistas') || '[]');
    this.tutor = JSON.parse(localStorage.getItem('tutores') || '[]');
    this.inscripciones = JSON.parse(localStorage.getItem('inscripciones') || '[]');
    this.boletaTutor = this.tutor[0];//OBTIENE SOLO LA INFOEMCION DEL TUTOR RESPONSABLE
    this.colegios = [...new Set(this.olimpista.map(olimpista => olimpista[6]))];
    const idOlimpiada = this.activatedRoute.snapshot.paramMap.get('id');
    if (idOlimpiada) {
      this.router.navigate(['/boletaPago', idOlimpiada]);
    } else {
      console.warn('No se encontró el ID de la olimpiada en la URL');
    }
    console.log('Áreas recibidas:', this.areas);
    console.log('Olimpistas recibidos:', this.olimpista);
    console.log('Tutores recibidos:', this.tutor);
    console.log('tutor boleta', this.boletaTutor);
    console.log('colegios', this.colegios);
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
          this.boletaGenerada = true;
          alert('Inscripción realizada correctamente y Boleta generada con éxito');
          const correoTutor = this.tutor[0]?.[3]; // Accede al correo del tutor
          if (this.boletaPago) {
            console.log('Enviando boleta por correo a:', correoTutor);
            this.enviarBoletaPorEmail(this.boletaPago, correoTutor);
          } else {
            console.warn('No se pudo enviar la boleta, ya que no se generó correctamente.');
          }
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


  async generatePdfWithHtmlToImage() {
    try {
      const element = document.getElementById('boleta-container');
      if (!element) return;

      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1,
        pixelRatio: 2
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm'
      });

      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`boleta_${this.boletaPago?.numero_boleta || '0000'}.pdf`);

    } catch (error) {
      console.error('Error:', error);
      alert('Error al generar PDF');
    }
  }

  // envio de correo
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
  volver() {
    const idOlimpiada = this.activatedRoute.snapshot.paramMap.get('id');
    
    if (!idOlimpiada) {
        console.error('No se encontró el ID de la olimpiada en la URL');
        alert('No se pudo encontrar el ID de la olimpiada. Por favor, intenta nuevamente.');
        this.router.navigate(['./']); // Redirige a una ruta predeterminada
        return;
    }

    this.router.navigate(['/inicio/Olimpiada', idOlimpiada, 'Visualizacion']);
}


}