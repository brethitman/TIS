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
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';

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
            nombre_nivel: nivel.nombre_nivel,
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
    if (!this.inscripciones || this.inscripciones.length === 0) {
      this.inscripcionesFiltradas = [];
      return;
    }

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

 async exportarPDF() {
    try {
      // Validación de campos requeridos
      if (!this.selectedOlimpiada || !this.selectedArea || !this.selectedNivel) {
        this.error = 'Por favor, seleccione una olimpiada, área y nivel antes de exportar el PDF';
        return;
      }

      // Crear un nuevo documento PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      let yOffset = 30;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (2 * margin);

      // HEADER PRINCIPAL - Diseño corporativo con paleta azul
      // Fondo del header con gradiente azul
      pdf.setFillColor(15, 23, 42); // bg-slate-900 (azul muy oscuro)
      pdf.rect(0, 0, pageWidth, 45, 'F');
      
      // Línea decorativa azul brillante
      pdf.setFillColor(59, 130, 246); // bg-blue-500
      pdf.rect(0, 43, pageWidth, 2, 'F');

      // Título principal
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(28);
      pdf.setTextColor(255, 255, 255); // text-white
      pdf.text('REPORTE DE ESTADÍSTICAS', pageWidth / 2, 28, { align: 'center' });
      
      // Subtítulo
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.setTextColor(191, 219, 254); // text-blue-200
      const fechaActual = new Date().toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      pdf.text(`Generado el ${fechaActual}`, pageWidth / 2, 38, { align: 'center' });

      yOffset = 65;

      // SECCIÓN DE FILTROS - Card profesional con paleta azul
      if (this.selectedOlimpiada && this.selectedArea && this.selectedNivel) {
        // Título de sección
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(16);
        pdf.setTextColor(30, 58, 138); // text-blue-900
        pdf.text('FILTROS APLICADOS', margin, yOffset);
        yOffset += 15;

        // Card con sombra simulada
        const cardHeight = 45;
        
        // Sombra azul sutil
        pdf.setFillColor(59, 130, 246, 0.2); // shadow con azul
        pdf.roundedRect(margin + 2, yOffset + 2, contentWidth, cardHeight, 8, 8, 'F');
        
        // Card principal con fondo azul muy claro
        pdf.setFillColor(239, 246, 255); // bg-blue-50
        pdf.roundedRect(margin, yOffset, contentWidth, cardHeight, 8, 8, 'F');
        
        // Borde azul sutil
        pdf.setDrawColor(147, 197, 253); // border-blue-300
        pdf.setLineWidth(0.5);
        pdf.roundedRect(margin, yOffset, contentWidth, cardHeight, 8, 8, 'S');

        // Contenido de filtros en columnas
        const colWidth = contentWidth / 3;
        
        // Olimpiada
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        pdf.setTextColor(75, 85, 99); // text-blue-600
        pdf.text('OLIMPIADA', margin + 15, yOffset + 15);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(12);
        pdf.setTextColor(30, 58, 138); // text-blue-900
        pdf.text(this.selectedOlimpiada.nombre_olimpiada, margin + 15, yOffset + 25);
        
        // Área
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        pdf.setTextColor(75, 85, 99);
        pdf.text('ÁREA', margin + 15 + colWidth, yOffset + 15);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(12);
        pdf.setTextColor(30, 58, 138);
        pdf.text(this.selectedArea.nombre_area, margin + 15 + colWidth, yOffset + 25);
        
        // Nivel
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        pdf.setTextColor(75, 85, 99);
        pdf.text('NIVEL', margin + 15 + (colWidth * 2), yOffset + 15);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(12);
        pdf.setTextColor(30, 58, 138);
        pdf.text(this.selectedNivel.nombre_nivel, margin + 15 + (colWidth * 2), yOffset + 25);
        
        yOffset += cardHeight + 25;
      }

      // TABLA DE INSCRIPCIONES - Diseño moderno con paleta azul y contenido adaptativo
      if (this.inscripcionesFiltradas.length > 0) {
        // Título de sección
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(18);
        pdf.setTextColor(30, 58, 138); // text-blue-900
        pdf.text('LISTA DE INSCRIPCIONES', margin, yOffset);
        yOffset += 20;

        // Configuración de tabla mejorada
        const headers = ['Estudiante', 'Institución', 'Tutor', 'Estado'];
        const columnWidths = [55, 45, 45, 25]; // Más equilibrado
        const baseRowHeight = 8;
        
        // Header de tabla con gradiente azul
        pdf.setFillColor(30, 58, 138); // bg-blue-900
        pdf.rect(margin, yOffset - 3, contentWidth, 15, 'F');
        
        let xOffset = margin + 3;
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        pdf.setTextColor(255, 255, 255);
        
        headers.forEach((header, index) => {
          pdf.text(header.toUpperCase(), xOffset, yOffset + 6);
          xOffset += columnWidths[index];
        });
        yOffset += 15;

        // Filas de datos con contenido adaptativo
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        
        this.inscripcionesFiltradas.forEach((inscripcion, index) => {
          // Preparar contenido de cada celda
          const nombreEstudiante = this.getOlimpistaName(inscripcion);
          const institucion = this.getOlimpistaColegio(inscripcion);
          const tutor = this.getTutorName(inscripcion);
          const estado = inscripcion.estado;

          // Dividir texto largo en múltiples líneas
          const estudianteLines = this.splitTextToFit(pdf, nombreEstudiante, columnWidths[0] - 4);
          const institucionLines = this.splitTextToFit(pdf, institucion, columnWidths[1] - 4);
          const tutorLines = this.splitTextToFit(pdf, tutor, columnWidths[2] - 4);
          
          // Calcular altura necesaria para esta fila
          const maxLines = Math.max(estudianteLines.length, institucionLines.length, tutorLines.length, 1);
          const dynamicRowHeight = Math.max(baseRowHeight, maxLines * 4 + 4);

          // Verificar nueva página
          if (yOffset + dynamicRowHeight > pageHeight - 40) {
            pdf.addPage();
            yOffset = margin + 20;
            
            // Repetir header en nueva página
            pdf.setFillColor(30, 58, 138);
            pdf.rect(margin, yOffset - 3, contentWidth, 15, 'F');
            
            let headerXOffset = margin + 3;
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(10);
            pdf.setTextColor(255, 255, 255);
            
            headers.forEach((header, headerIndex) => {
              pdf.text(header.toUpperCase(), headerXOffset, yOffset + 6);
              headerXOffset += columnWidths[headerIndex];
            });
            yOffset += 15;
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9);
          }

          // Fondo alternado con colores azules suaves
          if (index % 2 === 0) {
            pdf.setFillColor(239, 246, 255); // bg-blue-50
          } else {
            pdf.setFillColor(219, 234, 254); // bg-blue-100
          }
          pdf.rect(margin, yOffset, contentWidth, dynamicRowHeight, 'F');

          // Líneas divisorias sutiles
          pdf.setDrawColor(147, 197, 253); // border-blue-300
          pdf.setLineWidth(0.2);
          pdf.line(margin, yOffset + dynamicRowHeight, margin + contentWidth, yOffset + dynamicRowHeight);

          xOffset = margin + 3;
          pdf.setTextColor(30, 58, 138); // text-blue-900

          // Nombre del estudiante (múltiples líneas si es necesario)
          estudianteLines.forEach((line, lineIndex) => {
            pdf.text(line, xOffset, yOffset + 6 + (lineIndex * 4));
          });
          xOffset += columnWidths[0];
          
          // Institución (múltiples líneas si es necesario)
          institucionLines.forEach((line, lineIndex) => {
            pdf.text(line, xOffset, yOffset + 6 + (lineIndex * 4));
          });
          xOffset += columnWidths[1];
          
          // Tutor (múltiples líneas si es necesario)
          tutorLines.forEach((line, lineIndex) => {
            pdf.text(line, xOffset, yOffset + 6 + (lineIndex * 4));
          });
          xOffset += columnWidths[2];
          
          // Badge de estado con colores azules mejorados
          const estadoColors = this.getEstadoColorsProfessional(estado);
          
          // Background del badge
          pdf.setFillColor(
            estadoColors.bg[0],
            estadoColors.bg[1],
            estadoColors.bg[2]
          );
          const badgeY = yOffset + (dynamicRowHeight / 2) - 4;
          pdf.roundedRect(xOffset, badgeY, 22, 8, 3, 3, 'F');
          
          // Texto del badge
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(7);
          pdf.setTextColor(
            estadoColors.text[0],
            estadoColors.text[1],
            estadoColors.text[2] || 255
          );
          pdf.text(estado.toUpperCase(), xOffset + 11, badgeY + 5, { align: 'center' });
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(9);
          
          yOffset += dynamicRowHeight;
        });

        yOffset += 30;
      }

      // GRÁFICAS - Sección profesional con colores azules
      const tiposEstadisticaOriginal = this.tipoEstadistica;
      
      // Primera gráfica (Estado)
      this.tipoEstadistica = 'estado';
      this.generarEstadisticas();
      await new Promise(resolve => setTimeout(resolve, 500));

      if (this.donutChartRef) {
        // Verificar nueva página
        if (yOffset + 120 > pageHeight - 40) {
          pdf.addPage();
          yOffset = margin + 20;
        }

        // Título de sección con línea decorativa azul
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(16);
        pdf.setTextColor(30, 58, 138);
        pdf.text('ANÁLISIS ESTADÍSTICO', margin, yOffset);
        
        // Línea decorativa azul
        pdf.setDrawColor(59, 130, 246); // border-blue-500
        pdf.setLineWidth(2);
        pdf.line(margin, yOffset + 5, margin + 60, yOffset + 5);
        yOffset += 20;

        const chartElement = this.donutChartRef.nativeElement;
        const chartImage = await htmlToImage.toPng(chartElement);
        
        // Card para la gráfica con bordes azules
        pdf.setFillColor(255, 255, 255);
        pdf.roundedRect(margin, yOffset, contentWidth, 90, 5, 5, 'F');
        pdf.setDrawColor(147, 197, 253); // border-blue-300
        pdf.setLineWidth(1);
        pdf.roundedRect(margin, yOffset, contentWidth, 90, 5, 5, 'S');
        
        // Subtítulo de gráfica
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(30, 64, 175); // text-blue-800
        pdf.text('Distribución de Estados de Inscripción', margin + 10, yOffset + 15);
        
        // Imagen de la gráfica
        const imgWidth = contentWidth - 20;
        const imgHeight = 70;
        pdf.addImage(chartImage, 'PNG', margin + 10, yOffset + 20, imgWidth, imgHeight);
        yOffset += 100;
      }

      // Segunda gráfica (Colegio)
      this.tipoEstadistica = 'colegio';
      this.generarEstadisticas();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (this.donutChartRef) {
        // Verificar nueva página
        if (yOffset + 100 > pageHeight - 40) {
          pdf.addPage();
          yOffset = margin + 20;
        }

        const chartElement = this.donutChartRef.nativeElement;
        const chartImage = await htmlToImage.toPng(chartElement);
        
        // Card para la segunda gráfica
        pdf.setFillColor(255, 255, 255);
        pdf.roundedRect(margin, yOffset, contentWidth, 90, 5, 5, 'F');
        pdf.setDrawColor(147, 197, 253);
        pdf.setLineWidth(1);
        pdf.roundedRect(margin, yOffset, contentWidth, 90, 5, 5, 'S');
        
        // Subtítulo
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(30, 64, 175);
        pdf.text('Distribución de Estudiantes por Institución', margin + 10, yOffset + 15);
        
        // Imagen
        const imgWidth = contentWidth - 20;
        const imgHeight = 70;
        pdf.addImage(chartImage, 'PNG', margin + 10, yOffset + 20, imgWidth, imgHeight);
        yOffset += 100;
      }

      // FOOTER PROFESIONAL con colores azules
      const footerY = pageHeight - 20;
      pdf.setFillColor(239, 246, 255); // bg-blue-50
      pdf.rect(0, footerY - 10, pageWidth, 30, 'F');
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(75, 85, 99); // text-blue-600
      pdf.text('Documento generado automáticamente', margin, footerY);
      pdf.text(`Página ${pdf.getNumberOfPages()}`, pageWidth - margin, footerY, { align: 'right' });

      // Restaurar estado original
      this.tipoEstadistica = tiposEstadisticaOriginal;
      this.generarEstadisticas();

      // Guardar el PDF
      pdf.save(`reporte_estadisticas_${new Date().toISOString().split('T')[0]}.pdf`);
      
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  }

 
  private splitTextToFit(pdf: any, text: string, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const textWidth = pdf.getTextWidth(testLine);
      
      if (textWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          lines.push(word.substring(0, Math.floor(maxWidth / pdf.getTextWidth('M')) - 1) + '...');
          currentLine = '';
        }
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines.length > 0 ? lines : [text];
  }

  private getEstadoColorsProfessional(estado: string): { bg: number[], text: number[] } {
    switch (estado) {
      case 'Pagado':
        return { 
          bg: [34, 197, 94],    // bg-green-500 (mantener verde para pagado)
          text: [255, 255, 255]  // text-white
        };
      case 'Pendiente':
        return { 
          bg: [245, 158, 11],    // bg-amber-500 (mantener ámbar para pendiente)
          text: [255, 255, 255]  // text-white
        };
      case 'Verificado':
        return { 
          bg: [37, 99, 235],     // bg-blue-600 (azul para verificado)
          text: [255, 255, 255]  // text-white
        };
      case 'Rechazado':
        return { 
          bg: [239, 68, 68],     // bg-red-500 (mantener rojo para rechazado)
          text: [255, 255, 255]  // text-white
        };
      default:
        return { 
          bg: [30, 64, 175],     // bg-blue-800 (azul por defecto)
          text: [255, 255, 255]  // text-white
        };
    }
  }

  // Método auxiliar para obtener color simple (mantener compatibilidad)
  private getEstadoColor(estado: string): string {
    const colors = this.getEstadoColorsProfessional(estado);
    return `rgb(${colors.bg.join(',')})`;
  }

}