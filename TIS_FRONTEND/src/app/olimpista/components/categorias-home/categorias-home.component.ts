import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NivelesCategoria } from '../../interfaces/categoria.interface';
import { Router } from '@angular/router';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';

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
  @Input({ required: false }) olimpiada!: Olimpiada;

  constructor(private router: Router) {}

  seleccionarCategoria(): void {
    if (!this.olimpiada?.id) {
      console.error('Error: No se puede navegar - Olimpiada sin ID');
      return;
    }
    console.log('enviando',this.categorias)
    this.olimpiada.id = 1;

    this.router.navigate(
      ['inicio/look/inscripcion-todo/:id', this.olimpiada.id],

      {
        state: {
          olimpiadaData: {
            nombre: this.olimpiada.nombre_olimpiada,
            fechaInicio: this.olimpiada.fecha_inicio,
            fechaFin: this.olimpiada.fecha_final
          }
        }
      }

    );

  }

  onRegisterClick(): void {
    this.router.navigate(['/inicio2'], { 
    queryParams: { idArea: this.idArea,nombreCategoria:this.nombreCategoria, descripcionC: this.descripcionC,costo:this.costo},
    });
  }
}
