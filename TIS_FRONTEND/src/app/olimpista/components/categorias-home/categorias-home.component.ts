import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IDNivelCategoria } from '../../interfaces/post_categoria.interface';
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
  categorias!: IDNivelCategoria[];
  idArea: number = 0;
  idCategoria: number = 0;
  nombreCategoria: string = '';
  descripcionC: string | null = null;
  costo: number = 0;
  @Input({ required: false }) olimpiada!: Olimpiada;

  constructor(private router: Router) {}

 
}
