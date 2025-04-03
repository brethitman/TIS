import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Area } from '../../interfaces/area.interface';
import { NivelesCategoria } from '../../interfaces/categoria.interface';
import { GetAreaService } from '../../service/get.area.service.ts.service';
import { AreasCarruselComponent } from '../../components/areas-carrusel/areas-carrusel.component';
import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-inicio2',
  templateUrl: './inicio2.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, AreasCarruselComponent],
})
export class Inicio2Component {

  private GetAreaService = inject(GetAreaService);
  public area = signal<Area[]>([]);

  ngOnInit(): void {
    this.loadArea();
  }

  public loadArea() {
    this.GetAreaService.findAll()
      .subscribe(area => {
        console.log('Áreas obtenidas:', area); // Verifica los datos recibidos
        this.area.set(area); // Asigna los datos a la señal
      });
  }
  
}
