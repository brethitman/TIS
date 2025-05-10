// boleta-pago.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { BoletaPagoResponse } from '../../interfaces/inscripcion.types';
import { EmailService } from '../../service/email.service';
import { HttpClientModule } from '@angular/common/http';

// Importación y configuración correcta de pdfMake
declare const pdfMake: any;

// Importamos las fuentes en forma separada
import 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-boleta-pago',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './boleta-pago.component.html',
  providers: [DatePipe, CurrencyPipe, EmailService]
})
export class BoletaPagoComponent implements OnChanges {
  @Input() boletaData!: BoletaPagoResponse;

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private emailService: EmailService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Verificar que boletaData se recibe correctamente
    if (changes['boletaData'] && changes['boletaData'].currentValue) {
      console.log('boletaData recibido:', this.boletaData);
    }
  }

  // Método para formatear la fecha
  formatDate(date: string | null): string {
    if (!date) return 'N/A';
    try {
      return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || 'N/A';
    } catch (error) {
      console.error('Error formateando fecha:', error);
      return 'N/A';
    }
  }

  // Método para formatear la moneda
  formatCurrency(amount: string | null): string {
    if (!amount) return 'N/A';
    try {
      return this.currencyPipe.transform(amount, 'BOB', 'symbol', '1.2-2', 'es-BO') || 'N/A';
    } catch (error) {
      console.error('Error formateando moneda:', error);
      return 'N/A';
    }
  }

  enviarPorEmail(correo: string): void {
    if (!this.boletaData) {
      alert('No hay datos disponibles para enviar');
      return;
    }

    this.emailService.enviarBoletaPorEmail(this.boletaData, correo)
      .subscribe({
        next: (response: {success: boolean, message: string}) => {
          console.log('Boleta enviada por email:', response);
          alert('Boleta enviada correctamente al correo: ' + correo);
        },
        error: (error: Error) => {
          console.error('Error al enviar boleta por email:', error);
          alert('Error al enviar la boleta por email: ' + (error.message || 'Error desconocido'));
        }
      });
  }

  // Método para generar el PDF
  generatePdfBoleta(): void {
    console.log('generatePdfBoleta() llamado. Intentando generar PDF...');

    if (!this.boletaData) {
      console.error('ERROR: boletaData es nulo o indefinido. No se puede generar PDF.');
      alert('No hay datos disponibles para generar la boleta');
      return;
    }

    console.log('Datos de la boleta a usar:', this.boletaData);

    try {
      const pdfDefinition: any = {
        content: [
          {
            text: 'Boleta de Pago',
            style: 'header'
          },
          {
            text: [
              { text: 'Número de Boleta: ', bold: true },
              { text: this.boletaData.numero_boleta ? this.boletaData.numero_boleta.toString() : 'N/A' }
            ],
            margin: [0, 10, 0, 5]
          },
          {
            text: [
              { text: 'Monto: ', bold: true },
              { text: this.boletaData.monto ? this.formatCurrency(this.boletaData.monto) : 'N/A' }
            ],
            margin: [0, 0, 0, 5]
          },
          {
            text: [
              { text: 'Fecha de Generación: ', bold: true },
              { text: this.boletaData.fecha_generacion ? this.formatDate(this.boletaData.fecha_generacion) : 'N/A' }
            ],
            margin: [0, 0, 0, 10]
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 20],
            alignment: 'center'
          }
        }
      };

      console.log('Definición del PDF creada. Llamando a pdfMake.createPdf()...');
      const pdf = pdfMake.createPdf(pdfDefinition);

      console.log('Objeto PDF creado. Llamando a pdf.download()...');
      pdf.download(`boleta_pago_${this.boletaData.numero_boleta || 'sin_numero'}.pdf`);
      
    } catch (error) {
      console.error('OCURRIÓ UN ERROR DURANTE LA GENERACIÓN DEL PDF:', error);
      alert('Ocurrió un error al generar el PDF. Por favor, intente de nuevo.');
    }
  }
}