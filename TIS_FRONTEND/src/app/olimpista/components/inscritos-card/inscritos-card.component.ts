import { Component, Input } from '@angular/core';
import { Inscripcion } from '../../interfaces/inscripcion.interface';
import { GetInscripcionResponse } from '../../interfaces/get-inscripcion-response';

@Component({
  selector: 'app-inscritos-card',
  standalone: true,
  imports: [],
  templateUrl: './inscritos-card.component.html',
})
export class InscritosCardComponent {


    @Input({required:true})
    Inscripcione!:Inscripcion;


}
