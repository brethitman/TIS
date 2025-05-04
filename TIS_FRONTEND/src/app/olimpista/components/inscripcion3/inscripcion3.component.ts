import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { InscripcionService } from '../../service/inscripcion.service';
import { Area } from '../../interfaces/area.interface';
import { GetAreaResponse } from '../../interfaces/get-area-response';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AreaService } from '../../service/area.service';

@Component({
  selector: 'app-inscripcion3',
  templateUrl: './inscripcion3.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class Inscripcion3Component implements OnInit {
  @Input() tutorData: any;
  @Input() olimpistaData: any;
  @Input() areaId!: number; 
  @Input() nombreCategoria!: string;
  @Input() descripcionC!: string;
  @Input() costo!: number;

  areas: Area[] = [];
  area: Area | null = null;
  selectedAreaId: number | null = null;
  isLoading = true;
  error = false;
  isSaving = false;
  errorMessage: string | null = null;
  areaNombre: string | null = null;

  @Output() atras = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();
  @Output() areaChanged = new EventEmitter<number>();

  constructor(private inscripcionService: InscripcionService, private areaService: AreaService) {}

  ngOnInit(): void {
    this.loadAreas();
    this.cargarNombreArea();
  }

  onSubmit(): void {
    const formData = {
      tutor: this.tutorData,
      olimpista: this.olimpistaData,
      areaId: this.areaId,
      nombreCategoria: this.nombreCategoria,
      descripcionC: this.descripcionC,
      costo: this.costo,
    };

    console.log('Enviando formulario de inscripción:', formData);
    this.submit.emit(formData);
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
  cargarNombreArea(): void{
    this.areaService.getAreaById(this.areaId).subscribe({
      next: (response) => {
        this.areaNombre = response.area.nombre_area;
        console.log('Área cargada:', this.area);
      },
      error: (err) => {
        console.error('Error al obtener el área:', err);
        this.errorMessage = 'No se pudo cargar el área. Por favor verifica el ID.';
      },
    });
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
