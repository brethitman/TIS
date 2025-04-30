import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BotonExelComponent } from '../../components/boton-exel/boton-exel.component';

@Component({
  selector: 'app-visualizacion-lista',
  standalone: true,
  imports: [CommonModule,BotonExelComponent],
  templateUrl: './visualizacion-lista.component.html',
})
export class VisualizacionListaComponent {

  archivoSeleccionado: File | null = null;
  mostrarModal = false;
  constructor(private router: Router, private http: HttpClient) { };

  abrirModal(): void {
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.archivoSeleccionado = null;
  }
  /*seleccionarArchivo() {
    const input = document.getElementById('archivoExcel') as HTMLInputElement;
    input.click();
  }

  archivoElegido(event: any) {
    this.archivoSeleccionado = event.target.files[0];
    if (this.archivoSeleccionado) {
      this.abrirModal();
    }
  }

  subirArchivo() {
    const formData = new FormData();
    formData.append('archivo', this.archivoSeleccionado as File);
    console.log("Reciviendo Archivo..", this.archivoSeleccionado)
    this.http.post('http://localhost:8000/api/olimpistasExel', formData)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          alert('Archivo subido exitosamente');
        },
        error: (error) => {
          console.error('Error al subir el archivo', error);
          alert('Hubo un error al subir el archivo.');
        }
      });

    this.cerrarModal();
  }*/
}
