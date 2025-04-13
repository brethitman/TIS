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

  // Para nombres: permite solo letras y espacios.
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

  // Para apellidos: mismo comportamiento que nombres.
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
  // Para CI: se permite dígitos; si se ingresa un guion, sólo se permiten letras mayúsculas después.
  validarEntradaCI(event: KeyboardEvent): boolean {
    const tecla = event.key;
    // Permitir dígitos siempre
    if (/[0-9]/.test(tecla)) {
      this.ciInvalido = false;
      return true;
    }
    // Permitir guion si aún no se ha ingresado y no es el primer carácter
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
    // Permitir letras solo si ya se ingresó el guion y máximo 5 letras
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

  // Para teléfono: solo dígitos y máximo 8 caracteres.
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
  seleccionarArchivo() {
    const input = document.getElementById('archivoExcel') as HTMLInputElement;
    input.click();
  }
  archivoElegido(event: any) {
    this.archivoSeleccionado = event.target.files[0];
    if (this.archivoSeleccionado) {
      this.subirArchivo();
    }
  }

  subirArchivo() {
    const formData = new FormData();
    formData.append('archivo', this.archivoSeleccionado as File);
    console.log("Reciviendo Archivo..", this.archivoSeleccionado)
    this.http.post('/olimpistaExel', formData)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response); // Ahora estás utilizando 'response'
          alert('Archivo subido exitosamente');
        },
        error: (error) => console.error('Error al subir el archivo', error)
      });
  }
}
