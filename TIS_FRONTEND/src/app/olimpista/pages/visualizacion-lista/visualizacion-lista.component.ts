import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BotonExelComponent } from '../../components/boton-exel/boton-exel.component';
import { Workbook } from 'exceljs';

@Component({
  selector: 'app-visualizacion-lista',
  standalone: true,
  imports: [CommonModule, BotonExelComponent],
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
  async generarPrimerFormato() {
    // 1. Crear libro de trabajo
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Formato 1');

    // Encabezados
    worksheet.addRow([
      'Nombres', 'Apellidos', 'CI', 'Fecha de Nacimiento',
      'Correo Electrónico', 'Colegio', 'Departamento', 'Provincia'
    ]);

    // Datos de ejemplo
    const estudiantes = [
      ['Juan', 'Perez', '12345678', '15/05/2000', 'juan.perez@email.com', 'Colegio Nacional', 'La Paz', 'Murillo'],
      ['Ana', 'Lopez', '87654321', '20/08/2001', 'ana.lopez@email.com', 'Colegio Privado', 'Santa Cruz', 'Andrés Ibáñez'],
      ['Carlos', 'Gomez', '45678912', '10/03/2002', 'carlos.gomez@email.com', 'Colegio Modelo', 'Cochabamba', 'Cercado'],
      ['Maria', 'Rodriguez', '78912345', '25/07/2001', 'maria.rodriguez@email.com', 'Colegio Alemán', 'La Paz', 'Murillo'],
      ['Luis', 'Fernandez', '32165498', '30/11/2000', 'luis.fernandez@email.com', 'Colegio Francés', 'Santa Cruz', 'Warnes'],
      ['Sofia', 'Martinez', '65498732', '05/01/2003', 'sofia.martinez@email.com', 'Colegio Británico', 'Tarija', 'Cercado']
    ];
  
    estudiantes.forEach(estudiante => worksheet.addRow(estudiante));

    // Estilo encabezados (negrita y fondo)
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF2F2F2' } // Gris muy claro
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    // Bordes para todas las celdas de datos
    for (let i = 2; i <= worksheet.rowCount; i++) {
      worksheet.getRow(i).eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    }

    // 4. Ajustar anchos de columna
    worksheet.columns = [
      { width: 15 }, { width: 15 }, { width: 12 }, { width: 20 },
      { width: 25 }, { width: 20 }, { width: 15 }, { width: 15 }, { width: 15 }
    ];

    // 5. Generar y descargar archivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Formato_solo_Estudiantes.xlsx';
    link.click();
    link.remove();
  }
  //Método para generar el segundo formato 

  async generarSegundoFormato() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Formato 2');
  
    // Encabezados estudiantes
    const encabezadosEstudiantes = [
      'Nombre Estudiante', 'Apellido Estudiante', 'CI', 
      'Fecha de Nacimiento', 'Correo Electrónico', 
      'Colegio', 'Curso', 'Departamento', 'Provincia'
    ];
    worksheet.addRow(encabezadosEstudiantes);
  
    // Filas vacías para estudiantes (6 filas)
    for (let i = 0; i < 6; i++) {
      worksheet.addRow(Array(9).fill('')); // 9 columnas vacías
    }
  
    // Encabezados tutores
    const encabezadosTutores = [
      'Nombre Tutor', 'Apellido Tutor', 'CI', 
      'Correo Electrónico', 'Teléfono/Celular'
    ];
    worksheet.addRow(encabezadosTutores);
  
    // Filas vacías para tutores (6 filas)
    for (let i = 0; i < 6; i++) {
      worksheet.addRow(Array(5).fill('')); // 5 columnas vacías
    }
  
    // Estilo para encabezados
    [1, 8].forEach(rowNum => {
      const row = worksheet.getRow(rowNum);
      row.font = { bold: true };
      row.eachCell(cell => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF2F2F2' } // Gris claro
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });
  
    // Bordes para todas las celdas con datos
    for (let i = 1; i <= 16; i++) {
      const row = worksheet.getRow(i);
      row.eachCell({ includeEmpty: true }, cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    }
  
    // 4. Configurar anchos de columna
    worksheet.columns = [
      { width: 18 }, { width: 18 }, { width: 15 }, // Nombres, Apellidos, CI
      { width: 18 }, { width: 25 }, // Fecha Nac, Correo
      { width: 20 }, { width: 10 }, // Colegio, Curso
      { width: 15 }, { width: 15 }  // Departamento, Provincia
    ];
  
    // 5. Generar archivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Formato_Varios_Tutores.xlsx';
    link.click();
  }
}

