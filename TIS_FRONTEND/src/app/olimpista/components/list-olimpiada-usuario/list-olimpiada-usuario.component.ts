import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlimpiadaCardComponent } from '../olimpiada-card/olimpiada-card.component';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';
import { Area } from '../../interfaces/area.interface';
import { CardOlimpiadaUsuarioComponent } from '../card-olimpiada-usuario/card-olimpiada-usuario.component';

@Component({
  selector: 'app-olimpiadasUsuario-list',
  standalone: true,
  imports: [CommonModule, CardOlimpiadaUsuarioComponent], // Importa el componente hijo aquí
  templateUrl: './list-olimpiada-usuario.component.html',
  // No necesitas el DatePipe aquí si solo se usa en el componente hijo
})
export class OlimpiadasListUsuarioComponent  {
 @Input({ required: true }) olimpiada: Olimpiada[] = [];
  @Input() areas: Area[] = [];
  @Input() olimpiadas: Olimpiada[] = [];


}
