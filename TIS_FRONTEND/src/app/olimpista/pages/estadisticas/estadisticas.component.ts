import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OlimpiadaService } from '../../service/olimpiada.service';
import { OlimpiadaByAreaService } from '../../service/OlimpiadaByArea.service';
import { VisualizacionService } from '../../service/Visualizacion.service';
import { Olimpiada } from '../../interfaces/olimpiada-interfase';
import { Area, Inscripcione, Olimpista, Tutor } from '../../interfaces/inscripcion.interface';
import { IDOlimpiadabyArea } from '../../interfaces/olimpiadaAreaCategoria.interface';
import Chart from 'chart.js/auto';

interface AreaWithNiveles extends Area {
  id_area: number;
  niveles: Array<{
    id_nivel: number;
    nombre_nivel: string;
  }>;
}

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estadisticas.component.html'
})
export class EstadisticasComponent implements OnInit {
  @ViewChild('donutChart') donutChartRef!: ElementRef;
  private donutChart: Chart | null = null;
  showChart = false;
  tipoEstadistica: string = 'estado';
  tiposEstadistica = [
    { id: 'estado', nombre: 'Estado de Inscripción', icono: 'fa-check-circle' },
    { id: 'colegio', nombre: 'Distribución por Colegio', icono: 'fa-school' }
  ];
  olimpiadas: Olimpiada[] = [];
  areas: AreaWithNiveles[] = [];
  inscripciones: Inscripcione[] = [];
  inscripcionesFiltradas: Inscripcione[] = [];
  selectedOlimpiada: Olimpiada | null = null;
  selectedArea: AreaWithNiveles | null = null;
  selectedNivel: { id_nivel: number; nombre_nivel: string } | null = null;
  loading = false;
  error: string | null = null;
  miArray: any[] = [];

  // Filtros
  filtroColegio: string = '';
  filtroEstado: string = '';
  filtroNombre: string = '';
  estadosUnicos: string[] = [];
  colegiosUnicos: string[] = [];

  constructor(
    private olimpiadaService: OlimpiadaService,
    private olimpiadaByAreaService: OlimpiadaByAreaService,
    private servicio: VisualizacionService,
  ) { }

  ngOnInit(): void {
    console.log('🔄 Iniciando componente de estadísticas');
    this.loadOlimpiadas();
  }

  loadOlimpiadas(): void {
    this.loading = true;
    this.error = null;

    console.log('🔄 Cargando olimpiadas...');

    this.olimpiadaService.getOlimpiadas().subscribe({
      next: (data) => {
        console.log('✅ Olimpiadas cargadas exitosamente:', data);
        console.log('📊 Cantidad de olimpiadas:', data.length);

        if (data.length === 0) {
          console.warn('⚠️ No se encontraron olimpiadas');
          this.error = 'No se encontraron olimpiadas disponibles';
        } else {
          this.olimpiadas = data;
          console.log('🔍 Primera olimpiada:', data[0]);
        }

        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Error al cargar olimpiadas:', error);
        this.error = 'Error al cargar las olimpiadas: ' + error.message;
        this.loading = false;
      }
    });
  }

  onOlimpiadaSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedId = target.value;

    console.log('🎯 ID de olimpiada seleccionada:', selectedId);

    if (!selectedId) {
      this.selectedOlimpiada = null;
      this.selectedArea = null;
      this.selectedNivel = null;
      this.areas = [];
      this.inscripciones = [];
      return;
    }

    const olimpiada = this.olimpiadas.find(o => o.id.toString() === selectedId);

    if (olimpiada) {
      console.log('✅ Olimpiada encontrada:', olimpiada);
      this.selectedOlimpiada = olimpiada;
      this.selectedArea = null;
      this.selectedNivel = null;
      this.inscripciones = [];
      this.loadAreas(olimpiada.id);
    } else {
      console.error('❌ No se encontró la olimpiada con ID:', selectedId);
      this.error = 'No se encontró la olimpiada seleccionada';
    }
  }

  loadAreas(olimpiadaId: number): void {
    this.loading = true;
    this.error = null;

    console.log('🔄 Cargando áreas para olimpiada:', olimpiadaId);

    this.olimpiadaByAreaService.getAreasByOlimpiadaId(olimpiadaId).subscribe({
      next: (data: IDOlimpiadabyArea[]) => {
        console.log('✅ Áreas cargadas:', data);
        this.areas = data.map(area => ({
          id: area.id_area,
          id_olimpiada: area.id_olimpiada,
          id_inscripcion: 0,
          nombre_area: area.nombre_area,
          descripcion: area.descripcion || '',
          createdAt: new Date(),
          updatedAt: new Date(),
          id_area: area.id_area,
          niveles: area.nivel_categorias?.map(nivel => ({
            id_nivel: nivel.id_nivel,
            nombre_nivel: nivel.nombre_nivel
          })) || []
        }));
        this.loading = false;
      },
      error: (error: Error) => {
        console.error('❌ Error al cargar áreas:', error);
        this.error = 'Error al cargar las áreas: ' + error.message;
        this.loading = false;
      }
    });
  }

  onAreaSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedId = target.value;

    console.log('🎯 ID de área seleccionada:', selectedId);

    if (!selectedId) {
      this.selectedArea = null;
      this.selectedNivel = null;
      this.inscripciones = [];
      return;
    }

    const area = this.areas.find(a => a.id_area?.toString() === selectedId);

    if (area) {
      console.log('✅ Área encontrada:', area);
      this.selectedArea = area;
      this.selectedNivel = null;
      this.inscripciones = [];
    } else {
      console.error('❌ No se encontró el área con ID:', selectedId);
      this.error = 'No se encontró el área seleccionada';
    }
  }

  onNivelSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedId = target.value;

    console.log('🎯 ID de nivel seleccionado:', selectedId);

    if (!selectedId || !this.selectedArea) {
      this.selectedNivel = null;
      this.inscripciones = [];
      return;
    }

    const nivel = this.selectedArea.niveles.find(n => n.id_nivel.toString() === selectedId);

    if (nivel) {
      console.log('✅ Nivel encontrado:', nivel);
      this.selectedNivel = nivel;
      this.loadInscripciones();
    } else {
      console.error('❌ No se encontró el nivel con ID:', selectedId);
      this.error = 'No se encontró el nivel seleccionado';
    }
  }

  loadInscripciones(): void {
    if (!this.selectedArea || !this.selectedNivel) {
        console.warn('⚠️ No se pueden cargar inscripciones sin área y nivel seleccionados');
        return;
    }

    this.loading = true;
    this.error = null;

    console.log('🔄 Cargando inscripciones para nivel:', this.selectedNivel.id_nivel);

    this.servicio.getInscripcionPorNivel(this.selectedNivel.id_nivel).subscribe({
        next: (data: Inscripcione[]) => {
            console.log('✅ Inscripciones cargadas:', data);
            this.inscripciones = data.map((inscripcion, index) => ({
                ...inscripcion,
                id: inscripcion.id || index
            }));
            this.inscripcionesFiltradas = [...this.inscripciones];
            this.actualizarListasUnicas();
            this.aplicarFiltros();
            this.loading = false;
        },
        error: (error: Error) => {
            console.error('Error al cargar inscripciones:', error);
            this.error = 'Error al cargar las inscripciones: ' + error.message;
            this.loading = false;
        }
    });
  }

  actualizarListasUnicas(): void {
    // Obtener estados únicos
    this.estadosUnicos = [...new Set(this.inscripciones.map(ins => ins.estado))];
    
    // Obtener colegios únicos
    this.colegiosUnicos = [...new Set(this.inscripciones
      .map(ins => ins.olimpistas?.[0]?.colegio)
      .filter(colegio => colegio))];
  }

  aplicarFiltros(): void {
    this.inscripcionesFiltradas = this.inscripciones.filter(inscripcion => {
      const cumpleFiltroColegio = !this.filtroColegio || 
        inscripcion.olimpistas?.[0]?.colegio === this.filtroColegio;
      
      const cumpleFiltroEstado = !this.filtroEstado || 
        inscripcion.estado === this.filtroEstado;
      
      const nombreCompleto = this.getOlimpistaName(inscripcion).toLowerCase();
      const cumpleFiltroNombre = !this.filtroNombre || 
        nombreCompleto.includes(this.filtroNombre.toLowerCase());

      return cumpleFiltroColegio && cumpleFiltroEstado && cumpleFiltroNombre;
    });
  }

  onFiltroColegioChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filtroColegio = target.value;
    this.aplicarFiltros();
  }

  onFiltroEstadoChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filtroEstado = target.value;
    this.aplicarFiltros();
  }

  onFiltroNombreChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filtroNombre = target.value;
    this.aplicarFiltros();
  }

  getOlimpistaName(inscripcion: Inscripcione): string {
    const olimpista = inscripcion.olimpistas?.[0];
    if (!olimpista) return 'No disponible';
    return `${olimpista.nombres || ''} ${olimpista.apellidos || ''}`.trim() || 'No disponible';
  }

  getOlimpistaColegio(inscripcion: Inscripcione): string {
    return inscripcion.olimpistas?.[0]?.colegio || 'No disponible';
  }

  getTutorName(inscripcion: Inscripcione): string {
    const tutor = inscripcion.tutors?.[0];
    if (!tutor) return 'No disponible';
    return `${tutor.nombres || ''} ${tutor.apellidos || ''}`.trim() || 'No disponible';
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Pagado':
        return 'bg-green-100 text-green-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Verificado':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getOlimpistaCurso(inscripcion: Inscripcione): string | null {
    const olimpista = inscripcion.olimpistas?.[0];
    if (!olimpista) {
        return null;
    }
    
    // Si el curso está vacío o es undefined, intentamos obtenerlo del nivel seleccionado
    if (!olimpista.curso || olimpista.curso.trim() === '') {
        const nivelCategoria = inscripcion.niveles_seleccionados?.[0] as any;
        if (nivelCategoria?.gradoIniCat && nivelCategoria?.gradoFinCat) {
            return `${nivelCategoria.gradoIniCat} - ${nivelCategoria.gradoFinCat}`;
        }
        return null;
    }
    
    return olimpista.curso;
  }

  getOlimpistaCI(inscripcion: Inscripcione): string {
    return inscripcion.olimpistas?.[0]?.ci || 'No disponible';
  }

  generarEstadisticas(): void {
    if (!this.inscripcionesFiltradas.length) return;

    this.showChart = true;

    setTimeout(() => {
      if (!this.donutChartRef?.nativeElement) {
        console.error('El elemento del canvas no está disponible');
        return;
      }

      // Destruir gráfico anterior si existe
      if (this.donutChart) {
        this.donutChart.destroy();
      }

      const ctx = this.donutChartRef.nativeElement.getContext('2d');
      
      switch(this.tipoEstadistica) {
        case 'estado':
          this.generarGraficoEstados(ctx);
          break;
        case 'colegio':
          this.generarGraficoColegios(ctx);
          break;
      }
    });
  }

  private generarGraficoEstados(ctx: CanvasRenderingContext2D): void {
    const estados = this.estadosUnicos;
    const conteoEstados = estados.map(estado => 
      this.inscripcionesFiltradas.filter(ins => ins.estado === estado).length
    );

    const colores = {
      'Pagado': '#10B981',
      'Pendiente': '#F59E0B',
      'Verificado': '#3B82F6',
      'default': '#6B7280'
    };

    const backgroundColors = estados.map(estado => 
      colores[estado as keyof typeof colores] || colores.default
    );

    this.donutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: estados,
        datasets: [{
          data: conteoEstados,
          backgroundColor: backgroundColors,
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 20, font: { size: 14 } }
          },
          title: {
            display: true,
            text: 'Distribución de Estados de Inscripción',
            font: { size: 18, weight: 'bold' },
            padding: 20
          }
        },
        cutout: '60%',
        animation: { animateScale: true, animateRotate: true }
      }
    });
  }

  private generarGraficoColegios(ctx: CanvasRenderingContext2D): void {
    const colegios = [...new Set(this.inscripcionesFiltradas
      .map(ins => ins.olimpistas?.[0]?.colegio)
      .filter(colegio => colegio))];
    
    const conteoColegios = colegios.map(colegio => 
      this.inscripcionesFiltradas.filter(ins => 
        ins.olimpistas?.[0]?.colegio === colegio
      ).length
    );

    this.donutChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: colegios,
        datasets: [{
          label: 'Número de Estudiantes',
          data: conteoColegios,
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 20, font: { size: 14 } }
          },
          title: {
            display: true,
            text: 'Distribución de Estudiantes por Colegio',
            font: { size: 18, weight: 'bold' },
            padding: 20
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

}