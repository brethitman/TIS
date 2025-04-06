import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { InscripcionService } from '../../service/inscripcion.service';
import { Area } from '../../interfaces/area.interface';
import { GetAreaResponse } from '../../interfaces/get-area-response';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NivelesCategoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-inscripcion3',
  templateUrl: './inscripcion3.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class Inscripcion3Component implements OnInit {
  @Input() tutorData: any;
  @Input() olimpistaData: any;
  @Input() categoria: NivelesCategoria | null = null;

  areas: Area[] = [];
  selectedAreaId: number | null = null;
  isLoading = true;
  error = false;
  isSaving = false;
  errorMessage: string | null = null;

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

  getSelectedArea(): Area | undefined {
    return this.areas.find(area => area.id === this.selectedAreaId);
  }

  onAreaChange(): void {
    if (this.selectedAreaId) {
      this.areaChanged.emit(this.selectedAreaId);
    }
  }

  finalizarInscripcion(): void {
    if (!this.selectedAreaId) {
      this.errorMessage = 'Por favor selecciona un área antes de continuar';
      return;
    }

    this.isSaving = true;
    this.errorMessage = null;

    const formData = {
      olimpista: this.olimpistaData,
      tutor: this.tutorData,
      areaId: this.selectedAreaId
    };

    // Emitir los datos al componente padre para que maneje el envío
    this.submit.emit(formData);
    this.isSaving = false;
  }

  volver(): void {
    this.atras.emit();
  }
}
