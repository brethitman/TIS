import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Olimpiada } from '../../interfaces/olimpiada.interfacel';

@Component({
  selector: 'app-olimpiada-card',
  templateUrl: './olimpiada-card.component.html',
  //styleUrls: ['./olimpiada-card.component.css']
})
export class OlimpiadaCardComponent {
    @Input() olimpiada!: Olimpiada;
    @Output() onEditar = new EventEmitter<number>();
    @Output() onEliminar = new EventEmitter<number>();
    @Output() onVerAreas = new EventEmitter<number>();
  
    editar(): void {
      this.onEditar.emit(this.olimpiada.id);
    }
  
    eliminar(): void {
      this.onEliminar.emit(this.olimpiada.id);
    }
  
    verOAnadirAreas(): void {
      this.onVerAreas.emit(this.olimpiada.id);
    }
}