import { Component, OnInit, Input } from '@angular/core';
import { CursoGETService } from '../../service/cursoGET.service';
import { AreaNuevoService } from '../../service/AreaNuevo.service';
import { Curso, AreaBasicRequest, AreaBasicResponse } from '../../interfaces/AreaNuevo.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl:'./crear-area.component.html',
})
export class CrearAreaComponent implements OnInit {
  @Input() idOlimpiada!: number; // Recibe el ID de la olimpiada desde el componente padre

  cursos: Curso[] = [];
  selectedCursos: number[] = [];
  areaData: AreaBasicRequest = {
    id_olimpiada: 0,
    nombre_area: '',
    descripcion: '',
    permite_multiples_areas: true,
    cursos: []
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private cursoService: CursoGETService,
    private areaService: AreaNuevoService
  ) {}

  ngOnInit(): void {
    this.areaData.id_olimpiada = this.idOlimpiada; // Asigna automáticamente el ID recibido
    this.loadCursos();
  }

  loadCursos(): void {
    this.cursoService.obtenerTodosLosCursos().subscribe({
      next: (response) => {
        console.log('Respuesta de cursos:', response);
        
        // Definir el orden exacto que queremos
        const ordenDeseado = [
          '1ro Primaria',
          '2do Primaria',
          '3ro Primaria',
          '4to Primaria',
          '5to Primaria',
          '6to Primaria',
          '1ro Secundaria',
          '2do Secundaria',
          '3ro Secundaria',
          '4to Secundaria',
          '5to Secundaria',
          '6to Secundaria'
        ];

        // Ordenar los cursos según el orden deseado
        this.cursos = response.data.sort((a, b) => {
          const indexA = ordenDeseado.indexOf(a.nameCurso);
          const indexB = ordenDeseado.indexOf(b.nameCurso);
          return indexA - indexB;
        });

        console.log('Cursos cargados y ordenados:', this.cursos);
      },
      error: (err) => {
        console.error('Error cargando cursos:', err);
        this.showError('Error al cargar la lista de cursos');
      }
    });
  }

  toggleSelection(cursoId: number): void {
    const cursoIndex = this.cursos.findIndex(c => c.id_curso === cursoId);
    
    if (this.selectedCursos.length === 0) {
      this.selectedCursos.push(cursoId);
    } else {
      const indicesSeleccionados = this.selectedCursos
        .map(id => this.cursos.findIndex(c => c.id_curso === id))
        .sort((a, b) => a - b);
      
      const primerIndice = indicesSeleccionados[0];
      const ultimoIndice = indicesSeleccionados[indicesSeleccionados.length - 1];
      
      // Si el curso seleccionado está fuera del rango actual
      if (cursoIndex < primerIndice || cursoIndex > ultimoIndice) {
        // Seleccionar todos los cursos entre el primer/último seleccionado y el nuevo
        const inicio = Math.min(cursoIndex, primerIndice);
        const fin = Math.max(cursoIndex, ultimoIndice);
        
        for (let i = inicio; i <= fin; i++) {
          const id = this.cursos[i].id_curso;
          if (!this.selectedCursos.includes(id)) {
            this.selectedCursos.push(id);
          }
        }
      } else {
        // Si el curso está dentro del rango, deseleccionarlo
        const index = this.selectedCursos.indexOf(cursoId);
        if (index !== -1) {
          this.selectedCursos.splice(index, 1);
        }
      }
    }
  }

  getCursoName(cursoId: number): string {
    const curso = this.cursos.find(c => c.id_curso === cursoId);
    return curso ? curso.nameCurso : 'Curso no encontrado';
  }

  onSubmit(): void {
    if (!this.validateForm()) return;

    this.areaData.cursos = this.selectedCursos;

    this.areaService.crearAreaBasica(this.areaData).subscribe({
      next: (response) => {
        this.showSuccess(response.message);
        this.resetForm();
      },
      error: (err) => {
        console.error('Error creando área:', err);
        this.showError(err.error.message || 'Error al crear el área. Verifique los datos.');
      }
    });
  }

  private validateForm(): boolean {
    this.clearMessages();

    if (!this.idOlimpiada || this.idOlimpiada <= 0) {
      this.showError('No se pudo determinar la olimpiada asociada');
      return false;
    }

    if (!this.areaData.nombre_area?.trim()) {
      this.showError('El nombre del área es requerido');
      return false;
    }

    if (this.selectedCursos.length === 0) {
      this.showError('Debe seleccionar al menos un curso');
      return false;
    }

    return true;
  }

  private resetForm(): void {
    this.areaData = {
      id_olimpiada: this.idOlimpiada,
      nombre_area: '',
      descripcion: '',
      permite_multiples_areas: true,
      cursos: []
    };
    this.selectedCursos = [];
  }

  private showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => this.successMessage = null, 5000);
  }

  private showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = null, 5000);
  }

  private clearMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }
}
