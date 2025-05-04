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
  // Variables para controlar el modal
  mostrarModalFormato = false;
  archivoError = '';
  archivoSubido = false;

  @Output() continuar = new EventEmitter<void>();
  @Output() tutorChanged = new EventEmitter<any>();
  constructor(private http: HttpClient) { }

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
    const nombreRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{3,255}$/;
    const apellidoRegex = nombreRegex;
    const correoRegex = /^[\w\.-]+@(gmail|hotmail|outlook|yahoo)\.com$/;
    const telefonoRegex = /^[67]\d{7}$/;

    const ci = this.tutorData.ci;
  const partes = ci.split('-');
  const ciPrincipal = partes[0];
  const ciExtra = partes[1] || '';

  const ciRegexPrincipal = /^\d{7,10}$/;
  let ciValido = ciRegexPrincipal.test(ciPrincipal);

  if (ciValido && partes.length === 2) {
    // Validar parte después del guion
    const primerDigito = ciPrincipal.charAt(0);
    const extraRegex = new RegExp(`^${primerDigito}[A-Z]$`);
    ciValido = extraRegex.test(ciExtra);
  } else if (partes.length > 2) {
    ciValido = false;
  }

    this.nombreInvalido = !nombreRegex.test(this.tutorData.nombres);
    this.apellidoInvalido = !apellidoRegex.test(this.tutorData.apellidos);
    this.ciInvalido = !ciValido;    this.correoInvalido = !correoRegex.test(this.tutorData.correo);
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
    const valorActual = this.tutorData.ci;
  
    // Permitir borrar y navegación
    if (['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(tecla)) {
      return true;
    }
  
    // Solo permitir dígitos antes del guion (máx 10)
    if (!valorActual.includes('-')) {
      if (/\d/.test(tecla)) {
        if (valorActual.length < 10) {
          return true;
        } else {
          event.preventDefault();
          return false;
        }
      }
  
      // Permitir guion solo si ya hay al menos 7 dígitos
      if (tecla === '-' && valorActual.length >= 7 && valorActual.length <= 10) {
        return true;
      }
  
      event.preventDefault();
      return false;
    }
  
    // Si ya se ingresó un guion, controlamos los 2 caracteres permitidos
    const partes = valorActual.split('-');
    const ciPrincipal = partes[0];
    const ciExtra = partes[1] || '';
  
    if (ciExtra.length >= 2) {
      event.preventDefault();
      return false;
    }
  
    // Primer carácter después del guion debe ser el mismo que el primer dígito
    if (ciExtra.length === 0 && tecla === ciPrincipal.charAt(0)) {
      return true;
    }
  
    // Segundo carácter: letra mayúscula
    if (ciExtra.length === 1 && /[A-Z]/.test(tecla)) {
      return true;
    }
  
    event.preventDefault();
    return false;
  }
  // Para teléfono: solo dígitos y máximo 8 caracteres.
  validarEntradaTelefono(event: KeyboardEvent): boolean {
    const tecla = event.key;
    const valorActual = this.tutorData.telefono;
  
    // Permitir borrar y navegación
    if (['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(tecla)) {
      return true;
    }
  
    // Solo permitir dígitos
    if (!/^\d$/.test(tecla)) {
      this.telefonoInvalido = true;
      event.preventDefault();
      return false;
    }
  
    // Validar primer dígito sea 6 o 7
    if (valorActual.length === 0 && !/[67]/.test(tecla)) {
      this.telefonoInvalido = true;
      event.preventDefault();
      return false;
    }
  
    // Limitar a 8 caracteres
    if (valorActual.length >= 8) {
      this.telefonoInvalido = true;
      event.preventDefault();
      return false;
    }
  
    this.telefonoInvalido = false;
    return true;
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
    this.http.post('http://localhost:8000/api/olimpistasExel', formData)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response); // Ahora estás utilizando 'response'
          alert('Archivo subido exitosamente');
        },
        error: (error) => console.error('Error al subir el archivo', error)
      });
  }
  // Método para mostrar el modal
  mostrarFormato(event: Event) {
    event.preventDefault();
    this.mostrarModalFormato = true;
  }

  // Método para descargar plantilla
  descargarPlantilla(event: Event) {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = 'public/plantillas/Formato_Inscripcion.xlsx'; // Ajusta esta ruta
    link.download = 'Formato_Inscripcion.xlsx'; // Nombre del archivo a descargar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Método para cerrar el modal
  cerrarModal() {
    this.mostrarModalFormato = false;
  }
}
