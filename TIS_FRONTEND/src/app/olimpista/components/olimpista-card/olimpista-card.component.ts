import { Component, Input } from '@angular/core';

import { Olimpista } from '../../interfaces/olimpista-response';


@Component({
  selector: 'app-olimpista-card',
  standalone:true,
  imports: [],
  templateUrl: './olimpista-card.component.html',
})

export class OlimpistaCardComponent {

  @Input({required:true})
    Olimpista!:Olimpista;
}
