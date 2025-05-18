import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, finalize } from 'rxjs';
import {
  VerificarPagoPayload,
  VerificarPagoResponse,
  InscripcionDetallada
} from '../../interfaces/postVerificarBoleta.interface';
import * as Tesseract from 'tesseract.js';
import { VerificarBoletaService } from '../../service/verificarBoleta.service';

@Component({
  selector: 'app-prueba-ocr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prueba-ocr.component.html',
})
export class PruebaOcrComponent {
  // Estados del componente
  ocrResultado: string = '';
  imagenCargada: string | null = null;
  cargandoOCR: boolean = false;
  procesandoPago: boolean = false;
  inscripcionVerificada?: InscripcionDetallada;
  errorMensaje: string = '';
  estadoDetectado: string = '';
  numeroBoletaDetectado: string = '';

  private readonly patronesBoleta = [
    /BOL-[\w\d]{8,}-\d+/i,
    /BOL[\W_]?[\dA-Z]{6,}/i,
    /(?:COD|ID|N°?)[\W_]*[\dA-Z-]{6,}/i
  ];

  constructor(private verificarBoletaService: VerificarBoletaService) {}

  // Métodos públicos
  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: Event): void {
    this.limpiarEstado();
    const input = event.target as HTMLInputElement;
    
    if (input.files?.length) {
      this.procesarImagen(input.files[0]);
    }
  }

  // Métodos privados
  private limpiarEstado(): void {
    this.imagenCargada = null;
    this.inscripcionVerificada = undefined;
    this.errorMensaje = '';
    this.estadoDetectado = '';
    this.numeroBoletaDetectado = '';
    this.ocrResultado = '';
  }

  private procesarImagen(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.imagenCargada = e.target?.result as string;
      this.reconocerTexto(this.imagenCargada);
    };
    reader.readAsDataURL(file);
  }

  private reconocerTexto(imagenBase64: string): void {
    this.cargandoOCR = true;
    
    Tesseract.recognize(imagenBase64, 'spa', {
      logger: info => console.debug('Proceso OCR:', info)
    })
    .then(({ data: { text } }) => {
      this.ocrResultado = text;
      this.validarDatosOCR();
    })
    .catch(error => {
      console.error('Error en OCR:', error);
      this.errorMensaje = 'Error al procesar la imagen. Intente con una foto más clara.';
    })
    .finally(() => this.cargandoOCR = false);
  }

  private validarDatosOCR(): void {
    this.numeroBoletaDetectado = this.extraerNumeroBoleta(this.ocrResultado);
    
    if (!this.numeroBoletaDetectado) {
      this.errorMensaje = '❌ No se pudo detectar el número de boleta';
      return;
    }
    
    this.verificarPagoAutomatico();
  }

  private extraerNumeroBoleta(texto: string): string {
    const textoLimpio = texto.replace(/[\s_]/g, '');
    
    for (const patron of this.patronesBoleta) {
      const match = textoLimpio.match(patron);
      if (match) {
        return match[0]
          .toUpperCase()
          .replace(/[^A-Z0-9-]/g, '')
          .replace(/O/g, '0');
      }
    }
    return '';
  }

  private verificarPagoAutomatico(): void {
    this.procesandoPago = true;
    this.errorMensaje = '';
    
    const payload: VerificarPagoPayload = {
      numero_boleta: this.numeroBoletaDetectado,
      estado: 'Pagado'
    };
    
    this.verificarBoletaService.verificarPago(payload)
      .pipe(finalize(() => this.procesandoPago = false))
      .subscribe({
        next: (response) => {
          console.log('Respuesta completa:', response);
          this.inscripcionVerificada = response.data;
          this.estadoDetectado = response.data.estado;
          this.errorMensaje = '';
          
          // Convertir tipos de datos numéricos
          this.normalizarTiposDatos();
        },
        error: (error) => this.manejarErrorVerificacion(error)
      });
  }

  private normalizarTiposDatos(): void {
    if (!this.inscripcionVerificada) return;

    // Convertir montos de string a number si es necesario
    if (typeof this.inscripcionVerificada.detalles_academicos.boleta.monto === 'string') {
      this.inscripcionVerificada.detalles_academicos.boleta.monto = 
        parseFloat(this.inscripcionVerificada.detalles_academicos.boleta.monto);
    }

    // Convertir costos de niveles
    this.inscripcionVerificada.detalles_academicos.areas.forEach(area => {
      area.niveles.forEach(nivel => {
        if (typeof nivel.costo === 'string') {
          nivel.costo = parseFloat(nivel.costo);
        }
      });
    });
  }

  private manejarErrorVerificacion(error: any): void {
    console.error('Error en verificación:', error);
    this.errorMensaje = error.message || '⛔ Error al conectar con el servidor';

    if (error.error) {
      // Manejo de errores estructurados del servidor
      if (error.error.data) {
        this.inscripcionVerificada = error.error.data.datos;
        this.estadoDetectado = error.error.data.estado_actual;
      }
      
      if (error.status === 409) {
        this.errorMensaje += '. La boleta ya tiene un pago registrado anteriormente.';
      }
    }
  }
}