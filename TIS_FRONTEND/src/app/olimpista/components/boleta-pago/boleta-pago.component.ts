import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { BoletaPagoResponse } from '../../interfaces/inscripcion.types';
import { EmailService } from '../../service/email.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

// Declarar pdfMake como variable global
declare var pdfMake: any;

@Component({
  selector: 'app-boleta-pago',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl:'./boleta-pago.component.html',
  providers: [DatePipe, CurrencyPipe, EmailService]
})
export class BoletaPagoComponent implements OnChanges {
  @Input() boletaData!: BoletaPagoResponse;
  apiBaseUrl: string = environment.apiUrl;

  envioExitoso: boolean | null = null;
  mensajeEnvio: string = '';

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private emailService: EmailService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['boletaData']?.currentValue) {
      console.log('Datos de boleta actualizados:', this.boletaData);
    }
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || 'N/A';
  }

  formatCurrency(amount: string): string {
    try {
      const numericAmount = parseFloat(amount);
      return `Bs. ${numericAmount.toFixed(2)}`;
    } catch (error) {
      console.error('Error formateando moneda:', amount);
      return 'N/A';
    }
  }



  generatePdfBoleta(): void {
    try {
      console.log('Iniciando generación de PDF...', this.boletaData);

      // Verificar que tengamos los datos necesarios
      if (!this.boletaData) {
        throw new Error('No hay datos de boleta disponibles');
      }

      // Verificar que pdfMake esté disponible
      if (typeof pdfMake === 'undefined') {
        throw new Error('pdfMake no está cargado. Verifica que esté incluido en angular.json');
      }

      // Crear contenido del PDF de forma más simple


      const docDefinition = {

        content: [

          {
            text: this.boletaData.nombre_olimpiada || 'Olimpiada Nacional Universitaria',
            style: 'header',
            alignment: 'center'
          },
          {
            text: 'Universidad Mayor de San Simon',
            style: 'subheader',
            alignment: 'center',
            margin: [0, 0, 0, 20]
          },
          {
            text: `Número de Boleta: ${this.boletaData.numero_boleta || 'N/A'}`,
            style: 'title',
            alignment: 'center',
            margin: [0, 0, 0, 20]
          },
          {
            text: 'INFORMACIÓN DE PAGO',
            style: 'sectionHeader'
          },
          {
            table: {
              widths: ['*', '*'],
              body: [
                ['Fecha de Emisión:', this.formatDate(this.boletaData.fecha_generacion)],
                ['Estado:', 'Pendiente'],
                ['Monto Total:', this.formatCurrency(this.boletaData.monto)]
              ]
            },
            margin: [0, 0, 0, 20]
          },
          {
            text: 'DATOS DEL PARTICIPANTE',
            style: 'sectionHeader'
          },
          {
            table: {
              widths: ['*', '*'],
              body: [
                ['Nombre:', `${this.boletaData.olimpista?.nombres || ''} ${this.boletaData.olimpista?.apellidos || ''}`],
                ['CI:', this.boletaData.olimpista?.ci || 'N/A'],
                ['Colegio:', this.boletaData.olimpista?.colegio || 'N/A'],
                ['Ubicación:', `${this.boletaData.olimpista?.departamento || ''} - ${this.boletaData.olimpista?.provincia || ''}`]
              ]
            },
            margin: [0, 0, 0, 20]
          },
          {
            text: 'DATOS DEL TUTOR PRINCIPAL',
            style: 'sectionHeader'
          },
          {
            table: {
              widths: ['*', '*'],
              body: [
                ['Nombre:', `${this.boletaData.tutor_principal?.nombres || ''} ${this.boletaData.tutor_principal?.apellidos || ''}`],
                ['Teléfono:', this.boletaData.tutor_principal?.telefono || 'N/A'],
                ['Email:', this.boletaData.tutor_principal?.correo || 'N/A'],
                ['Parentesco:', this.boletaData.tutor_principal?.contacto || 'N/A']
              ]
            },
            margin: [0, 0, 0, 20]
          },
        {
          text: 'ÁREAS Y NIVELES INSCRITOS',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: [

              ['Área', 'Niveles'],

              ...(this.boletaData.areas_niveles?.length
                ? this.boletaData.areas_niveles.map(area => [
                    area.area_nombre,
                    area.niveles.map(nivel => nivel.nivel_nombre).join(', ')
                  ])
                : [['No hay áreas registradas', '']]
            )
          ]
          },
          margin: [0, 0, 0, 20]
        },


        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            color: '#1e3a8a'
          },
          subheader: {
            fontSize: 14,
            italics: true,
            color: '#dc2626'
          },
          title: {
            fontSize: 16,
            bold: true,
            color: '#1e40af'
          },
          sectionHeader: {
            fontSize: 14,
            bold: true,
            color: '#1e40af',
            margin: [0, 10, 0, 5]
          }
        },
        pageMargins: [40, 60, 40, 60]
      };

      // Generar el PDF
      console.log('Generando PDF...');
      const pdf = pdfMake.createPdf(docDefinition);

      pdf.download(`Boleta_${this.boletaData.numero_boleta || 'SinNumero'}.pdf`);

      // Mostrar mensaje de éxito
      this.mensajeEnvio = 'Boleta generada y descargada exitosamente';
      this.envioExitoso = true;

      console.log('PDF generado exitosamente');

    } catch (error) {
      console.error('Error completo:', error);
      this.mensajeEnvio = `Error: ${error instanceof Error ? error.message : 'Error desconocido al generar la boleta'}`;
      this.envioExitoso = false;
    }
  }
}