import { Component, inject, OnInit, signal } from '@angular/core';
import { OlimpiadaCardComponent } from '../../components/olimpiada-card/olimpiada-card.component';
import { OlimpiadaListComponent } from '../../components/olimpiada-list/olimpiada-list.component';
import { Olimpiada } from '../../interfaces/olimpiada.interfacel';
import { OlimpiadaService } from '../../service/olimpiada.service';
import { GetOlimpiadaService } from '../../service/get.olimpiada.service';

@Component({
  selector: 'app-olimpiada-page',
  standalone: true,
  imports: [OlimpiadaCardComponent, OlimpiadaListComponent],
  templateUrl: './olimpiada-page.component.html',
})
export class OlimpiadaPageComponent implements OnInit {
    private olimpiadaService = inject(GetOlimpiadaService); // Usa GetOlimpiadaService, no OlimpiadaService
  
    // Definir la variable reactiva para almacenar las olimpiadas
    public olimpiadas = signal<Olimpiada[]>([]);
  
    ngOnInit(): void {
      this.loadOlimpiadas();
    }
  
    // Cargar las olimpiadas
    public loadOlimpiadas(): void {
      this.olimpiadaService.findAll()  // Llamar al método findAll del servicio GetOlimpiadaService
        .subscribe((olimpiadas: Olimpiada[]) => {
          this.olimpiadas.set(olimpiadas);
        });
    }
  
    // Agregar una nueva olimpiada
    public addOlimpiada(newOlimpiada: Olimpiada): void {
      this.olimpiadas.update((currentOlimpiadas) => [...currentOlimpiadas, newOlimpiada]);
    }
  }