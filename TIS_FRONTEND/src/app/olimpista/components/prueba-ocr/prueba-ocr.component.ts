import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { VerificarBoletaService } from '../../service/verificarBoleta.service';
import { Inscripcion, VerificarPagoPayload } from '../../interfaces/postVerificarBoleta.interface';
import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'app-prueba-ocr',
  standalone: true,
  imports: [CommonModule, DatePipe],
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

  constructor(private verificarBoletaService: VerificarBoletaService) { }

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
      console.log('Texto OCR extraído:', text);
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
    console.log('Número de boleta detectado:', this.numeroBoletaDetectado);

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

    console.log('Enviando payload:', payload);

    this.verificarBoletaService.verificarPago(payload).subscribe({
      next: (response: any) => {
        console.log('Respuesta RAW completa:', response);
        this.procesandoPago = false;

        // Manejo flexible de la respuesta
        if (response.data) {
          // Si viene con wrapper
          this.inscripcionVerificada = response.data;
          console.log('Usando response.data:', response.data);
        } else {
          // Si viene directamente
          this.inscripcionVerificada = response;
          console.log('Usando response directo:', response);
        }

        console.log('Inscripción verificada final:', this.inscripcionVerificada);
        console.log('Boleta pago:', this.inscripcionVerificada?.boleta_pago);
        console.log('Olimpistas:', this.inscripcionVerificada?.olimpistas);
        console.log('Tutores:', this.inscripcionVerificada?.tutors);

        // Forzar detección de cambios
        setTimeout(() => {
          console.log('After timeout - inscripcionVerificada:', this.inscripcionVerificada);
        }, 100);
      },
      error: (error) => {
        console.error('Error completo:', error);
        this.procesandoPago = false;
        this.errorMensaje = error.error?.message || 'Error al verificar el pago';
      }
    });
  }

  // Método de debug para verificar datos
  debugInscripcion(): void {
    console.log('DEBUG - inscripcionVerificada:', this.inscripcionVerificada);
    console.log('DEBUG - tiene boleta_pago:', !!this.inscripcionVerificada?.boleta_pago);
    console.log('DEBUG - tiene olimpistas:', !!this.inscripcionVerificada?.olimpistas);
    console.log('DEBUG - cantidad olimpistas:', this.inscripcionVerificada?.olimpistas?.length);
  }
}