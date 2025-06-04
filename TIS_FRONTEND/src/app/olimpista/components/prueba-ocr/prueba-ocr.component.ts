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
  numeroBoletaDetectado: string = '';

  constructor(private verificarBoletaService: VerificarBoletaService) {}

  // Método para activar el input de archivo
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

    Tesseract.recognize(imagenBase64, 'spa').then(({ data: { text } }) => {
      this.ocrResultado = text;
      this.extraerDatosBoleta();
      this.cargandoOCR = false;
    }).catch(error => {
      console.error('Error OCR:', error);
      this.cargandoOCR = false;
      this.errorMensaje = 'Error al procesar la imagen';
    });
  }

  private extraerDatosBoleta(): void {
    // Extraer número de boleta
    this.numeroBoletaDetectado = this.extraerNumeroBoleta(this.ocrResultado);

    // Verificar si se encontró un número de boleta válido
    if (!this.numeroBoletaDetectado) {
      this.errorMensaje = 'No se detectó un número de boleta válido';
      return;
    }

    // Verificar si la boleta muestra estado "Pagado"
    if (!this.verificarEstadoPagado(this.ocrResultado)) {
      this.errorMensaje = 'La boleta no muestra estado "Pagado"';
      return;
    }

    // Si todo está bien, proceder con la verificación
    this.verificarPago();
  }

  private extraerNumeroBoleta(texto: string): string {
    // Patrón para identificar formato BOL-XXXXXX-XX
    const regex = /BOL-[A-Z0-9]{6,}-\d+/i;
    const match = texto.match(regex);
    return match ? match[0] : '';
  }

  private verificarEstadoPagado(texto: string): boolean {
    // Buscar variantes de la palabra "Pagado"
    const regex = /(pagado|pago completado|aprobado)/i;
    return regex.test(texto);
  }

  private verificarPago(): void {
    this.procesandoPago = true;

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
      }
    });
  }
}
