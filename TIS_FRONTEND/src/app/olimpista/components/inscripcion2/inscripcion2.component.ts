import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inscripcion2',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inscripcion2.component.html'
})
export class Inscripcion2Component {
  olimpistaData = {
    nombres: '',
    apellidos: '',
    ci: '',
    fecha_nacimiento: '',
    correo: '',
    telefono: '',
    colegio: '',
    curso: '',
    departamento: '',
    provincia: ''
  };

  // Variables para el manejo de Excel
  archivoSeleccionado: File | null = null;
  modalVisible = false;
  archivoInvalido = false;

  // Encabezados simplificados para la plantilla CSV
  private readonly encabezadosExcel = [
    'Nombre del estudiante',
    'Apellido del estudiante',
    'CI'
  ];

  @Output() continuar = new EventEmitter<void>();
  @Output() atras = new EventEmitter<void>();
  @Output() olimpistaChanged = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  onOlimpistaChange() {
    this.olimpistaChanged.emit(this.olimpistaData);
  }

  siguiente() {
    if (this.validarDatos()) {
      this.onOlimpistaChange();
      this.continuar.emit();
    }
  }

  volver() {
    this.atras.emit();
  }

  validarDatos(): boolean {
    return !!this.olimpistaData.nombres &&
           !!this.olimpistaData.apellidos &&
           !!this.olimpistaData.ci;
  }

  // Métodos para el modal de Excel
  abrirModalExcel() {
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
    this.archivoInvalido = false;
  }

  seleccionarArchivo() {
    const input = document.getElementById('archivoExcel') as HTMLInputElement;
    input.click();
  }

  archivoElegido(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validar que sea un archivo Excel o CSV
      const extensionesValidas = ['.xlsx', '.xls', '.csv'];
      const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (extensionesValidas.includes(extension)) {
        this.archivoSeleccionado = file;
        this.archivoInvalido = false;
      } else {
        this.archivoSeleccionado = null;
        this.archivoInvalido = true;
      }
    }
  }

  subirArchivo() {
    if (!this.archivoSeleccionado || this.archivoInvalido) return;

    const formData = new FormData();
    formData.append('archivo', this.archivoSeleccionado);
    console.log("Recibiendo Archivo...", this.archivoSeleccionado);
    
    this.http.post('/olimpistaExel', formData)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          alert('Archivo subido exitosamente');
          this.cerrarModal();
        },
        error: (error) => {
          console.error('Error al subir el archivo', error);
          alert('Error al subir el archivo');
        }
      });
  }

  // Método para descargar plantilla CSV con encabezados simplificados
  descargarPlantilla() {
    // Crear contenido CSV con encabezados
    let csvContent = this.encabezadosExcel.join(',') + '\n';
    
    // Crear blob (archivo binario)
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Crear enlace de descarga
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'plantilla_estudiantes.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}