import { Component, OnInit, inject, signal } from '@angular/core';
import { InscripcionOlimpiadaComponent } from '../../components/inscripcion-olimpiada/inscripcion-olimpiada.component';
import { OlimpiadaListComponent } from '../../components/olimpiada-list/olimpiada-list.component';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';
import { GetOlimpiadaService } from '../../service/get.olimpiada.service';

@Component({
    selector: 'app-olimpiada-page',
    standalone: true,
    imports: [InscripcionOlimpiadaComponent, OlimpiadaListComponent],
    templateUrl: './olimpiada-page.component.html',
  })
  export class OlimpiadaPageComponent implements OnInit {
    private getOlimpiadaService = inject(GetOlimpiadaService);
    public olimpiadas = signal<Olimpiada[]>([]);
  
    ngOnInit() {
      this.loadOlimpiadas();
    }
  
    public loadOlimpiadas(): void {
      this.getOlimpiadaService.findAll().subscribe({
        next: data => this.olimpiadas.set(data),
        error: err => console.error(err)
      });
    }
  
    // ← Este método es el que llamaremos desde el template
    public agregarOlimpiada(nueva: Olimpiada): void {
      this.olimpiadas.update(current => [...current, nueva]);
      this.loadOlimpiadas();
    }

    public actualizarOlimpiada(actualizada: Olimpiada): void {
      this.olimpiadas.update(current => 
        current.map(o => o.id === actualizada.id ? actualizada : o)
      );
      this.loadOlimpiadas();
    }
  }