import { Component, input, Input } from '@angular/core';
import { OlimpistaCardComponent } from "../olimpista-card/olimpista-card.component";
import { Olimpista } from '../../interfaces/olimpista-response';
import { Datum } from '../../interfaces/comprobante.interface';

//import { OlimpistaElement } from '../../interfaces/olimpista-response';
//import { Olimpista } from '../../interfaces/comprobante.interface';

@Component({
  selector: 'app-olimpista-list',
  standalone: true,
  imports: [OlimpistaCardComponent],
  templateUrl: './olimpista-list.component.html',
})
export class OlimpistaListComponent {


  @Input({required:true})
  Olimpista!: any[];


}
