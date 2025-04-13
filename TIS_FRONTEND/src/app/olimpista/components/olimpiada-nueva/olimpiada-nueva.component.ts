import { Component } from '@angular/core';
import { OlimpiadaService } from '../../service/olimpiada.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Olimpiada } from '../../interfaces/olimpiada.interfacel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olimpiada-nueva',
  templateUrl: './olimpiada-nueva.component.html',
  imports: [CommonModule, FormsModule],
})
export class OlimpiadaNuevaComponent {

  // Propiedad que almacena los datos de la nueva olimpiada
  nuevaOlimpiada: Olimpiada = {
    id: 0, // Asignar un id inicial (podría ser auto-generado por el backend)
    nombre_olimpiada: '',
    descripcion_olimpiada: '',
    fecha_inicio: new Date(),  // Fecha de inicio como Date
    fecha_final: new Date(),   // Fecha de finalización como Date
    createdAt: new Date(),     // Fecha de creación
    updatedAt: new Date(),     // Fecha de última actualización
  };

  // Constructor con servicio y router
  constructor(private olimpiadaService: OlimpiadaService, private router: Router) { }

  // Método para crear una nueva olimpiada
  crearOlimpiada(): void {
    // Convertir las fechas de string a Date antes de enviarlas al backend
    const fechaInicio = new Date(this.nuevaOlimpiada.fecha_inicio);
    const fechaFin = new Date(this.nuevaOlimpiada.fecha_final);

    // Validar si las fechas son válidas
    if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
      console.error('Fechas inválidas');
      return;
    }

    // Asignar las fechas convertidas a la nueva olimpiada
    this.nuevaOlimpiada.fecha_inicio = fechaInicio;
    this.nuevaOlimpiada.fecha_final = fechaFin;

    // Llamada al servicio para guardar la nueva olimpiada en el backend
    this.olimpiadaService.crearOlimpiada(this.nuevaOlimpiada).subscribe(response => {
      console.log('Olimpiada creada con éxito', response);
      // Redirigir a una página de éxito o a la lista de olimpiadas
      this.router.navigate(['/olimpiadas']);
    }, error => {
      console.error('Error al crear la olimpiada', error);
    });
  }
}
