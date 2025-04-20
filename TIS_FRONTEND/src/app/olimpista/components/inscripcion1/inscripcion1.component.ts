import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inscripcion1',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inscripcion1.component.html'
})
export class Inscripcion1Component {
  tutorData = {
    nombres: '',
    apellidos: '',
    ci: '',
    correo: '',
    telefono: ''
  };

  archivoSeleccionado: File | null = null;
  modalVisible = false;
  archivoInvalido = false;

  // Encabezados para la plantilla CSV
  private readonly encabezadosExcel = [
    'Nombre Estudiante',
    'Apellido Estudiante',
    'CI estudiante',
    'Nombre Tutor',
    'Apellido de tutor',
    'CI Tutor',
    'Correo electrónico',
    'Nro Celular'
  ];

  @Output() continuar = new EventEmitter<void>();
  @Output() tutorChanged = new EventEmitter<any>();
  constructor(private http: HttpClient) {}

  // Flags para mostrar mensajes de error
  nombreInvalido = false;
  apellidoInvalido = false;
  ciInvalido = false;
  correoInvalido = false;
  telefonoInvalido = false;

  onTutorChange() {
    this.tutorChanged.emit(this.tutorData);
  }

  siguiente() {
    if (this.validarDatos()) {
      this.onTutorChange();
      this.continuar.emit();
    }
  }

  validarDatos(): boolean {
    const nombreRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{1,255}$/;
    const apellidoRegex = nombreRegex;
    const ciRegex = /^\d+(-[A-Z]{1,5})?$/;
    const correoRegex = /^[\w\.-]+@(gmail|hotmail|outlook|yahoo)\.com$/;
    const telefonoRegex = /^\d{8}$/;

    this.nombreInvalido = !nombreRegex.test(this.tutorData.nombres);
    this.apellidoInvalido = !apellidoRegex.test(this.tutorData.apellidos);
    this.ciInvalido = !ciRegex.test(this.tutorData.ci);
    this.correoInvalido = !correoRegex.test(this.tutorData.correo);
    this.telefonoInvalido = !telefonoRegex.test(this.tutorData.telefono);

    return !(
      this.nombreInvalido ||
      this.apellidoInvalido ||
      this.ciInvalido ||
      this.correoInvalido ||
      this.telefonoInvalido
    );
  }

  // VALIDACIONES EN TIEMPO REAL

  validarEntradaNombres(event: KeyboardEvent): boolean {
    const tecla = event.key;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;
    if (!regex.test(tecla)) {
      this.nombreInvalido = true;
      event.preventDefault();
      return false;
    }
    this.nombreInvalido = false;
    return true;
  }

  validarEntradaApellidos(event: KeyboardEvent): boolean {
    const tecla = event.key;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;
    if (!regex.test(tecla)) {
      this.apellidoInvalido = true;
      event.preventDefault();
      return false;
    }
    this.apellidoInvalido = false;
    return true;
  }

  validarEntradaCI(event: KeyboardEvent): boolean {
    const tecla = event.key;
    if (/[0-9]/.test(tecla)) {
      this.ciInvalido = false;
      return true;
    }
    if (tecla === '-') {
      if (this.tutorData.ci.indexOf('-') === -1 && this.tutorData.ci.length > 0) {
        this.ciInvalido = false;
        return true;
      } else {
        this.ciInvalido = true;
        event.preventDefault();
        return false;
      }
    }
    if (/[a-zA-Z]/.test(tecla)) {
      if (this.tutorData.ci.indexOf('-') > -1) {
        const partes = this.tutorData.ci.split('-');
        const letras = partes[1] || '';
        if (letras.length < 5 && tecla === tecla.toUpperCase()) {
          this.ciInvalido = false;
          return true;
        }
      }
    }
    this.ciInvalido = true;
    event.preventDefault();
    return false;
  }

  validarEntradaTelefono(event: KeyboardEvent): boolean {
    const tecla = event.key;
    if (/[0-9]/.test(tecla)) {
      if (this.tutorData.telefono.length >= 8) {
        this.telefonoInvalido = true;
        event.preventDefault();
        return false;
      }
      this.telefonoInvalido = false;
      return true;
    }
    this.telefonoInvalido = true;
    event.preventDefault();
    return false;
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

  // Método para descargar plantilla CSV
  descargarPlantilla() {
    // Crear contenido CSV con encabezados
    let csvContent = this.encabezadosExcel.join(',') + '\n';
    
    // Ejemplo de fila (opcional)
    // csvContent += 'Ejemplo1,Ejemplo2,Ejemplo3\n';
    
    // Crear blob (archivo binario)
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Crear enlace de descarga
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'plantilla_inscripcion.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}