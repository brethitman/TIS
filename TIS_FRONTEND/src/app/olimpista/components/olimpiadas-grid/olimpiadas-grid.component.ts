import { Component, Input, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';

@Component({
  selector: 'app-olimpiadas-grid',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './olimpiadas-grid.component.html',
  styleUrls: []
})
export class OlimpiadasGridComponent implements AfterViewInit {
  @Input() olimpiadas: Olimpiada[] = [];
  currentIndex = 0;
  cardWidth = 328; // 320px (ancho de la card) + 8px de margen (mx-2)
  visibleCards = 3; // Número inicial de tarjetas visibles

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.calculateVisibleCards();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.calculateVisibleCards();
  }

  calculateVisibleCards(): void {
    const container = document.querySelector('.max-w-7xl');
    if (container) {
      const containerWidth = container.clientWidth;
      this.visibleCards = Math.max(1, Math.floor(containerWidth / this.cardWidth));
    }
  }

  prev(): void {
    this.currentIndex = Math.max(0, this.currentIndex - 1);
  }

  next(): void {
    const maxIndex = Math.max(0, this.olimpiadas.length - this.visibleCards);
    this.currentIndex = Math.min(maxIndex, this.currentIndex + 1);
  }

  goToPage(pageIndex: number): void {
    this.currentIndex = pageIndex * this.visibleCards;
  }

  isActiveDot(dotIndex: number): boolean {
    return dotIndex === Math.floor(this.currentIndex / this.visibleCards);
  }

  getPaginationDots(): number[] {
    const dotCount = Math.ceil(this.olimpiadas.length / Math.max(1, this.visibleCards));
    return Array.from({ length: dotCount }, (_, i) => i);
  }

  getEstadoOlimpiada(olimpiada: Olimpiada): string {
    const hoy = new Date();
    const inicio = new Date(olimpiada.fecha_inicio);
    const fin = new Date(olimpiada.fecha_final);

    if (hoy < inicio) return 'Próximamente';
    if (hoy > fin) return 'Finalizada';
    return 'Inscripciones abiertas';
  }

  navigateToOlimpiadaInfo(olimpiada: Olimpiada): void {
    this.router.navigate(['/ventana-informacion-olimpiada', olimpiada.id], {
      state: { olimpiadaData: olimpiada }
    });
  }
}