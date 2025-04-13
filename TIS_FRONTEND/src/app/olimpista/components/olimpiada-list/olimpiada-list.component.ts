import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlimpiadaCardComponent } from '../olimpiada-card/olimpiada-card.component';
import { Olimpiada } from '../../interfaces/olimpiada.interfacel';


@Component({
  standalone: true,
  selector: 'app-olimpiada-list',
  imports: [CommonModule, OlimpiadaCardComponent],
  templateUrl: './olimpiada-list.component.html',
})
export class OlimpiadaListComponent {
  @Input({ required: true }) Olimpiada!: any[];

  onOlimpiadaEliminada(id: number): void {
    this.Olimpiada = this.Olimpiada.filter(o => o.id !== id);
  }
}