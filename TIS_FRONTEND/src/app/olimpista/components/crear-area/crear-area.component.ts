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
        this.cursos = response.data;
      },
      error: (err) => {
        console.error('Error cargando cursos:', err);
        this.showError('Error al cargar la lista de cursos');
      }
    });
  }

  toggleSelection(cursoId: number): void {
    const index = this.selectedCursos.indexOf(cursoId);
    const cursoIndex = this.cursos.findIndex(c => c.id_curso === cursoId);

    if (index === -1) {
      // Si es la primera selección
      if (this.selectedCursos.length === 0) {
        this.selectedCursos.push(cursoId);
      } else {
        // Obtener el primer y último curso seleccionado
        const primerCursoIndex = this.cursos.findIndex(c => c.id_curso === this.selectedCursos[0]);
        const ultimoCursoIndex = this.cursos.findIndex(c => c.id_curso === this.selectedCursos[this.selectedCursos.length - 1]);

        // Si el nuevo curso está antes del primer curso seleccionado
        if (cursoIndex < primerCursoIndex) {
          // Seleccionar todos los cursos desde el nuevo hasta el primer curso seleccionado
          for (let i = cursoIndex; i <= primerCursoIndex; i++) {
            const cursoId = this.cursos[i].id_curso;
            if (!this.selectedCursos.includes(cursoId)) {
              this.selectedCursos.push(cursoId);
            }
          }
        }
        // Si el nuevo curso está después del último curso seleccionado
        else if (cursoIndex > ultimoCursoIndex) {
          // Seleccionar todos los cursos desde el último curso seleccionado hasta el nuevo
          for (let i = ultimoCursoIndex; i <= cursoIndex; i++) {
            const cursoId = this.cursos[i].id_curso;
            if (!this.selectedCursos.includes(cursoId)) {
              this.selectedCursos.push(cursoId);
            }
          }
        }

        // Ordenar los cursos seleccionados
        this.selectedCursos.sort((a, b) => {
          const indexA = this.cursos.findIndex(c => c.id_curso === a);
          const indexB = this.cursos.findIndex(c => c.id_curso === b);
          return indexA - indexB;
        });
      }
    } else {
      // Si está deseleccionando
      const primerCursoIndex = this.cursos.findIndex(c => c.id_curso === this.selectedCursos[0]);
      const ultimoCursoIndex = this.cursos.findIndex(c => c.id_curso === this.selectedCursos[this.selectedCursos.length - 1]);

      // Solo permitir deseleccionar el primer o último curso
      if (cursoIndex === primerCursoIndex || cursoIndex === ultimoCursoIndex) {
        this.selectedCursos.splice(index, 1);
      } else {
        this.showError('Solo puede deseleccionar el primer o último curso del rango');
      }
    }
  }

  getCursoName(cursoId: number): string {
    const curso = this.cursos.find(c => c.id_curso === cursoId);
    return curso ? curso.nameCurso : 'Curso no encontrado';
  }

  onSubmit(): void {
    if (!this.validateForm()) return;

    // Verificar que los cursos seleccionados sean consecutivos
    const indicesSeleccionados = this.selectedCursos
      .map(id => this.cursos.findIndex(c => c.id_curso === id))
      .sort((a, b) => a - b);

    for (let i = 1; i < indicesSeleccionados.length; i++) {
      if (indicesSeleccionados[i] !== indicesSeleccionados[i - 1] + 1) {
        this.showError('Los cursos seleccionados deben ser consecutivos');
        return;
      }
    }

    // Asignar los cursos seleccionados
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

    // Validación del ID de olimpiada recibido
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
    // Mantiene el ID de olimpiada al resetear
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
