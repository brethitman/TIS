// olimpiada-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlimpiadaService } from '../../service/olimpiada.service';
import { Olimpiada } from '../../interfaces/olimpiada.interfacel';
import { OlimpiadaCardComponent } from "../olimpiada-card/olimpiada-card.component";

@Component({
  standalone: true,
  selector: 'app-olimpiada-list',
  templateUrl: './olimpiada-list.component.html',
  imports: [CommonModule, OlimpiadaCardComponent]
})
export class OlimpiadaListComponent implements OnInit {
  olimpiadas: Olimpiada[] = [];

  constructor(private olimpiadaService: OlimpiadaService) {}

  ngOnInit(): void {
    this.olimpiadaService.getOlimpiadas().subscribe(data => {
      this.olimpiadas = data;
    });
  }
}
