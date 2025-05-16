import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificarBoletaService } from '../../service/verificarBoleta.service';
import { Inscripcion, VerificarPagoPayload } from '../../interfaces/postVerificarBoleta.interface';
import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'app-prueba-ocr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prueba-ocr.component.html',

})
export class PruebaOcrComponent {
  ocrResultado: string = '';
  imagenCargada: string | null = null;
  cargandoOCR: boolean = false;
  procesandoPago: boolean = false;
  inscripcionVerificada?: Inscripcion;
  errorMensaje: string = '';
  estadoDetectado: string = '';
  numeroBoletaDetectado: string = '';

  constructor(private verificarBoletaService: VerificarBoletaService) {}

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: Event): void {
    this.limpiarEstado();
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.procesarImagen(file);
    }
  }

  private limpiarEstado(): void {
    this.ocrResultado = '';
    this.imagenCargada = null;
    this.inscripcionVerificada = undefined;
    this.errorMensaje = '';
    this.estadoDetectado = '';
    this.numeroBoletaDetectado = '';
  }

  private procesarImagen(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      this.imagenCargada = reader.result as string;
      this.reconocerTexto(this.imagenCargada);
    };

    reader.readAsDataURL(file);
  }

  private reconocerTexto(imagenBase64: string): void {
    this.cargandoOCR = true;

    Tesseract.recognize(imagenBase64, 'spa', {
      logger: m => console.log(m)
    }).then(({ data: { text } }) => {
      this.ocrResultado = text;
      this.validarDatosOCR();
      this.cargandoOCR = false;
    }).catch(error => {
      console.error('Error OCR:', error);
      this.cargandoOCR = false;
      this.errorMensaje = 'Error al procesar la imagen';
    });
  }

  private validarDatosOCR(): void {
    this.numeroBoletaDetectado = this.extraerNumeroBoleta(this.ocrResultado);
    this.estadoDetectado = this.extraerEstado(this.ocrResultado);

    if (!this.numeroBoletaDetectado) {
      this.errorMensaje = 'No se detectó número de boleta válido';
      return;
    }

    if (this.estadoDetectado !== 'Pendiente') {
      this.errorMensaje = 'El estado detectado no es "Pendiente"';
      return;
    }

    this.verificarPagoAutomatico();
  }

  private extraerNumeroBoleta(texto: string): string {
    const patrones = [
      /BOL-[A-Z0-9]{6,}-\d+/i,
      /BOLETA\s*N°?\s*\d+/i,
      /COD:\s*\d{6,}/i,
      /No\.?\s*[\w-]+/i
    ];

    for (const patron of patrones) {
      const match = texto.match(patron);
      if (match) {
        return match[0].toUpperCase().replace(/\s/g, '');
      }
    }
    return '';
  }

  private extraerEstado(texto: string): string {
    const regex = /(Estado|Status|Situación):\s*([A-Za-záéíóú]+)/i;
    const match = texto.match(regex);
    return match ? match[2].trim() : '';
  }

  private verificarPagoAutomatico(): void {
    this.procesandoPago = true;
    this.errorMensaje = '';

    const payload: VerificarPagoPayload = {
      numero_boleta: this.numeroBoletaDetectado,
      estado: 'Pagado'
    };

    this.verificarBoletaService.verificarPago(payload).subscribe({
      next: (inscripcion) => {
        this.procesandoPago = false;
        this.inscripcionVerificada = inscripcion;
      },
      error: (error) => {
        this.procesandoPago = false;
        this.errorMensaje = error.error?.message || 'Error al verificar el pago';
        console.error('Error:', error);
      }
    });
  }
}
