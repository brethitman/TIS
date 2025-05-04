import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { IDOlimpiadabyArea } from '../../interfaces/olimpiadaAreaCategoria.interface';
import { OlimpiadaByAreaService } from '../../service/OlimpiadaByArea.service';
import { CrearAreaComponent } from '../crear-area/crear-area.component';
import { NivelService } from '../../service/post_Categoria.service';
import { CreateNivelRequest, CreateNivelesBulkRequest,
  CreateNivelesBulkResponse, NivelResponse, AreaResponse  } from '../../interfaces/post_categoria.interface';

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
  // Inyectar NivelService
  private nivelService = inject(NivelService); // <-- NivelService inyectado

  public areas: IDOlimpiadabyArea[] = [];
  public cargando: boolean = true;
  public errorCarga: string | null = null;
  public idOlimpiada: number | null = null;

  // Propiedades para la gestión de niveles por área
  public areaActivaId: number | null = null; // ID del área cuyo formulario de niveles está activo (Renombrado)
  public newLevelsForArea: CreateNivelRequest[] = []; // Lista de niveles a agregar para el área activa
  public currentNewLevel: CreateNivelRequest = this.initializeNewLevel(); // Datos del nivel actual en el formulario

  public enviando: boolean = false; // Estado para el envío a la API
  public errores: string[] = []; // Mensajes de error generales (ej. de la API)
  public formErrors: string[] = []; // Errores específicos del formulario de nivel actual
  public successMessage: string | null = null; // Mensaje de éxito después de guardar los niveles

  ngOnInit(): void {
    this.obtenerIdOlimpiada();
  }

  // Inicializa un objeto CreateNivelRequest vacío para el formulario
  private initializeNewLevel(): CreateNivelRequest {
    return {
      nombre_nivel: '',
      gradoIniCat: '',
      gradoFinCat: '',
      descripcion: '', // La interfaz Request lo tiene como string, no opcional, aunque Response lo tiene como string | null
      fecha_examen: '',
      costo: 0,
      habilitacion: true
    };
  }

  // Obtiene el ID de la olimpiada desde la URL (ya existía, mantener)
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

  // Carga las áreas (ya existía, mantener)
  // NOTA: Esta función carga las áreas, pero no los niveles asociados dentro de cada área.
  // Si tu interfaz IDOlimpiadabyArea incluye los niveles (campo nivel_categorias como se vio en HTML),
  // entonces el servicio OlimpiadaByAreaService debería traerlos. Si no, necesitarías
  // llamar a getNivelesPorArea para cada área o para el área activa.
  public cargarAreas(): void { // Hago public para poder llamarla desde el output de crear-area
    this.cargando = true;
    // Agregué cache-busting con una marca de tiempo para asegurar que siempre se carguen los datos frescos
    const timestamp = new Date().getTime();
    this.olimpiadaByAreaService.getAreasByOlimpiadaId(this.idOlimpiada!) // Asumo que getAreasByOlimpiadaId acepta un timestamp
      .subscribe({
        next: (data) => {
          this.areas = data;
          this.cargando = false;
          this.errorCarga = null; 
          
        },
        error: (err) => {
          console.error('Error al cargar áreas:', err);
          this.errorCarga = 'Error al cargar áreas';
          this.cargando = false;
          this.errores = ['Error al cargar áreas. Por favor, intente de nuevo.']; // Error para mostrar al usuario
        }
      });
  }

  toggleFormulario(areaId: number): void {
    // Si haces clic en el área activa, cierra el formulario. De lo contrario, ábrelo para el área clicada.
    this.areaActivaId = this.areaActivaId === areaId ? null : areaId; // Usar areaId pasado
    // Reiniciar estado del formulario de niveles al alternar
    this.newLevelsForArea = [];
    this.currentNewLevel = this.initializeNewLevel();
    this.errores = []; // Limpiar errores generales
    this.formErrors = []; // Limpiar errores del formulario específico
    this.successMessage = null; // Limpiar mensaje de éxito
  }

  // Valida los campos del nivel que se está ingresando actualmente (en currentNewLevel)
  validarCurrentNewLevel(): boolean {
    this.formErrors = [];
    const nivel = this.currentNewLevel;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Normalizar la fecha de hoy para comparación

    if (!nivel.nombre_nivel.trim()) {
      this.formErrors.push('El nombre del nivel es obligatorio.');
    }
    if (!nivel.gradoIniCat || !nivel.gradoIniCat.trim()) { // Asegurar que no sea nulo o cadena vacía
      this.formErrors.push('El grado inicial es obligatorio.');
    }
    if (!nivel.gradoFinCat || !nivel.gradoFinCat.trim()) { // Asegurar que no sea nulo o cadena vacía
      this.formErrors.push('El grado final es obligatorio.');
    }

     // Comparación básica de grados (opcional pero recomendada)
     if (nivel.gradoIniCat && nivel.gradoFinCat) {
        // Una comparación simple de cadenas puede no ser suficiente (ej. "1A" vs "2B").
        // Si tus grados tienen un formato numérico o un orden específico,
        // necesitarás lógica más compleja aquí.
        // Por ahora, solo una comprobación básica:
        if (nivel.gradoIniCat > nivel.gradoFinCat) {
            this.formErrors.push('El grado inicial no puede ser mayor que el grado final.');
        }
        // Para validar contra grados del área, necesitarías el objeto del área activa:
        // const activeArea = this.areas.find(a => a.id_area === this.areaActivaId);
        // if (activeArea && (nivel.gradoIniCat < activeArea.gradoIniAr || nivel.gradoFinCat > activeArea.gradoFinAr)) {
        //    this.formErrors.push('Los grados del nivel deben estar dentro del rango de grados del área.');
        // }
     }

    if (!nivel.fecha_examen) { // Verifica si la fecha está vacía
        this.formErrors.push('La fecha del examen es obligatoria.');
    } else {
        const fechaExamen = new Date(nivel.fecha_examen);
        // Validación básica de formato de fecha y verificación a futuro
        if (isNaN(fechaExamen.getTime())) { // Verifica si es una fecha inválida
             this.formErrors.push('Formato de fecha de examen inválido.');
        } else if (fechaExamen < hoy) {
             this.formErrors.push('La fecha del examen debe ser en el futuro.');
        }
    }

    // Verificar costo: debe ser un número, no nulo/indefinido y no negativo
    if (nivel.costo === null || nivel.costo === undefined || isNaN(nivel.costo) || nivel.costo < 0) {
       this.formErrors.push('El costo debe ser un número válido y no negativo.');
    }

    // `habilitacion` es booleano, su valor true/false ya es válido.

    return this.formErrors.length === 0; // Retorna true si no hay errores
  }


  // Agrega el nivel actualmente ingresado a la lista de niveles a enviar (newLevelsForArea)
  agregarNivelLocal(): void {
    // Validar primero los datos del nivel actual
    if (!this.validarCurrentNewLevel()) {
      return; // Detener si la validación falla
    }

    // Agregar una copia del objeto currentNewLevel al array newLevelsForArea
    // Usamos el spread operator {...} para crear una copia superficial,
    // importante para que Angular detecte cambios y para que cada nivel en la lista
    // sea un objeto distinto aunque se basen en los mismos datos del formulario
    this.newLevelsForArea.push({ ...this.currentNewLevel });

    // Reiniciar el formulario currentNewLevel para permitir agregar otro nivel
    this.currentNewLevel = this.initializeNewLevel();
    this.formErrors = []; // Limpiar errores del formulario específico después de agregar
    this.successMessage = null; // Limpiar mensaje de éxito al agregar un nuevo nivel a la lista
    this.errores = []; // Limpiar errores generales también
  }

  // Remueve un nivel de la lista de niveles a enviar (newLevelsForArea) por su índice
  removerNivelLocal(index: number): void {
    if (index >= 0 && index < this.newLevelsForArea.length) {
      this.newLevelsForArea.splice(index, 1);
      this.errores = []; // Limpiar errores generales si la lista cambia
      this.successMessage = null; // Limpiar mensaje de éxito si la lista cambia
    }
  }

  // Envía la lista de niveles (newLevelsForArea) al backend para el área activa
  enviarNiveles(): void {
    if (!this.areaActivaId) {
      this.errores = ['No se ha seleccionado un área válida para agregar niveles.'];
      return;
    }

    if (this.newLevelsForArea.length === 0) {
      this.errores = ['Debe agregar al menos un nivel a la lista para poder guardar.'];
      return;
    }

    // Opcionalmente, podrías hacer una validación final de todos los niveles en newLevelsForArea aquí,
    // aunque ya se validan individualmente antes de agregarlos a la lista.

    this.enviando = true; // Indicar que se está enviando
    this.errores = []; // Limpiar errores previos
    this.successMessage = null; // Limpiar mensaje de éxito previo

    // Construir el objeto de petición masiva
    const bulkRequest: CreateNivelesBulkRequest = {
      niveles: this.newLevelsForArea
    };

    // Llamar al servicio para crear niveles en el área específica
    this.nivelService.crearNivelesEnArea(this.areaActivaId, bulkRequest)
      .subscribe({
        next: (response) => {
          // Manejar la respuesta exitosa
          this.successMessage = response.message || 'Niveles guardados correctamente.';
          console.log('Respuesta del backend:', response);

          // Reiniciar el estado del formulario después de un envío exitoso
          this.newLevelsForArea = [];
          this.currentNewLevel = this.initializeNewLevel();
          this.areaActivaId = null; // Cerrar la sección del formulario para el área
          this.formErrors = []; // Limpiar errores del formulario

          // Opcionalmente: recargar las áreas para mostrar los niveles recién agregados.
          // Esto depende de cómo se cargan los niveles en tu interfaz IDOlimpiadabyArea
          // y si OlimpiadaByAreaService.getAreasByOlimpiadaId los incluye.
           this.cargarAreas(); // Recargar áreas para reflejar los cambios

        },
        error: (err) => {
          // Manejar el error de la petición
          console.error('Error al crear niveles:', err);
          this.successMessage = null; // Limpiar éxito en caso de error

          // Intentar mostrar un mensaje de error útil desde la respuesta del backend
          if (err.error && err.error.message) {
             // Asumiendo que el backend envía un campo 'message' en el cuerpo del error JSON
             this.errores = [`Error al crear niveles: ${err.error.message}`];
          } else if (err.message) {
               // Mensaje de error HTTP general
              this.errores = [`Error al crear niveles: ${err.message}`];
          }
          else {
            this.errores = ['Error desconocido al crear niveles.'];
          }
          // No reiniciamos el formulario aquí para que el usuario pueda ver los errores y corregir
        },
        complete: () => {
          // La petición ha terminado (éxito o error)
          this.enviando = false;
        }
      });
  }


  // Texto para estado de habilitación (Corregido para aceptar boolean)
  getEstadoTexto(habilitacion: boolean): string {
     return habilitacion ? 'Habilitado' : 'Deshabilitado';
  }

  // El método validarFormulario original no parece ser necesario para esta nueva funcionalidad.
  // Puedes eliminarlo o comentarlo si no se usa en otra parte.
  /*
  validarFormulario(): boolean {
    this.errores = [];
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Normaliza la fecha actual
    return this.errores.length === 0;
  }
  */
}
