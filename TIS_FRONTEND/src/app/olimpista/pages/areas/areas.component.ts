import { Component, inject, OnInit, signal } from '@angular/core';
import { InscripcionAreasComponent } from "../../components/inscripcion-areas/inscripcion-areas.component";
import { AreasListComponent } from '../../components/areas-list/areas-list.component';
import { AreasCardComponent } from "../../components/areas-card/areas-card.component";
import { GetAreaResponse } from '../../interfaces/get-area-response';
import { GetAreaService } from '../../service/get.area.service.ts.service';
import { Area } from '../../interfaces/area.interface';


@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [InscripcionAreasComponent, AreasListComponent],
  templateUrl: './areas.component.html',

})
export class AreasComponent {

    private GetAreaService = inject(GetAreaService);

    public areas = signal<Area[]>([]);


  ngOnInit(): void {
    this.loadArea();
  }

  public loadArea() {
    this.GetAreaService.findAll()
      .subscribe(Area => {
        this.areas.set(Area);
      });
    console.log(this.areas);
  }
  public addArea(newArea: Area): void {
    this.areas.update((currentAreas) => [...currentAreas, newArea]);
  }
}
