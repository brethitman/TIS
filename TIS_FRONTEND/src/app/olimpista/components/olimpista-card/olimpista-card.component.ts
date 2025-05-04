import { Component, Input } from '@angular/core';

import { Inscripcione ,Area,Olimpista,Tutor} from '../../interfaces/inscripcion.interface';


@Component({
  selector: 'app-olimpista-card',
  standalone:true,
  imports: [],
  templateUrl: './olimpista-card.component.html',
})

export class OlimpistaCardComponent {

  @Input({required:true})
  Inscripcione!:Inscripcione;
}
