
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { GetOlimpiadaService } from '../../service/get.olimpiada.service';
import { OlimpiadaListComponent } from '../../components/olimpiada-list/olimpiada-list.component';

import { CrearOlimpiadaComponent } from '../../components/crear-olimpiada/crear-olimpiada.component';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';
import { GetAreaService } from '../../service/get.area.service.ts.service';
import { Area } from '../../interfaces/area.interface';
import { AreaListComponent } from "../../components/area-list/area-list.component";
import { BotonExelComponent } from '../../components/boton-exel/boton-exel.component';
import { InscripcionTodoComponent } from '../../components/inscripcion-todo/inscripcion-todo.component';
import { OlimpiadasListUsuarioComponent } from '../../components/list-olimpiada-usuario/list-olimpiada-usuario.component';


@Component({
  selector: 'app-inicio2',
  standalone: true,
  imports: [CommonModule, OlimpiadasListUsuarioComponent],
  templateUrl: './inicio2.component.html'
})
export class Inicio2Component implements OnInit {
  private getOlimpiadaService = inject(GetOlimpiadaService);
    public olimpiadas = signal<Olimpiada[]>([]);  // Corregido el tipo
    mostrarFormulario = false;

    private GetAreaService = inject(GetAreaService);
    public area = signal<Area[]>([]);  // Corregido el tipo

    ngOnInit(): void {
      this.loadOlimpiada();
    }
      loadOlimpiada(): void {
        this.getOlimpiadaService.findAll()
          .subscribe(olimpiadas => {
            this.olimpiadas.set(olimpiadas);  // Se asegura de actualizar correctamente el estado
          });
      }
}
