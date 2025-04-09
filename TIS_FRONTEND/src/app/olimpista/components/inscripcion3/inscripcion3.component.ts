import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InscripcionService } from '../../service/inscripcion.service';
import { Area, Nivel } from '../../interfaces/inscripcion.interface';
import { GetAreaResponse } from '../../interfaces/get-area-response';

@Component({
  selector: 'app-inscripcion3',
  templateUrl: './inscripcion3.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Inscripcion3Component implements OnInit {
  @Input() tutorData: any;
  @Input() olimpistaData: any;

  // Datos de áreas y niveles
  areas: Area[] = [];
  niveles: Nivel[] = [];

  // Selecciones
  selectedAreaId: number | null = null;
  selectedArea: Area | null = null;
  selectedNivelId: number | null = null;

  // Estados
  isLoading = true;
  loadingNiveles = false;
  isSaving = false;
  error = false;
  errorMessage: string | null = null;

  // Eventos
  @Output() atras = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();
  @Output() areaChanged = new EventEmitter<number>();

  constructor(private inscripcionService: InscripcionService) {}

  ngOnInit(): void {
    this.loadAreas();
  }

  loadAreas(): void {
    this.inscripcionService.getAreas().subscribe({
      next: (response: GetAreaResponse) => {
        this.areas = response.areas;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading areas:', err);
        this.error = true;
        this.errorMessage = 'Error al cargar las áreas. Por favor intenta nuevamente.';
        this.isLoading = false;
      }
    });
  }

  onAreaChange(): void {
    this.selectedArea = this.areas.find(a => a.id === this.selectedAreaId) || null;
    this.selectedNivelId = null;
    this.loadNiveles();

    if (this.selectedAreaId) {
      this.areaChanged.emit(this.selectedAreaId);
    }
  }

  loadNiveles(): void {
    if (!this.selectedAreaId) return;

    this.loadingNiveles = true;
    this.inscripcionService.getNivelesPorArea(this.selectedAreaId).subscribe({
      next: (niveles) => {
        this.niveles = niveles;
        this.loadingNiveles = false;
      },
      error: (err) => {
        console.error('Error loading niveles:', err);
        this.errorMessage = 'Error al cargar las categorías. Por favor intenta nuevamente.';
        this.loadingNiveles = false;
      }
    });
  }

  selectNivel(nivel: Nivel): void {
    this.selectedNivelId = nivel.id;
  }

  finalizarInscripcion(): void {
    if (!this.selectedAreaId || !this.selectedNivelId) {
      this.errorMessage = 'Por favor selecciona un área y una categoría antes de continuar';
      return;
    }

    this.isSaving = true;
    this.errorMessage = null;

    const formData = {
      olimpista: this.olimpistaData,
      tutor: this.tutorData,
      areaId: this.selectedAreaId,
      nivelId: this.selectedNivelId
    };

    this.submit.emit(formData);
    this.isSaving = false;
  }

  volver(): void {
    this.atras.emit();
  }

  // Helper para mostrar fecha formateada
  formatDate(dateString: string | null): string {
    if (!dateString) return 'Por definir';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  }
}
