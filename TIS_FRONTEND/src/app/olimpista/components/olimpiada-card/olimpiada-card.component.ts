import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, Input } from '@angular/core';
import { GetAreaService } from '../../service/get.area.service.ts.service';
import { Area } from '../../interfaces/area.interface';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';
import { AreaListComponent } from "../../components/area-list/area-list.component";


@Component({
  selector: 'app-olimpiada-card',
  standalone: true,
  imports: [CommonModule, AreaListComponent],
  templateUrl: './olimpiada-card.component.html',
})
export class OlimpiadaCardComponent  {
  @Input({ required: true }) Olimpiada!: Olimpiada; // Asegúrate de que Olimpiada tiene el tipo Olimpiada




  private GetAreaService = inject(GetAreaService);
  public area = signal<Area[]>([]);  // Corregido el tipo

  ngOnInit(): void {

   this.loadArea();
  }

  /*
  loadArea(): void {
    this.GetAreaService.findAll()
      .subscribe(area => {
        this.area.set(area);
      });
  }
*/

// Cambiar el método loadArea
loadArea(): void {
  this.GetAreaService.findAll().subscribe(todasAreas => {
    // Filtrar áreas por coincidencia de id_olimpiada
    const areasFiltradas = todasAreas.filter(area =>
      area.id_olimpiada === this.Olimpiada.id
    );
    this.area.set(areasFiltradas);
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
