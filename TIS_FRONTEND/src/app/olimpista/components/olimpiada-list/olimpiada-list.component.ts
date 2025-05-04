import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlimpiadaCardComponent } from '../olimpiada-card/olimpiada-card.component';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';
import { Area } from '../../interfaces/area.interface';

@Component({
  standalone: true,
  selector: 'app-olimpiada-list',
  imports: [CommonModule, OlimpiadaCardComponent],
  templateUrl: './olimpiada-list.component.html',
})
export class OlimpiadaListComponent {
  @Input({ required: true }) olimpiada: Olimpiada[] = [];
  @Input() areas: Area[] = [];
  @Input() olimpiadas: Olimpiada[] = [];
  @Output() olimpiadaActualizada = new EventEmitter<Olimpiada>();

  onOlimpiadaEliminada(id: number): void {
    this.olimpiada = this.olimpiada.filter(o => o.id !== id);
  }

  onOlimpiadaActualizada(actualizada: Olimpiada): void {
    this.olimpiadaActualizada.emit(actualizada);
  }
}
//OJOOOOOO11
