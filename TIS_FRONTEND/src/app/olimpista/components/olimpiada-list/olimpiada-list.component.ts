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


/*@Component({
  standalone: true,
  selector: 'app-olimpiada-list',
  imports: [CommonModule, OlimpiadaCardComponent],
  templateUrl: './olimpiada-list.component.html',
})
export class OlimpiadaListComponent {
  //@Input({ required: true }) Olimpiada!: any[];
  @Input({ required: true }) Olimpiadas: Olimpiada[] = [];
  @Output() olimpiadaCreada = new EventEmitter<Olimpiada>();

  agregarOlimpiada(nuevaOlimpiada: Olimpiada) {
    this.Olimpiadas = [nuevaOlimpiada, ...this.Olimpiadas]; 

  }

  onOlimpiadaEliminada(id: number): void {
    this.Olimpiadas = this.Olimpiadas.filter(o => o.id !== id);
  }*/