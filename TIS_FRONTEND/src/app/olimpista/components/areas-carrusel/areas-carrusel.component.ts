import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { olimpiadabyArea } from '../../interfaces/areavisualizacion.interface';

@Component({
  selector: 'app-areas-carrusel',
  imports: [CommonModule],
  templateUrl: './areas-carrusel.component.html',
  standalone: true,
})
export class AreasCarruselComponent {

  @Input({ required: true })
  Area!: olimpiadabyArea[];
  currentIndex = 0;
  itemsPerPage = 4;
  visibleItems: any[] = [];
  @Output()
  areaSelected = new EventEmitter<olimpiadabyArea>();
  areaSeleccionada: any;
  ngOnInit() {
    this.updateVisibleItems();
  }
  updateVisibleItems(): void {
    const start = this.currentIndex * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.visibleItems = this.Area.slice(start, end);
  }
  onAreaClick(area: olimpiadabyArea) {
    this.areaSelected.emit(area);
    this.areaSeleccionada = area;
  }
  // Navegación del carrusel
  nextArea(): void {
    if (this.currentIndex < this.getTotalPages() - 1) {
      this.currentIndex++;
      this.updateVisibleItems();
    }
  }

  prevArea(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateVisibleItems();
    }
  }

  goToArea(index: number): void {
    this.currentIndex = index;
    this.updateVisibleItems();
  }

  // Calcula los puntos de paginación
  getPaginationDots(): number[] {
    return Array(this.getTotalPages()).fill(0).map((x, i) => i);
  }

  // Calcula el número total de páginas
  getTotalPages(): number {
    return Math.ceil(this.Area.length / this.itemsPerPage);
  }
  // Agrega este método al componente
  getAreaGroups(): any[][] {
    const groups = [];
    for (let i = 0; i < this.Area.length; i += this.itemsPerPage) {
      groups.push(this.Area.slice(i, i + this.itemsPerPage));
    }
    return groups;
  }
}
