import { Component,EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { olimpiadabyArea } from '../../interfaces/areavisualizacion.interface';

@Component({
  selector: 'app-areas-carrusel',
  imports: [CommonModule],
  templateUrl: './areas-carrusel.component.html',
  standalone: true,
})
export class AreasCarruselComponent {

  @Input({ required: true })
  Area!: olimpiadabyArea[];

  @Output()
  areaSelected = new EventEmitter<olimpiadabyArea>(); 
  areaSeleccionada: any;

  onAreaClick(area: olimpiadabyArea) {
    this.areaSelected.emit(area);
    this.areaSeleccionada = area;
  }
}
