import { Component, Input } from '@angular/core';
import { AreasCardComponent } from '../areas-card/areas-card.component';
import { Area } from '../../interfaces/inscripcion.interface';

@Component({
  selector: 'app-areas-list',
  imports: [AreasCardComponent],
  templateUrl: './areas-list.component.html',

})
export class AreasListComponent {

  @Input({required:true})
  Area!: any[];

}
