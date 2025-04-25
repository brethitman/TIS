import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ExcelService } from '../../service/excel.service';
import { ListaComponent } from '../lista/lista.component';

@Component({
  selector: 'app-visualizacion-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visualizacion-lista.component.html',
})
export class VisualizacionListaComponent {

  archivoSeleccionado: File | null = null;
  mostrarModal = false;
  listaEstudiantes: string[] = [];
  listaTutores: string[] = [];
  private ExcelService = inject(ExcelService);
  constructor(private router: Router, private http: HttpClient, private lista: ListaComponent) { };

  abrirModal(): void {
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.archivoSeleccionado = null;
  }
  seleccionarArchivo() {
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
    if (this.archivoSeleccionado) {
      this.ExcelService.enviarArchivo(this.archivoSeleccionado).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);

          this.lista.setEstudiantes(response.estudiantes);
          this.lista.setTutores(response.tutor);

          alert('Archivo subido exitosamente');
          this.router.navigate(['inicio/Olimpiada/Recomendaciones/Visualizacion']);
        },
        error: (error) => {
          console.error('Error al subir el archivo', error);
          alert('Hubo un error al subir el archivo.');
        },
      });

      this.cerrarModal();
    } else {
      console.error('No se seleccionó un archivo.');
    }
  }
}
