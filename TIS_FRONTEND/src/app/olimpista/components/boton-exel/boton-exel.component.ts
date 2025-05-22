import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { AreaAlumnoComponent } from '../area-alumno/area-alumno.component';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-boton-exel',
  templateUrl: './boton-exel.component.html',
  imports: [CommonModule, FormsModule, AreaAlumnoComponent],

})

export class BotonExelComponent {

  @Output() estudianteSeleccionado = new EventEmitter<any>();
  @Output() areaSeleccionada = new EventEmitter<any>();
  @Output() inscribir = new EventEmitter<void>();

  showModal1: boolean = false;
  showModal2: boolean = false;
  confirmSubida: boolean = false;
  modalError: boolean = false;
  nombreArchivo: string = '';
  tamanoArchivo: string = '';
  datosExcel: any[][] = [];
  datosEstudiantes: any[][] = [];
  datosTutores: any[][] = [];
  mensajeError: string[] = [];
  tutor = {
    nombre: '',
    apellido: '',
    ci: ''
  };
  errors = {
    nombre: '',
    apellido: '',
    ci: ''
  };
  isStudentDropdownOpen: boolean = false;
  estudiantes: any[] = [];
  

  onFileChange(event: any): void {
    const target: DataTransfer = <DataTransfer>event.target;

    if (target.files.length !== 1) {
      console.error('Selecciona un solo archivo Excel.');
      return;
    }

    const file = target.files[0];
    const fileName = file.name;
    const fileSize = (file.size / 1024).toFixed(2); // Tamaño en KB

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const nombreHoja: string = workbook.SheetNames[0];
      const hoja = workbook.Sheets[nombreHoja];

      let datos: any[][] = XLSX.utils.sheet_to_json(hoja, { header: 1 });
      const encabezados = datos[0];
      const indiceFechaNacimiento = encabezados.indexOf('Fecha de Nacimiento');
      if (indiceFechaNacimiento !== -1) { // Si la columna existe
        datos = datos.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            if (typeof cell === 'number' && cell > 30000 && colIndex === indiceFechaNacimiento) {
              // Convertimos solo si está en la columna de Fecha de Nacimiento
              const fechaConvertida = new Date((cell - 25569) * 86400000);
              return fechaConvertida.toLocaleDateString('es-ES'); // Formato dd/mm/aaaa
            }
            return cell;
          })
        );
      }
      this.datosExcel = datos;
      this.procesarEstudiantes(datos);

      if (this.confirmSubida && fileName === 'Formato_solo_Estudiantes.xlsx') {
        console.log('Datos subidos:', this.datosExcel);
      } else if (this.confirmSubida && fileName === 'Formato_Varios_Tutores.xlsx') {
        console.log('Formato 2 subido correctamente1:', fileName, fileSize);
      } else {
      }
      this.procesarDatosExcel(this.datosExcel, file.name);
    };

    reader.readAsBinaryString(file);

    if (fileName === 'Formato_solo_Estudiantes.xlsx') {
      this.showModal1 = true;
    } else if (fileName === 'Formato_Varios_Tutores.xlsx') {
      this.showModal2 = true;
    } else {
      alert('Archivo no válido, debe tener el mismo nombre que el formato descargado');
      return;
    }
    this.nombreArchivo = fileName;
    this.tamanoArchivo = fileSize;
  }
  procesarEstudiantes(datos: any[][]): void {
    if (datos.length < 2) {
      this.estudiantes = [];
      return;
    }
    const encabezados = datos[0].map(h => h.toString().trim());
    const filasDatos = datos.slice(1);

    console.log('Encabezados encontrados:', encabezados);

    const nombreIndex = encabezados.findIndex(h =>
      h.toLowerCase().includes('nombre') || h.toLowerCase().includes('nombres')
    );
    const apellidoIndex = encabezados.findIndex(h =>
      h.toLowerCase().includes('apellido') || h.toLowerCase().includes('apellidos')
    );
    const ciIndex = encabezados.findIndex(h =>
      h.toLowerCase().includes('ci') || h.toLowerCase().includes('cédula') || h.toLowerCase().includes('cedula')
    );

    this.estudiantes = filasDatos.map(fila => ({
      nombre: nombreIndex >= 0 ? fila[nombreIndex] : 'Nombre no disponible',
      apellido: apellidoIndex >= 0 ? fila[apellidoIndex] : '',
      ci: ciIndex >= 0 ? fila[ciIndex] : '',
    })).filter(est => est.nombre && est.nombre !== 'Nombre no disponible');

    console.log('Estudiantes procesados:', this.estudiantes); // Para depuración
  }

  validateTutor(): boolean {
    let isValid = true;
    this.errors = { nombre: '', apellido: '', ci: '' };

    if (!this.tutor.nombre || this.tutor.nombre.trim() === '') {
      this.errors.nombre = 'El nombre es requerido';
      isValid = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.tutor.nombre)) {
      this.errors.nombre = 'El nombre solo debe contener letras';
      isValid = false;
    }

    if (!this.tutor.apellido || this.tutor.apellido.trim() === '') {
      this.errors.apellido = 'El apellido es requerido';
      isValid = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.tutor.apellido)) {
      this.errors.apellido = 'El apellido solo debe contener letras';
      isValid = false;
    }

    if (!this.tutor.ci || this.tutor.ci.trim() === '') {
      this.errors.ci = 'El CI es requerido';
      isValid = false;
    } else if (!/^\d+$/.test(this.tutor.ci)) {
      this.errors.ci = 'El CI solo debe contener números';
      isValid = false;
    } else if (this.tutor.ci.length < 6 || this.tutor.ci.length > 10) {
      this.errors.ci = 'El CI debe tener entre 6 y 10 dígitos';
      isValid = false;
    }

    return isValid;
  }

  submitTutorInfo(): void {
    if (!this.validateTutor()) {
      return;
    }
    this.confirmSubida = true;
    this.modalError  = true;
    console.log('Datos del tutor:', this.tutor);
    this.showModal1 = false;
    this.tutor = { nombre: '', apellido: '', ci: '' };
    this.errors = { nombre: '', apellido: '', ci: '' };
  }

  cancelar1(): void {
    this.confirmSubida = false;
    this.showModal1 = false;
    console.log('Subida cancelada');
    this.tutor = { nombre: '', apellido: '', ci: '' };
    this.errors = { nombre: '', apellido: '', ci: '' };
  }

  openModal2(): void {
    this.confirmSubida = true;
    this.showModal2 = false;
    this.modalError  = true;
  }

  cancelar2(): void {
    this.confirmSubida = false;
    this.showModal2 = false;
    this.datosExcel = [];
    this.datosEstudiantes = [];
    this.datosTutores = [];
    this.tamanoArchivo = '';
    this.nombreArchivo = '';
    console.log('Subida cancelada');
  }

  volverSubir() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    this.modalError  = false;
    this.mensajeError = [];
    this.confirmSubida = false;
    this.datosEstudiantes = [];
    this.datosTutores = [];
    this.datosExcel = [];
    this.tamanoArchivo = '';
    this.nombreArchivo = '';
  }

  cerrar() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    this.modalError  = false;
  }

  procesarDatosExcel(datos: any[][], fileName: string): void {
    const filasConDatos = datos.filter(fila => fila.some(cell => cell !== undefined && cell !== ''));

    if (fileName === 'Formato_solo_Estudiantes.xlsx') {
      this.datosEstudiantes = filasConDatos;
      this.validacionesEst(filasConDatos);
      console.log('Lista de Estudiantes:', this.datosEstudiantes);
    } else if (fileName === 'Formato_Varios_Tutores.xlsx') {
      this.separarEstudiantesTutores(filasConDatos);
    }
  }

  separarEstudiantesTutores(filasConDatos: any[][]): void {
    const estudiantes: any[] = [];
    const tutores: any[] = [];
    let leyendoEstudiantes = true;

    filasConDatos.forEach((fila) => {
      const contieneNombreTutor = fila.some(cell =>
        typeof cell === 'string' && cell.trim().toLowerCase() === "nombre tutor"
      );

      if (contieneNombreTutor) {
        leyendoEstudiantes = false;
      }
      if (leyendoEstudiantes) {
        estudiantes.push(fila);
      } else {
        tutores.push(fila);
      }
    });
    this.datosEstudiantes = estudiantes;
    this.datosTutores = tutores;
    this.validacionesEst(this.datosEstudiantes)
    this.validacionesTutor(this.datosTutores)
  }

  validacionesEst(datosEst: any[][]) {
    const listaEstudiante = datosEst.slice(1);

    for (let index = 0; index < listaEstudiante.length; index++) {
      const fila = listaEstudiante[index];

      for (let celdaIndex = 0; celdaIndex < fila.length; celdaIndex++) {
        const nombre = fila[0]?.toString().trim();
        const apellido = fila[1]?.toString().trim();
        if (!nombre || !apellido) {
          this.mensajeError.push(`Error: Nombre y apellido son obligatorios en la fila ${index + 1}.\n`);
          break;
        }
        const ci = fila[2]?.toString().trim();
        if (!/^[19]\d{6,7}$/.test(ci)) {
          this.mensajeError.push(`Error: CI inválido en la fila ${index + 1}.\n`);
          break;
        }
        if (!ci) {
          this.mensajeError.push(`Error: El CI del tutor es obligatorio.\n`);
          break;
        }
        const fechaNacimiento = fila[3]?.toString().trim();
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(fechaNacimiento)) {
          this.mensajeError.push(`Error: Fecha de nacimiento inválida en la fila ${index + 1}. Debe cumplir con el formato dd/mm/aa.\n`);
          break;
        }
        if (!fechaNacimiento) {
          this.mensajeError.push(`Error: La fecha de nacimiento del estudiante es obligatorio.\n`);
          break;
        }
        const correo = fila[4]?.toString().trim();
        if (!correo.includes("@") || correo.includes(" ") ||
          (!correo.endsWith("@gmail.com") && !correo.endsWith("@Outlook.com"))) {
          this.mensajeError.push(`Error: Correo electrónico inválido:'${correo}'.\n`);
          break;
        }
        const unidadEducativa = fila[5]?.toString().trim();
        if (!unidadEducativa) {
          this.mensajeError.push(`Error: Unidad educativa es obligatoria en la fila ${index + 1}.\n`);
          break;
        }
        const departamento = fila[6]?.toString().trim();
        if (!departamento) {
          this.mensajeError.push(`Error: Departamento es obligatorio en la fila ${index + 1}.\n`);
          break;
        }
        const provincia = fila[7]?.toString().trim();
        if (!provincia) {
          this.mensajeError.push(`Error: Provincia es obligatoria en la fila ${index + 1}.\n`);
          break;
        }
      }
    }

  }
  validacionesTutor(datosTutor: any[][]) {
    const listaTutor = datosTutor.slice(1);

    for (let index = 0; index < listaTutor.length; index++) {
      const fila = listaTutor[index];

      for (let celdaIndex = 0; celdaIndex < fila.length; celdaIndex++) {
        const nombre = fila[0]?.toString().trim();
        const apellido = fila[1]?.toString().trim();
        if (!nombre || !apellido) {
          this.mensajeError.push(`Error: Nombre y apellido son obligatorios en la fila ${index + 1}.\n`);
          break;
        }
        const ci = fila[2]?.toString().trim();
        if (!/^[19]\d{6,7}$/.test(ci)) {
          this.mensajeError.push(`Error: CI inválido en la fila ${index + 1}.\n`);
          break;
        }
        if (!ci) {
          this.mensajeError.push(`Error: El CI del tutor es obligatorio.\n`);
          break;
        }
        const correo = fila[3]?.toString().trim();
        if (!correo.includes("@") || correo.includes(" ") ||
          (!correo.endsWith("@gmail.com") && !correo.endsWith("@Outlook.com"))) {
          this.mensajeError.push(`Error: Correo electrónico inválido:'${correo}'.\n`);
          break;
        }
        if (!correo) {
          this.mensajeError.push(`Error: El Correo del tutor es obligatorio.\n`);
          break;
        }
        const celular = fila[4]?.toString().trim();
        if (!/^[67]\d{7}$/.test(celular)) {
          this.mensajeError.push(`Error: Número de celular inválido: '${celular}'.\n `);
          break;
        }
        if (!celular) {
          this.mensajeError.push(`Error: El Número de celular del tutor es obligatorio.\n`);
          break;
        }
      }
    }
    console.log("Lista de errores:", this.mensajeError);

  }
  

}
