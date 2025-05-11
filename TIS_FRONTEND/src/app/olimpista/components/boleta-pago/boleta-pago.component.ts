// boleta-pago.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { BoletaPagoResponse } from '../../interfaces/inscripcion.types'; // Asegúrate de que la ruta sea correcta para tu proyecto

// *** Importaciones de pdfmake ***
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// *** Configuración de fuentes (¡Correcta!) ***
// Esta línea debe estar FUERA de la clase del componente
pdfMake.vfs = pdfFonts.vfs;
// *********************************

@Component({
  selector: 'app-boleta-pago',
  standalone: true,
  imports: [CommonModule], // CommonModule es necesario para pipes como DatePipe y CurrencyPipe
  templateUrl: './boleta-pago.component.html', // Ruta a tu plantilla HTML
  providers: [DatePipe, CurrencyPipe] // Provee los pipes si no están provistos globalmente
})
export class BoletaPagoComponent {
  // Input para recibir los datos de la boleta del componente padre
  @Input() boletaData!: BoletaPagoResponse;

  constructor(
    // Inyecta los pipes para formatear la fecha y la moneda
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe
  ) {}

  // Método para formatear la fecha
  formatDate(date: string): string {
    // Usa el DatePipe para formatear la fecha
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
  }

  // Método para formatear la moneda
  formatCurrency(amount: string): string {
     // Usa el CurrencyPipe. Ajusta 'BOB' y 'es-BO' si tu moneda o locale es diferente.
     // 'symbol' para incluir el símbolo de moneda. '1.2-2' para 1 dígito antes del punto decimal y 2 después.
     return this.currencyPipe.transform(amount, 'BOB', 'symbol', '1.2-2', 'es-BO') || '';
  }

  // Método para generar el PDF
  generatePdfBoleta() {
    // *** AGREGADO: Log al inicio para verificar que la función se llama ***
    console.log('generatePdfBoleta() called. Attempting to generate PDF...');

    // Verifica si los datos de la boleta están disponibles
    if (!this.boletaData) {
      // *** AGREGADO: Mensaje de error más claro si faltan datos ***
      console.error('ERROR: boletaData is missing or null. Cannot generate PDF.');
      // Podrías mostrar un mensaje al usuario aquí también si lo deseas
      return; // Sale de la función si no hay datos
    }

    // *** AGREGADO: Log para verificar los datos que se usarán ***
    console.log('boletaData received:', this.boletaData);

    // *** AGREGADO: Bloque try...catch para capturar errores durante la creación del PDF ***
    try {
      // Definición del contenido y estilos del documento PDF usando pdfmake
      const pdfDefinition: any = {
        content: [
          {
            text: 'Boleta de Pago', // Título principal
            style: 'header' // Aplica el estilo 'header'
          },
          {
            text: [ // Contenido para el número de boleta (label en negrita + valor)
              { text: 'Número de Boleta: ', bold: true },
              // ✅ AGREGADO: Verificación para numero_boleta antes de usarlo, muestra 'N/A' si es null/undefined
              { text: this.boletaData.numero_boleta ? this.boletaData.numero_boleta.toString() : 'N/A' }
            ],
            margin: [0, 10, 0, 5] // Margen [izquierda, arriba, derecha, abajo]
          },
          {
            text: [ // Contenido para el monto (label en negrita + valor formateado)
              { text: 'Monto: ', bold: true },
              // ✅ AGREGADO: Verificación para monto antes de usarlo y formatearlo
              { text: this.boletaData.monto ? this.formatCurrency(this.boletaData.monto) : 'N/A' }
            ],
            margin: [0, 0, 0, 5]
          },
          {
            text: [ // Contenido para la fecha de generación (label en negrita + valor formateado)
              { text: 'Fecha de Generación: ', bold: true },
              // ✅ AGREGADO: Verificación para fecha_generacion antes de usarlo y formatearlo
              { text: this.boletaData.fecha_generacion ? this.formatDate(this.boletaData.fecha_generacion) : 'N/A' }
            ],
            margin: [0, 0, 0, 10]
          }
          // Puedes añadir más elementos aquí siguiendo la estructura
        ],
        // Definición de estilos reutilizables
        styles: {
          header: {
            fontSize: 18, // Tamaño de fuente
            bold: true,   // Texto en negrita
            margin: [0, 0, 0, 20], // Margen debajo del título
            alignment: 'center' // Alineación central
          }
          // Puedes añadir otros estilos como 'fieldLabel', 'fieldValue', etc.
        }
      };

      // *** AGREGADO: Log antes de crear el objeto PDF ***
      console.log('PDF definition created. Calling pdfMake.createPdf()...');

      // Crea el documento PDF
      const pdf = pdfMake.createPdf(pdfDefinition);

      // *** AGREGADO: Log antes de llamar a download ***
      console.log('PDF object created. Calling pdf.download()...');

      // Descarga el documento PDF
      // ✅ AGREGADO: Ajusta el nombre del archivo en caso de que numero_boleta sea null
      pdf.download(`boleta_pago_${this.boletaData.numero_boleta || 'sin_numero'}.pdf`);

      // *** AGREGADO: Log después de llamar a download ***
      console.log('pdf.download() called.');

    } catch (error) {
      // *** AGREGADO: Captura y loguea cualquier error ocurrido durante la creación/descarga ***
      console.error('AN ERROR OCCURRED DURING PDF GENERATION:', error);
      // Opcional: Muestra un mensaje de error al usuario en la UI
      // alert('Ocurrió un error al generar el PDF. Por favor, intente de nuevo.');
    }
  }
}
