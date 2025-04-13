import { Component, inject, OnInit, signal } from '@angular/core';
import { InscripcionOlimpiadaComponent } from '../../components/inscripcion-olimpiada/inscripcion-olimpiada.component';
import { OlimpiadaCardComponent } from '../../components/olimpiada-card/olimpiada-card.component';
import { OlimpiadaListComponent } from '../../components/olimpiada-list/olimpiada-list.component';
import { Olimpiada } from '../../interfaces/olimpiada.interfacel';
import { OlimpiadaService } from '../../service/olimpiada.service';
import { GetOlimpiadaService } from '../../service/get.olimpiada.service';

@Component({
  selector: 'app-olimpiada-page',
  standalone: true,
  imports: [InscripcionOlimpiadaComponent, OlimpiadaListComponent],
  templateUrl: './olimpiada-page.component.html',
})
export class OlimpiadaPageComponent {

    private GetOlimpiadaService = inject(GetOlimpiadaService);

    public olimpiadas = signal<Olimpiada[]>([]);
  
    ngOnInit(): void {
      this.loadOlimpiadas();
    }
  
    // Cargar las olimpiadas
    public loadOlimpiadas() {
      this.GetOlimpiadaService.findAll()  // Llamar al método findAll del servicio GetOlimpiadaService
        .subscribe((Olimpiada) => {
          this.olimpiadas.set(Olimpiada);
        });
        console.log(this.olimpiadas);
    }
  
    // Agregar una nueva olimpiada
    public addOlimpiada(newOlimpiada: Olimpiada): void {
      this.olimpiadas.update((currentOlimpiadas) => [...currentOlimpiadas, newOlimpiada]);
    }
  }