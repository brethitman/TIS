import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NivelesCategoria } from '../../interfaces/categoria.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias-home',
  imports: [CommonModule],
  templateUrl: './categorias-home.component.html',
  standalone: true,
})
export class CategoriasHomeComponent {
  @Input()
  categorias!: NivelesCategoria[];
  idArea: number= 0;
  idCategoria: number= 0;
  nombreCategoria: string='';
  descripcionC: string |null = null;
  costo: number=0;

  constructor(private router: Router) {}

  seleccionarCategoria(idarea: number, categoria: number, nombre:string,descripcion: string | null, costo:number): void {
    this.idArea = idarea;
    this.idCategoria = categoria;
    this.nombreCategoria = nombre;
    if (descripcion === null) {
      this.descripcionC = 'Sin descripción'; // Manejo en caso de null
    } else {
      this.descripcionC = descripcion;
    }
    this.costo = costo;
    this.onRegisterClick()
  }

  onRegisterClick(): void {
    this.router.navigate(['/inicio2'], { 
    queryParams: { idArea: this.idArea,nombreCategoria:this.nombreCategoria, descripcionC: this.descripcionC,costo:this.costo},
    });
  }
}
