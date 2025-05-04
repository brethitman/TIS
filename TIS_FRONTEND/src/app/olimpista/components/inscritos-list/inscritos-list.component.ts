import { Component, Input } from '@angular/core';
import { InscritosCardComponent } from '../inscritos-card/inscritos-card.component';
import { Inscripcion } from '../../interfaces/inscripcion.interface';

@Component({
  selector: 'app-inscritos-list',
  standalone: true,
  imports: [InscritosCardComponent],

})
export class InscritosListComponent {

  @Input({required:true})
  Inscripcione!: any[];


}
