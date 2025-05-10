import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AreaNuevoService } from '../../service/AreaNuevo.service';
import { AreaBasicRequest, AreaBasicResponse } from '../../interfaces/AreaNuevo.interface';

@Component({
  selector: 'app-crear-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-area.component.html',
})
export class CrearAreaComponent implements OnInit {
  @Input() idOlimpiada!: number; // Recibe el ID de la olimpiada desde el componente padre
  @Output() areaCreadaEvent = new EventEmitter<void>();
  
  // Estados de UI
  public mostrarFormulario: boolean = false;
  public enviando: boolean = false;
  public successMessage: string | null = null;
  public errorMessage: string | null = null;
  
  // Lista de grados disponibles
  public grados: string[] = [
    '1° Primaria', '2° Primaria', '3° Primaria', '4° Primaria', '5° Primaria', '6° Primaria',
    '1° Secundaria', '2° Secundaria', '3° Secundaria', '4° Secundaria', '5° Secundaria', '6° Secundaria'
  ];
  // Checkboxes para selección de grados
  public gradosSeleccionados: boolean[] = [];
  
  // Objeto de datos del área
  areaData: AreaBasicRequest = {
    id_olimpiada: 0,
    nombre_area: '',
    descripcion: '',
    gradoIniAr: '',
    gradoFinAr: '',
    cursos: [] // Array of CursoRequest
  };

  constructor(
    private areaService: AreaNuevoService
  ) {}

  ngOnInit(): void {
    // Verificar y asignar el ID de la olimpiada
    if (this.idOlimpiada) {
      this.areaData.id_olimpiada = this.idOlimpiada;
    }
    // Inicializar array de checkboxes para grados
    this.gradosSeleccionados = this.grados.map(() => false);
  }
  
  // Método para mostrar/ocultar el formulario
  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.resetForm();
    }
  }

  // Maneja la selección de checkboxes de grados
  onCheckboxChange(index: number): void {
    this.gradosSeleccionados[index] = !this.gradosSeleccionados[index];
    this.actualizarRangoGrados();
    console.log('Cursos generados:', this.areaData.cursos); // Para debugging
  }
  
  // Actualiza el rango de grados basado en las selecciones
  actualizarRangoGrados(): void {
    // Encontrar el primer grado seleccionado
    const primerIndice = this.gradosSeleccionados.findIndex(selected => selected);
    
    // Encontrar el último grado seleccionado
    const ultimoIndice = this.gradosSeleccionados.lastIndexOf(true);
    
    if (primerIndice !== -1 && ultimoIndice !== -1) {
      this.areaData.gradoIniAr = this.grados[primerIndice];
      this.areaData.gradoFinAr = this.grados[ultimoIndice];
      
      // Generamos automáticamente los IDs de cursos basados en el rango seleccionado
      this.generarCursosPorRango(primerIndice, ultimoIndice);
    } else {
      this.areaData.gradoIniAr = '';
      this.areaData.gradoFinAr = '';
      this.areaData.cursos = [];
    }
  }
  
  // Método para generar automáticamente los IDs de cursos basados en el rango de grados
  private generarCursosPorRango(primerIndice: number, ultimoIndice: number): void {
    if (primerIndice === -1 || ultimoIndice === -1) {
      this.areaData.cursos = [];
      return;
    }

    // Mapeo correcto de índices de grados a IDs de cursos
    const mapeoIndiceACurso: { [key: number]: number } = {
      0: 1,  // 1° Primaria -> ID 1
      1: 2,  // 2° Primaria -> ID 2
      2: 3,  // 3° Primaria -> ID 3
      3: 4,  // 4° Primaria -> ID 4
      4: 5,  // 5° Primaria -> ID 5
      5: 6,  // 6° Primaria -> ID 6
      6: 7,  // 1° Secundaria -> ID 7
      7: 8,  // 2° Secundaria -> ID 8
      8: 9,  // 3° Secundaria -> ID 9
      9: 10, // 4° Secundaria -> ID 10
      10: 11, // 5° Secundaria -> ID 11
      11: 12  // 6° Secundaria -> ID 12
    };

    this.areaData.cursos = [];
    
    // Incluir todos los cursos en el rango seleccionado
    for (let i = primerIndice; i <= ultimoIndice; i++) {
      if (this.gradosSeleccionados[i] && mapeoIndiceACurso[i]) {
        this.areaData.cursos.push(mapeoIndiceACurso[i]);
      }
    }

    console.log('Cursos generados:', this.areaData.cursos);
  }

  // Validación del formulario
  validateForm(): boolean {
    if (!this.areaData.nombre_area) {
      this.errorMessage = 'El nombre del área es requerido';
      return false;
    }

    if (!this.areaData.gradoIniAr || !this.areaData.gradoFinAr) {
      this.errorMessage = 'Debe seleccionar un rango de grados';
      return false;
    }

    if (!this.areaData.cursos || this.areaData.cursos.length === 0) {
      this.errorMessage = 'Debe seleccionar al menos un curso';
      return false;
    }

    if (!this.idOlimpiada) {
      this.errorMessage = 'No se ha seleccionado una olimpiada';
      return false;
    }

    return true;
  }

  // Envío del formulario
  crearArea(): void {
    if (!this.validateForm()) {
      return;
    }

    this.enviando = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Extrae solo el número del grado para enviar al backend
    const extraerNumeroGrado = (gradoTexto: string): string => {
      return gradoTexto.split('°')[0].trim();
    };

    const areaData: AreaBasicRequest = {
      id_olimpiada: this.idOlimpiada,
      nombre_area: this.areaData.nombre_area.trim(),
      descripcion: this.areaData.descripcion?.trim() || '',
      gradoIniAr: extraerNumeroGrado(this.areaData.gradoIniAr),
      gradoFinAr: extraerNumeroGrado(this.areaData.gradoFinAr),
      cursos: [...this.areaData.cursos] // Copia para evitar problemas de referencia
    };

    console.log('Datos a enviar al backend:', areaData);

    this.areaService.crearAreaBasica(areaData).subscribe({
      next: (response: AreaBasicResponse) => {
        this.successMessage = 'Área creada exitosamente';
        this.enviando = false;
        this.resetForm();
        this.toggleFormulario();
        this.areaCreadaEvent.emit();
      },
      error: (error) => {
        console.error('Error creando área:', error);
        this.enviando = false;
        
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else if (error.error && error.error.errors) {
          // Manejar errores de validación específicos
          const errorMessages = Object.values(error.error.errors).flat();
          this.errorMessage = errorMessages.join(', ');
        } else {
          this.errorMessage = 'Error al crear el área. Por favor, intente nuevamente.';
        }
      }
    });
  }

  // Resetea el formulario
  private resetForm(): void {
    // Mantiene el ID de olimpiada al resetear
    this.areaData = {
      id_olimpiada: this.idOlimpiada,
      nombre_area: '',
      descripcion: '',
      gradoIniAr: '',
      gradoFinAr: '',
      cursos: []
    };
    this.gradosSeleccionados = this.grados.map(() => false);
    this.clearMessages();
  }

  // Limpia los mensajes de estado
  private clearMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }
}