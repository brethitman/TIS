import { Component,EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Area } from '../../interfaces/area.interface';

@Component({
  selector: 'app-areas-carrusel',
  imports: [CommonModule],
  templateUrl: './areas-carrusel.component.html',
  standalone: true,
})
export class AreasCarruselComponent {

  @Input({ required: true })
  Area!: Area[];

  @Output()
  areaSelected = new EventEmitter<Area>(); 
  areaSeleccionada: any;

  onAreaClick(area: Area) {
    this.areaSelected.emit(area);
    this.areaSeleccionada = area;
  }
}
