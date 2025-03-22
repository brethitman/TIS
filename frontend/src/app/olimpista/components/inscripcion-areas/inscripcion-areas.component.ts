import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { AreaService } from '../../service/area.service';
import { Area } from '../../interfaces/area.interface';

@Component({
  selector: 'app-inscripcion-areas',
  standalone: true, // Indica que es un componente standalone
  imports: [FormsModule], // Importa FormsModule aquí
  templateUrl: './inscripcion-areas.component.html',

})
export class InscripcionAreasComponent {
  area: Area = {
    id: 0,
    nombre_area: '',
    costo: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  constructor(private areaService: AreaService) {}

  onSubmit(): void {
    this.areaService.createArea(this.area).subscribe(
      (response) => {
        console.log('Área guardada:', response);
        alert('Área guardada con éxito');
      },
      (error) => {
        console.error('Error al guardar el área:', error);
        alert('Hubo un error al guardar el área');
      }
    );
  }
}
