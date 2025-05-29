import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CursoGETService } from '../../service/cursoGET.service';
import { AreaNuevoService } from '../../service/AreaNuevo.service';
import { Curso, AreaBasicRequest, AreaBasicResponse } from '../../interfaces/AreaNuevo.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-area.component.html',
})
export class CrearAreaComponent implements OnInit {
  @Input() idOlimpiada!: number;
  @Output() areaCreadaEvent = new EventEmitter<void>();
  
  cursos: Curso[] = [];
  cursosFiltrados: Curso[] = [];
  selectedCursos: number[] = [];
  loading: boolean = false;
  enviando: boolean = false;
  mostrarFormulario: boolean = false;
  grados: string[] = [
    '1ro Primaria', '2do Primaria', '3ro Primaria', '4to Primaria', '5to Primaria', '6to Primaria',
    '1ro Secundaria', '2do Secundaria', '3ro Secundaria', '4to Secundaria', '5to Secundaria', '6to Secundaria'
  ];
  gradosSeleccionados: boolean[] = [];
  
  areaData: AreaBasicRequest = {
    id_olimpiada: 0,
    nombre_area: '',
    descripcion: '',
    gradoIniAr: '',
    gradoFinAr: '',
    cursos: []
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private cursoService: CursoGETService,
    private areaService: AreaNuevoService
  ) {
    this.gradosSeleccionados = this.grados.map(() => false);
  }

  ngOnInit(): void {
    console.log('ID Olimpiada recibido:', this.idOlimpiada);
    this.areaData.id_olimpiada = this.idOlimpiada;
    this.loadCursos();
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.resetForm();
    }
  }

  onCheckboxChange(index: number): void {
    // Cambiamos el estado del checkbox actual
    this.gradosSeleccionados[index] = !this.gradosSeleccionados[index];
    
    // Si este checkbox está ahora seleccionado, mantenemos seleccionados solo los grados en el rango
    if (this.gradosSeleccionados[index]) {
      // Encontrar el primer y último grado seleccionado
      const primerIndice = this.gradosSeleccionados.findIndex(selected => selected);
      const ultimoIndice = this.gradosSeleccionados.lastIndexOf(true);
      
      // Seleccionamos automáticamente todos los grados intermedios
      for (let i = primerIndice; i <= ultimoIndice; i++) {
        this.gradosSeleccionados[i] = true;
      }
      
      // Actualizamos los valores de grado inicial y final
      this.areaData.gradoIniAr = this.grados[primerIndice];
      this.areaData.gradoFinAr = this.grados[ultimoIndice];
      
      // Filtramos los cursos correspondientes
      this.filtrarCursosPorGrado(primerIndice, ultimoIndice);
      this.clearMessages(); // Limpiamos mensajes anteriores
    } else {
      // Si desmarcamos un checkbox, tenemos que recalcular el rango
      const primerIndice = this.gradosSeleccionados.findIndex(selected => selected);
      const ultimoIndice = this.gradosSeleccionados.lastIndexOf(true);
      
      if (primerIndice !== -1 && ultimoIndice !== -1) {
        // Todavía hay algún grado seleccionado, actualizamos el rango
        this.areaData.gradoIniAr = this.grados[primerIndice];
        this.areaData.gradoFinAr = this.grados[ultimoIndice];
        this.filtrarCursosPorGrado(primerIndice, ultimoIndice);
      } else {
        // No quedan grados seleccionados
        this.areaData.gradoIniAr = '';
        this.areaData.gradoFinAr = '';
        this.cursosFiltrados = [];
        this.selectedCursos = [];
      }
    }
    
    console.log('Rango seleccionado:', this.areaData.gradoIniAr, 'hasta', this.areaData.gradoFinAr);
  }

  filtrarCursosPorGrado(indiceInicio: number, indiceFin: number): void {
    // Si no hay un rango válido seleccionado, vaciar la lista de cursos
    if (indiceInicio === -1 || indiceFin === -1) {
      this.cursosFiltrados = [];
      this.selectedCursos = [];
      this.areaData.cursos = [];
      return;
    }
    
    // Primero intentamos filtrar por el método de coincidencia del nombre
    let cursosFiltradosPorGrado = this.cursos.filter(curso => {
      const cursoGradoIndex = this.obtenerIndiceGradoDeCurso(curso);
      return cursoGradoIndex >= indiceInicio && cursoGradoIndex <= indiceFin;
    });
    
    // Si no encontramos cursos que coincidan, usamos todos los cursos pero mostramos una advertencia
    if (cursosFiltradosPorGrado.length === 0) {
      console.warn('No se detectaron cursos en el rango seleccionado. Mostrando todos los cursos disponibles.');
      this.showError('No se pudo determinar qué cursos pertenecen a los grados seleccionados. Se incluirán todos los cursos disponibles.');
      cursosFiltradosPorGrado = [...this.cursos];
    }
    
    this.cursosFiltrados = cursosFiltradosPorGrado;
    
    // Automáticamente seleccionamos todos los cursos filtrados
    this.selectedCursos = this.cursosFiltrados.map(curso => curso.id_curso);
    this.areaData.cursos = [...this.selectedCursos];
    
    console.log('Cursos seleccionados automáticamente:', this.selectedCursos);
  }

  // Este método es un ejemplo - debes implementarlo según tu estructura de datos real
  obtenerIndiceGradoDeCurso(curso: Curso): number {
    // Intentamos encontrar coincidencias entre el nombre del curso y los grados
    const nombreCurso = curso.nameCurso.toLowerCase();
    
    // Verificamos si el nombre del curso contiene alguno de los grados
    for (let i = 0; i < this.grados.length; i++) {
      const grado = this.grados[i].toLowerCase();
      // Si el nombre del curso contiene el grado (ej: "Matemáticas 1ro Primaria")
      if (nombreCurso.includes(grado)) {
        return i;
      }
    }
    
    // También buscamos coincidencias parciales
    const gradosPrimaria = ['1ro', '2do', '3ro', '4to', '5to', '6to'];
    const gradosSecundaria = ['1ro sec', '2do sec', '3ro sec', '4to sec', '5to sec', '6to sec'];
    
    // Primaria
    for (let i = 0; i < gradosPrimaria.length; i++) {
      if (nombreCurso.includes(gradosPrimaria[i].toLowerCase()) && 
          nombreCurso.includes('primaria')) {
        return i;
      }
    }
    
    // Secundaria
    for (let i = 0; i < gradosSecundaria.length; i++) {
      const secIndex = i + 6; // Offset para secundaria
      if ((nombreCurso.includes(gradosPrimaria[i].toLowerCase()) && 
           nombreCurso.includes('secundaria')) || 
          nombreCurso.includes(gradosSecundaria[i].toLowerCase())) {
        return secIndex;
      }
    }
    
    // Si no encontramos coincidencia, devolvemos -1
    // (eso hará que el curso no esté en ningún rango)
    return -1;
  }

  // Ya no necesitamos toggleCurso ya que no habrá selección manual
  // Pero lo dejamos por si es necesario para la interfaz de administración
  toggleCurso(cursoId: number): void {
    // No hacemos nada - los cursos están automáticamente seleccionados
    // Si en el futuro necesitamos deshacer la selección, podemos habilitar este código
    /*
    const index = this.selectedCursos.indexOf(cursoId);
    if (index === -1) {
      this.selectedCursos.push(cursoId);
    } else {
      this.selectedCursos.splice(index, 1);
    }
    this.areaData.cursos = [...this.selectedCursos];
    */
  }

  loadCursos(): void {
    this.loading = true;
    this.cursoService.obtenerTodosLosCursos().subscribe({
      next: (response) => {
        this.cursos = response.data;
        console.log('Cursos cargados:', this.cursos);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando cursos:', err);
        this.showError('Error al cargar la lista de cursos');
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      console.log('Validación del formulario fallida');
      return;
    }

    this.enviando = true;
    this.clearMessages();
    
    const datosEnvio: AreaBasicRequest = {
      id_olimpiada: this.idOlimpiada,
      nombre_area: this.areaData.nombre_area.trim(),
      descripcion: this.areaData.descripcion?.trim() || '',
      gradoIniAr: this.areaData.gradoIniAr.trim(),
      gradoFinAr: this.areaData.gradoFinAr.trim(),
      cursos: [...this.selectedCursos]
    };

    console.log('Datos a enviar al backend:', datosEnvio);

    this.areaService.crearAreaBasica(datosEnvio).subscribe({
      next: (response) => {
        console.log('Respuesta exitosa:', response);
        this.showSuccess(response.message || 'Área creada exitosamente');
        this.resetForm();
        this.areaCreadaEvent.emit();
        this.enviando = false;
      },
      error: (err) => {
        console.error('Error completo:', err);
        let errorMsg = 'Error al crear el área. Verifique los datos.';
        
        if (err.error) {
          if (typeof err.error === 'string') {
            errorMsg = err.error;
          } else if (err.error.message) {
            errorMsg = err.error.message;
          } else if (err.error.errors) {
            const errorMsgs = [];
            for (const field in err.error.errors) {
              errorMsgs.push(err.error.errors[field].join(' '));
            }
            errorMsg = errorMsgs.join('. ');
          }
        }
        
        this.showError(errorMsg);
        this.enviando = false;
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
    
    if (!this.areaData.gradoIniAr?.trim()) {
      this.showError('Debe seleccionar al menos un grado para definir el rango');
      return false;
    }
    
    if (!this.areaData.gradoFinAr?.trim()) {
      this.showError('Debe seleccionar al menos un grado para definir el rango');
      return false;
    }

    if (this.selectedCursos.length === 0) {
      this.showError('No hay cursos disponibles para el rango de grados seleccionado');
      return false;
    }

    return true;
  }

  private resetForm(): void {
    this.areaData = {
      id_olimpiada: this.idOlimpiada,
      nombre_area: '',
      descripcion: '',
      gradoIniAr: '',
      gradoFinAr: '',
      cursos: []
    };
    this.selectedCursos = [];
    this.gradosSeleccionados = this.grados.map(() => false);
    this.cursosFiltrados = [];
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