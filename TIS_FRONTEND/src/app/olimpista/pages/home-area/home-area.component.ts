import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Area } from '../../interfaces/area.interface';
import { NivelesCategoria } from '../../interfaces/categoria.interface';
import { GetAreaService } from '../../service/get.area.service.ts.service';
import { AreasCarruselComponent } from '../../components/areas-carrusel/areas-carrusel.component';
import { CategoriaService } from '../../service/categoria.service';
import { CategoriasHomeComponent } from '../../components/categorias-home/categorias-home.component';

@Component({
  selector: 'app-home-area',
  standalone: true,
  imports: [CommonModule, FormsModule, AreasCarruselComponent, CategoriasHomeComponent],
  templateUrl: './home-area.component.html',
})
export class HomeAreaComponent {

  private GetAreaService = inject(GetAreaService);
  public area = signal<Area[]>([]);
  categorias: NivelesCategoria[] = [];



  constructor(private categoriaService: CategoriaService) {}

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
  cargarCategoriasPorArea(areaId: number): void {
    this.categoriaService.getNivelesByArea(areaId).subscribe(
      (categorias) => {
        this.categorias = categorias;
        console.log('Categorías:', categorias);
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
      }
    );
      
      
    console.log('enviando',this.categorias)
  }
}

