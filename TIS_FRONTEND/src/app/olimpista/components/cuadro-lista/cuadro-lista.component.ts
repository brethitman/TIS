import { Component, OnInit } from '@angular/core';
import { ListaComponent } from '../../pages/lista/lista.component';

@Component({
  selector: 'app-cuadro-lista',
  standalone: true,
  imports: [],
  templateUrl: './cuadro-lista.component.html',
})
export class CuadroListaComponent implements OnInit {
  listaEstudiantes: any[] = [];
  listaTutores: any[] = [];

  constructor(private lista: ListaComponent) {}

  ngOnInit() {
    this.listaEstudiantes = this.lista.getEstudiantes();
    this.listaTutores = this.lista.getTutores();
    console.log('Listas:', this.listaEstudiantes);
    console.log('Listas2:', this.listaTutores);
  }
}
