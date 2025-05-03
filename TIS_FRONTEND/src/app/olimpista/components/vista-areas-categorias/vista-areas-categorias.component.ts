import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IDOlimpiadabyArea } from '../../interfaces/olimpiadaAreaCategoria.interface';
import { OlimpiadaByAreaService } from '../../service/OlimpiadaByArea.service';
import { CrearAreaComponent } from '../crear-area/crear-area.component';
import { PostNivelCategoriaService } from '../../service/post_Categoria.service';
import { NivelCategoriaCreate, NivelCategoriaResponse } from '../../interfaces/post_categoria.interface';

@Component({
  selector: 'app-vista-areas-categorias',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    CurrencyPipe,
    CrearAreaComponent,
    FormsModule
  ],
  templateUrl: './vista-areas-categorias.component.html',
})
export class VistaAreasCategoriasComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private olimpiadaByAreaService = inject(OlimpiadaByAreaService);
  private nivelService = inject(PostNivelCategoriaService);

  public areas: IDOlimpiadabyArea[] = [];
  public cargando: boolean = true;
  public errorCarga: string | null = null;
  public idOlimpiada: number | null = null;
  public nuevoNivel: NivelCategoriaCreate = this.initNuevoNivel();
  public areaActiva: number | null = null;
  public enviando: boolean = false;
  public errores: string[] = [];
  public olimpiadaSeleccionada: any = null;

  // NUEVO: área seleccionada para mostrar contenido
  public areaSeleccionada: IDOlimpiadabyArea | null = null;

  ngOnInit(): void {
    this.obtenerIdOlimpiada();
  
    const data = localStorage.getItem('olimpiadaSeleccionada');
    this.olimpiadaSeleccionada = data ? JSON.parse(data) : null;
  }

  private obtenerIdOlimpiada(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.idOlimpiada = idParam ? Number(idParam) : null;

    if (!this.idOlimpiada || isNaN(this.idOlimpiada)) {
      this.errorCarga = 'ID de olimpiada inválido';
      this.cargando = false;
      return;
    }
    this.cargarAreas();
  }

  private cargarAreas(): void {
    this.cargando = true;
    this.olimpiadaByAreaService.getAreasByOlimpiadaId(this.idOlimpiada!)
      .subscribe({
        next: (data) => {
          this.areas = data;
          this.cargando = false;

          // Si hay al menos un área, selecciona la primera automáticamente
          if (data.length > 0) {
            this.seleccionarArea(data[0]);
          }
        },
        error: (err) => {
          console.error('Error:', err);
          this.errorCarga = 'Error al cargar áreas';
          this.cargando = false;
        }
      });
  }

  private initNuevoNivel(): NivelCategoriaCreate {
    return {
      nombre_nivel: '',
      gradoIniCat: '',
      gradoFinCat: '',
      descripcion: '',
      fecha_examen: new Date().toISOString().split('T')[0],
      costo: 0,
      habilitacion: 1
    };
  }

  // NUEVO: Método para seleccionar un área desde el menú
  seleccionarArea(area: IDOlimpiadabyArea): void {
    this.areaSeleccionada = area;
    this.areaActiva = null; // Opcional: cierra el formulario si estaba abierto
    this.nuevoNivel = this.initNuevoNivel();
    this.errores = [];
  }

  toggleFormulario(areaId: number): void {
    this.areaActiva = this.areaActiva === areaId ? null : areaId;
    this.nuevoNivel = this.initNuevoNivel();
    this.errores = [];
  }

  validarFormulario(): boolean {
    this.errores = [];
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (!this.nuevoNivel.nombre_nivel.trim()) {
      this.errores.push('Nombre del nivel es requerido');
    }

    if (!this.nuevoNivel.gradoIniCat.trim()) {
      this.errores.push('Grado inicial es requerido');
    }

    if (!this.nuevoNivel.gradoFinCat.trim()) {
      this.errores.push('Grado final es requerido');
    }

    const fechaExamen = new Date(this.nuevoNivel.fecha_examen);
    if (fechaExamen < hoy) {
      this.errores.push('La fecha debe ser futura');
    }

    if (this.nuevoNivel.costo <= 0) {
      this.errores.push('Costo debe ser mayor a 0');
    }

    return this.errores.length === 0;
  }

  crearNivel(areaId: number): void {
    if (!this.validarFormulario()) return;

    this.enviando = true;

    const niveles = [{
      ...this.nuevoNivel,
      fecha_examen: this.nuevoNivel.fecha_examen
    }];

    this.nivelService.crearNivelesEnArea(areaId, niveles)
      .subscribe({
        next: (response) => {
          const area = this.areas.find(a => a.id_area === areaId);
          if (area) {
            area.nivel_categorias = [
              ...(area.nivel_categorias || []),
              ...response.niveles
            ];
          }

          this.areaActiva = null;
          this.enviando = false;
          alert(response.message);

          this.cargarAreas(); // Opcional
        },
        error: (err) => {
          console.error('Error completo:', err);
          this.enviando = false;
          let mensaje = 'Error desconocido';

          if (err.error?.errors) {
            mensaje = Object.values(err.error.errors).join(', ');
          } else if (err.error?.message) {
            mensaje = err.error.message;
          }

          alert(`Error: ${mensaje}`);
        }
      });
  }

  getEstadoTexto(habilitacion: number): string {
    return habilitacion === 1 ? 'Habilitado' : 'Deshabilitado';
  }
}
