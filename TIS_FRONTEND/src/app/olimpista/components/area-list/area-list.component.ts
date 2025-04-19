// area-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Area } from '../../interfaces/area.interface';
import { AreaCardComponent } from '../area-card/area-card.component';

@Component({
  selector: 'app-area-list',
  standalone: true,
  imports: [AreaCardComponent],
  templateUrl: './area-list.component.html',
})
export class AreaListComponent {
  @Input({ required: true }) Area!: Area[];
  @Output() onAreaUpdated = new EventEmitter<Area>();

  handleAreaUpdated(updatedArea: Area) {
    this.onAreaUpdated.emit(updatedArea);
  }
}
