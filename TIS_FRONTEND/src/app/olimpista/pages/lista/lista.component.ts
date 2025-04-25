import { Component } from '@angular/core';
import { CuadroListaComponent } from '../../components/cuadro-lista/cuadro-lista.component';

@Component({
  selector: 'app-lista',
  standalone:true,
  imports: [CuadroListaComponent],
  templateUrl: './lista.component.html',
})
export class ListaComponent {

  private listaEstudiantes: any[] = [];
  private listaTutores: any[] = [];

  

  setEstudiantes(estudiantes: any[]) {
    this.listaEstudiantes = estudiantes;
    console.log('Lista de Estudiantes:', this.listaEstudiantes);
  }

  setTutores(tutores: any[]) {
    this.listaTutores = tutores;
    console.log('Lista de Tutores:', this.listaTutores);
  }

  getEstudiantes(): any[] {
    return this.listaEstudiantes;
  }

  getTutores(): any[] {
    return this.listaTutores;
  }
}
