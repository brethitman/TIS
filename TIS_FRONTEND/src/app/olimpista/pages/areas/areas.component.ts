
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { GetOlimpiadaService } from '../../service/get.olimpiada.service';
import { OlimpiadaListComponent } from '../../components/olimpiada-list/olimpiada-list.component';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';
import { GetAreaService } from '../../service/get.area.service.ts.service';
import { Area } from '../../interfaces/area.interface';
import { AreaListComponent } from "../../components/area-list/area-list.component";
import { BotonExelComponent } from '../../components/boton-exel/boton-exel.component';
import { InscripcionTodoComponent } from '../../components/inscripcion-todo/inscripcion-todo.component';

@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [CommonModule, OlimpiadaListComponent  ],
  templateUrl: './areas.component.html',

})
export class AreasComponent implements OnInit {
private getOlimpiadaService = inject(GetOlimpiadaService);
  public olimpiadas = signal<Olimpiada[]>([]);  // Corregido el tipo
  mostrarFormulario = false;

  private GetAreaService = inject(GetAreaService);
  public area = signal<Area[]>([]);  // Corregido el tipo

  ngOnInit(): void {
    this.loadOlimpiada();
   this.loadArea();
  }

  loadOlimpiada(): void {
    this.getOlimpiadaService.findAll()
      .subscribe(olimpiadas => {
        this.olimpiadas.set(olimpiadas);  // Se asegura de actualizar correctamente el estado
      });
  }

  onOlimpiadaCreada(nuevaOlimpiada: Olimpiada): void {
    this.mostrarFormulario = false;
    this.olimpiadas.update(current => [...current, nuevaOlimpiada]);
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }



  loadArea(): void {
    this.GetAreaService.findAll()
      .subscribe(area => {
        this.area.set(area);  // Se asegura de actualizar correctamente el estado
      });
  }


  handleAreaUpdated(updatedArea: Area) {
    this.GetAreaService.updateArea(updatedArea).subscribe({
      next: (areaActualizada) => {
        console.log('Área actualizada:', areaActualizada);
        // Forzar recarga de datos desde el servidor
        this.loadArea();
      },
      error: (err) => {
        console.error('Error en la solicitud:', err);
        if (err.status === 400) {
          alert('Error en los datos: ' + JSON.stringify(err.error.errors));
        }
      }
    });
  }
  }
