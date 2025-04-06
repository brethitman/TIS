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

  constructor(private router: Router) {}

  onRegisterClick(categoria: NivelesCategoria): void {
    this.router.navigate(['/inicio2'], {
      queryParams: { categoriaId: categoria.id }  // Envía el ID como parámetro
    });
  }
}
