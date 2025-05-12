import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { BoletaPagoResponse } from '../../interfaces/inscripcion.types';
import { EmailService } from '../../service/email.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

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
  apiBaseUrl: string = environment.apiUrl;
  
  // Variables para mensajes
  envioExitoso: boolean | null = null;
  mensajeEnvio: string = '';

  constructor(
    // Inyecta los pipes para formatear la fecha y la moneda
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private emailService: EmailService
  ) {
    console.log('API Base URL:', this.apiBaseUrl);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['boletaData'] && changes['boletaData'].currentValue) {
      console.log('boletaData recibido:', this.boletaData);
      
      // Asegurar que el monto sea una cadena válida y nunca sea null
      if (this.boletaData && this.boletaData.monto === null) {
        this.boletaData.monto = '0';
      }
      
      // Si el monto es un número, convertirlo a string
      if (this.boletaData && typeof this.boletaData.monto === 'number') {
        this.boletaData.monto = String(this.boletaData.monto);
      }
      
      console.log('Monto procesado:', this.boletaData.monto, 'Tipo:', typeof this.boletaData.monto);
    }
  }

  // Método para formatear la fecha
  formatDate(date: string | Date | null): string {
    if (!date) return 'N/A';
    try {
      return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || 'N/A';
    } catch (error) {
      console.error('Error formateando fecha:', error);
      return 'N/A';
    }
  }

  // Método para formatear la moneda
  formatCurrency(amount: string | number | null): string {
    console.log('formatCurrency llamado con:', amount, 'Tipo:', typeof amount);
    
    if (amount === null || amount === undefined || amount === '') {
      console.log('Monto nulo o indefinido, retornando N/A');
      return 'N/A';
    }
    
    try {
      // Convertir a número si es un string
      let numericAmount: number;
      
      if (typeof amount === 'string') {
        // Eliminar cualquier caracter no numérico excepto punto decimal
        const cleanAmount = amount.replace(/[^\d.]/g, '');
        numericAmount = parseFloat(cleanAmount);
      } else {
        numericAmount = amount;
      }
      
      // Verificar si es un número válido
      if (isNaN(numericAmount)) {
        console.error('El monto no es un número válido:', amount);
        return 'N/A';
      }
      
      console.log('Monto numérico a formatear:', numericAmount);
      
      // Usar directamente toFixed para evitar problemas con el pipe
      const formatted = numericAmount.toFixed(2);
      // Aplicar formato de moneda boliviana
      return `Bs. ${formatted}`;
    } catch (error) {
      console.error('Error formateando moneda:', error, 'Valor recibido:', amount, 'Tipo:', typeof amount);
      return 'N/A';
    }
  }

  // Método para generar el PDF
  generatePdfBoleta(): void {
    console.log('generatePdfBoleta() llamado. Intentando generar PDF...');

    if (!this.boletaData) {
      console.error('ERROR: boletaData es nulo o indefinido. No se puede generar PDF.');
      this.mensajeEnvio = 'No hay datos disponibles para generar la boleta';
      this.envioExitoso = false;
      return;
    }

    console.log('Datos de la boleta a usar:', this.boletaData);
    console.log('Monto para PDF:', this.boletaData.monto, 'Tipo:', typeof this.boletaData.monto);

    try {
      // Formatear el monto para el PDF
      let montoFormateado = 'N/A';
      if (this.boletaData.monto !== null && this.boletaData.monto !== undefined) {
        montoFormateado = this.formatCurrency(this.boletaData.monto);
      }
      
      console.log('Monto formateado para PDF:', montoFormateado);

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
              { text: montoFormateado }
            ],
            margin: [0, 0, 0, 5]
          },
          {
            text: [
              { text: 'Fecha de Generación: ', bold: true },
              { text: this.boletaData.fecha_generacion ? 
                  this.formatDate(this.boletaData.fecha_generacion) : 'N/A' }
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
      
      this.mensajeEnvio = 'PDF generado exitosamente.';
      this.envioExitoso = true;
      
    } catch (error) {
      console.error('OCURRIÓ UN ERROR DURANTE LA GENERACIÓN DEL PDF:', error);
      this.mensajeEnvio = 'Ocurrió un error al generar el PDF. Por favor, intente de nuevo.';
      this.envioExitoso = false;
    }
  }
}