import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BotonExelComponent } from '../../components/boton-exel/boton-exel.component';
import * as XLSX from 'xlsx';

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

  generarPrimerFormato(): void {
    const datos = [
      ['Nombres', 'Apellidos', 'CI'], // Encabezados
      ['Juan', 'Perez', '12345678'],
      ['Ana', 'Lopez', '87654321'],
    ];

    const hojaDeTrabajo = XLSX.utils.aoa_to_sheet(datos);
    const libroDeTrabajo = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libroDeTrabajo, hojaDeTrabajo, 'Formato 1');

    XLSX.writeFile(libroDeTrabajo, 'Formato_solo_Estudiantes.xlsx');
  }

  generarSegundoFormato(): void {
    const datosEstudiante = [
      ['Nombre Estudiante', 'Apellido Estudiante', 'CI', 'Fecha de Nacimiento', 'Correo Electronico', 'Colegio', 'Departamento', 'Provincia'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
    ];

    const datosTutor = [
      ['Nombre Tutor', 'Apellido Tutor', 'CI', 'Correo Electronico', 'Telefono/Celular'],

    ];

    const datosCombinados = [...datosEstudiante, ...datosTutor];

    const hojaDeTrabajo = XLSX.utils.aoa_to_sheet(datosCombinados);
    const libroDeTrabajo = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libroDeTrabajo, hojaDeTrabajo, 'Formato 2');
    XLSX.writeFile(libroDeTrabajo, 'Formato_Varios_Tutores.xlsx');
  }
}

