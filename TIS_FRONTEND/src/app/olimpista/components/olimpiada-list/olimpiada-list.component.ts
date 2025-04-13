import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlimpiadaCardComponent } from '../olimpiada-card/olimpiada-card.component';
import { Olimpiada } from '../../interfaces/olimpiada.interfacel';

@Component({
  selector: 'app-olimpiada-list',
  standalone: true,
  imports: [CommonModule, OlimpiadaCardComponent],
  templateUrl: './olimpiada-list.component.html',
})
export class OlimpiadaListComponent {
  @Input({ required: true }) olimpiadas!: Olimpiada[];
}