<<<<<<< HEAD
// olimpiada-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlimpiadaService } from '../../service/olimpiada.service';
=======
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlimpiadaCardComponent } from '../olimpiada-card/olimpiada-card.component';
>>>>>>> 05eb073ebb696730264662f01b4a778f54adf17f
import { Olimpiada } from '../../interfaces/olimpiada.interfacel';
import { OlimpiadaCardComponent } from "../olimpiada-card/olimpiada-card.component";

@Component({
  standalone: true,
  selector: 'app-olimpiada-list',
<<<<<<< HEAD
  templateUrl: './olimpiada-list.component.html',
  imports: [CommonModule, OlimpiadaCardComponent]
=======
  standalone: true,
  imports: [CommonModule, OlimpiadaCardComponent],
  templateUrl: './olimpiada-list.component.html',
>>>>>>> 05eb073ebb696730264662f01b4a778f54adf17f
})
export class OlimpiadaListComponent {
  @Input({ required: true }) olimpiadas!: Olimpiada[];
}