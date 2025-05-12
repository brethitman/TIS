import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'app-prueba-ocr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prueba-ocr.component.html',
  //styleUrls: ['./prueba-ocr.component.css'] // opcional
})
export class PruebaOcrComponent {
  ocrResultado: string = '';
  imagenCargada: string | null = null;
  imagenConfirmada: boolean = false;
  cargandoOCR: boolean = false;

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagenCargada = reader.result as string;
        this.imagenConfirmada = true;
        this.reconocerTexto(this.imagenCargada);
      };

      reader.readAsDataURL(file);
    }
  }

  reconocerTexto(imagenBase64: string): void {
    this.cargandoOCR = true;
    Tesseract.recognize(imagenBase64, 'eng', {
      logger: m => console.log(m)
    }).then(({ data: { text } }) => {
      this.ocrResultado = text;
      this.cargandoOCR = false;
    }).catch(error => {
      console.error('Error OCR:', error);
      this.cargandoOCR = false;
    });
  }
}
