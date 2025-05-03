import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-boton-exel',
  templateUrl: './boton-exel.component.html',
  imports: [CommonModule, FormsModule],
})
export class BotonExelComponent {
  showModal1: boolean = false;
  showModal2: boolean = false;
  confirmSubida: boolean = false;
  nombreArchivo: string = '';
  tamanoArchivo: string = '';
  mensajeError: string = '';
  datosExcel: any[][] = [];
  datosEstudiantes: any[][] = [];
  datosTutores: any[][] = [];
  tutor = {
    nombre: '',
    apellido: '',
    ci: ''
  };

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


  submitTutorInfo(): void {
    this.confirmSubida = true;
    console.log('Datos del tutor:', this.tutor);
    this.showModal1 = false;
  }

  cancelar1(): void {
    this.confirmSubida = false;
    this.showModal1 = false;
    console.log('Subida cancelada');
  }

  openModal2(): void {
    this.confirmSubida = true;
    this.showModal2 = false;
  }

  cancelar2(): void {
    this.confirmSubida = false;
    this.showModal2 = false;
    this.datosExcel = [];
    this.datosEstudiantes = [];
    this.datosTutores = [];
    this.tamanoArchivo = '';
    this.nombreArchivo= '';
    console.log('Subida cancelada');
  }

  procesarDatosExcel(datos: any[][], fileName: string): void {
    const filasConDatos = datos.filter(fila => fila.some(cell => cell !== undefined && cell !== ''));

    if (fileName === 'Formato_solo_Estudiantes.xlsx') {
      this.datosEstudiantes = filasConDatos;
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
    console.log("Lista de los tutores:", tutores)
    this.validacionesEst(this.datosEstudiantes)
    this.validacionesTutor(this.datosTutores)
  }

  validacionesEst(datosEst: any[][]) {
    const listaEstudiante = datosEst.slice(1);
    let mensaje = "";

    listaEstudiante.forEach((fila, index) => {
      fila.forEach((celda, celdaIndex) => {
        if (!celda || celda.toString().trim() === "") {
          mensaje += `Error: La celda en fila ${index + 1}, columna ${celdaIndex + 1} está vacía.\n`;
        }
      });
    });

  }
  validacionesTutor(datosTutor: any[][]) {
    const listaTutor = datosTutor.slice(1);
    let mensaje = "";

    for (let index = 0; index < listaTutor.length; index++) {
      const fila = listaTutor[index];

      for (let celdaIndex = 0; celdaIndex < fila.length; celdaIndex++) {
          const celda = fila[celdaIndex];

          if (!celda || celda.toString().trim() === "") {
              mensaje += `Error: Ninguna información del tutor no debe estar vacia\n`;
              break; 
          }
          const correo = fila[3]?.toString().trim();
        if (!correo.includes("@") || correo.includes(" ") || 
            (!correo.endsWith("@gmail.com") && !correo.endsWith("@Outlook.com"))) {
            mensaje += `Error: Correo electrónico inválido:'${correo}'.\n`;
            break;
        }
        const celular = fila[4]?.toString().trim();
        if (!/^[67]\d{7}$/.test(celular)) {
            mensaje += `Error: Número de celular inválido (El numero debe ser de bolivia): '${celular}'.\n `;
            break;
        }
      }
  }
    this.mensajeError = mensaje;
    console.log("Este es el mensaje de validacion:", mensaje, "y este mensaje que se copio",this.mensajeError);

  }

}
