// olimpiada-list.component.ts
import { Component, OnInit } from '@angular/core';
import { OlimpiadaService } from '../../service/olimpiada.service';
import { Olimpiada } from '../../interfaces/olimpiada.interfacel';

@Component({
  selector: 'app-olimpiada-list',
  templateUrl: './olimpiada-list.component.html'
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
