import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NivelesCategoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-categorias-home',
  imports: [CommonModule],
  templateUrl: './categorias-home.component.html',
  standalone: true,
})
export class CategoriasHomeComponent {
  @Input()
  categorias!: NivelesCategoria[];
}
