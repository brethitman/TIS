import { Component, inject, OnInit, signal } from '@angular/core';
// Importa CommonModule si usas directivas como *ngIf, *ngFor en inicio1.component.html
import { CommonModule } from '@angular/common';
// Asegúrate de que la ruta a tu componente InscripcionTodoComponent sea correcta
import { InscripcionTodoComponent } from '../../components/inscripcion-todo/inscripcion-todo.component';
import { BoletaPagoComponent } from "../../components/boleta-pago/boleta-pago.component";
import { OlimpiadasListUsuarioComponent } from '../../components/list-olimpiada-usuario/list-olimpiada-usuario.component';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';
import { GetAreaService } from '../../service/get.area.service.ts.service';
import { Area } from '../../interfaces/area.interface';
import { GetOlimpiadaService } from '../../service/get.olimpiada.service';
@Component({
  selector: 'app-inicio1',
  standalone: true, // <--- Asegúrate de que Inicio1Component también sea standalone
  imports: [
    CommonModule, OlimpiadasListUsuarioComponent // <--- Añade CommonModule si lo necesitas en esta plantilla
  /*  InscripcionTodoComponent*/ // <-- ¡Tienes que importar InscripcionTodoComponent aquí!

],
  templateUrl: './inicio1.component.html',

})
export class Inicio1Component implements OnInit {
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

