import { Component, Input } from '@angular/core';
import { Area } from '../../interfaces/area.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-areas-card',
  imports: [CommonModule],
  templateUrl: './areas-card.component.html',
})
export class AreasCardComponent {



      @Input({required:true})
      Area!:Area;



}
