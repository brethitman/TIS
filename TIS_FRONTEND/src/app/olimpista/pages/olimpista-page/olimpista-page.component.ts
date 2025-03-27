import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderPageComponent } from "../../../ui/components/header-page/header-page.component";
import { GetOlimpistaResponse } from '../../interfaces/get-olimpista-response';
import { OlimpistaService } from '../../service/olimpista.service';
import { OlimpistaListComponent } from '../../components/olimpista-list/olimpista-list.component';
import { InscritosCardComponent } from '../../components/inscritos-card/inscritos-card.component';
import { InscripcionService } from '../../service/inscripcion.service';
import { InscritosListComponent } from '../../components/inscritos-list/inscritos-list.component';


import { Olimpista} from '../../interfaces/olimpista-response';
import { GetInscripcionResponse } from '../../interfaces/get-inscripcion-response';
import { Inscripcione } from '../../interfaces/inscripcion.interface';
import { SearchEstudianteInputComponent } from "../../components/search-estudiante-input/search-estudiante-input.component";



@Component({
  selector: 'app-olimpista-page',
  standalone: true,
  imports: [HeaderPageComponent, OlimpistaListComponent, InscritosListComponent, SearchEstudianteInputComponent],
  templateUrl: './olimpista-page.component.html',
})
export class OlimpistaPageComponent implements OnInit {

  private olimpistaService = inject(OlimpistaService);

  public Olimpista = signal<Olimpista[]>([]);

  private InscripcionService = inject(InscripcionService);
  public Inscripcione = signal<Inscripcione[]>([]);

  ngOnInit(): void {
    this.loadOlimpistas();
    this.loadInscripcion();
  }

  public loadOlimpistas() {
    this.olimpistaService.findAll()
      .subscribe(Olimpista => {
        this.Olimpista.set(Olimpista);
      });
    console.log(this.Olimpista);
  }


  public loadInscripcion() {
    this.InscripcionService.findAll()
      .subscribe((response) => {
        this.Inscripcione.set(response);
      });

  }

}
