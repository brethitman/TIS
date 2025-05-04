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
  nombreArchivo: string = '';
  tamanoArchivo: string = '';
  datosExcel: any[][] = [];
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

      const datos: any[][] = XLSX.utils.sheet_to_json(hoja, { header: 1 });
      this.datosExcel = datos;
      this.procesarEstudiantes(datos);

      if (this.confirmSubida && fileName === 'Formato_solo_Estudiantes.xlsx') {
        console.log('Datos subidos:', this.datosExcel);
      } else if (this.confirmSubida && fileName === 'Formato_Varios_Tutores.xlsx') {
        console.log('Formato 2 subido correctamente:', fileName, fileSize);
      } else {
      }
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

    // Asumimos que la primera fila son los encabezados
    const encabezados = datos[0].map(h => h.toString().trim());
    const filasDatos = datos.slice(1);

    console.log('Encabezados encontrados:', encabezados); // Para depuración

    // Buscar índices de columnas con nombres flexibles
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

  // Función para validar los campos del tutor
  validateTutor(): boolean {
    let isValid = true;
    this.errors = { nombre: '', apellido: '', ci: '' };

    // Validación para nombre
    if (!this.tutor.nombre || this.tutor.nombre.trim() === '') {
      this.errors.nombre = 'El nombre es requerido';
      isValid = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.tutor.nombre)) {
      this.errors.nombre = 'El nombre solo debe contener letras';
      isValid = false;
    }

    // Validación para apellido
    if (!this.tutor.apellido || this.tutor.apellido.trim() === '') {
      this.errors.apellido = 'El apellido es requerido';
      isValid = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.tutor.apellido)) {
      this.errors.apellido = 'El apellido solo debe contener letras';
      isValid = false;
    }
    // Validación para CI
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
    // Validar antes de enviar
    if (!this.validateTutor()) {
      return;
    }
    this.confirmSubida = true;
    console.log('Datos del tutor:', this.tutor);
    this.showModal1 = false;
    // Resetear el formulario después de enviar
    this.tutor = { nombre: '', apellido: '', ci: '' };
    this.errors = { nombre: '', apellido: '', ci: '' };

  }

  cancelar1(): void {
    this.confirmSubida = false;
    this.showModal1 = false;
    console.log('Subida cancelada');

    // Resetear el formulario al cancelar
    this.tutor = { nombre: '', apellido: '', ci: '' };
    this.errors = { nombre: '', apellido: '', ci: '' };
  }

  openModal2(): void {
    this.confirmSubida = true;
    console.log('Formato 2 subido:', this.nombreArchivo, this.tamanoArchivo);
    this.showModal2 = false;
  }

  cancelar2(): void {
    this.confirmSubida = false;
    this.showModal2 = false;
    console.log('Subida cancelada');
  }
  isAreaDropdownOpen: boolean = false;
  areas = [
    { nombre: 'Física' },
    { nombre: 'Matemáticas' },
    { nombre: 'Química' },
    { nombre: 'Biología' }
  ];
}
