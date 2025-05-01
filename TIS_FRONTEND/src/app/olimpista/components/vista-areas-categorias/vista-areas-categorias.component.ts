import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common'; // Importa Pipes necesarios
import { IDOlimpiadabyArea } from '../../interfaces/olimpiadaAreaCategoria.interface'; // Importa la interfaz correcta
import { OlimpiadaByAreaService } from '../../service/OlimpiadaByArea.service';

@Component({
  selector: 'app-vista-areas-categorias',
  standalone: true,
  // Añade los Pipes necesarios al imports
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './vista-areas-categorias.component.html',

})
export class VistaAreasCategoriasComponent implements OnInit {

  // Inyecta ActivatedRoute para obtener parámetros de la URL
  private route = inject(ActivatedRoute);
  // Inyecta el servicio para obtener las áreas por olimpiada
  private olimpiadaByAreaService = inject(OlimpiadaByAreaService);

  // Array para almacenar las áreas con sus categorías
  public areas: IDOlimpiadabyArea[] = [];

  // Estado de carga (opcional, para mostrar un indicador mientras se carga)
  public cargando: boolean = true;

  // Estado de error (opcional, para mostrar un mensaje si falla la carga)
  public errorCarga: string | null = null;

  ngOnInit(): void {
    // Obtiene el 'id' del parámetro de la ruta.
    // 'snapshot' obtiene el estado actual de la ruta, 'paramMap' un mapa de parámetros.
    // 'get('id')' obtiene el valor del parámetro 'id'. Se convierte a número.
    const idOlimpiada = Number(this.route.snapshot.paramMap.get('id'));

    // Verifica si el ID obtenido es un número válido
    if (isNaN(idOlimpiada)) {
      this.errorCarga = 'ID de Olimpiada inválido proporcionado en la URL.';
      this.cargando = false;
      console.error(this.errorCarga);
      return; // Detiene la ejecución si el ID es inválido
    }

    // Inicia el estado de carga
    this.cargando = true;
    this.errorCarga = null;

    // Llama al servicio para obtener las áreas y categorías de la olimpiada específica
    this.olimpiadaByAreaService.getAreasByOlimpiadaId(idOlimpiada).subscribe({
      next: (data: IDOlimpiadabyArea[]) => {
        // Asigna los datos recibidos (array de áreas con categorías)
        this.areas = data;
        this.cargando = false; // Finaliza el estado de carga
      },
      error: (err) => {
        // Maneja cualquier error que ocurra durante la solicitud
        console.error('Error al obtener áreas y categorías:', err);
        this.errorCarga = 'Error al cargar áreas y categorías. Por favor, intente de nuevo más tarde.';
        this.cargando = false; // Finaliza el estado de carga incluso si hay error
        // Aquí podrías añadir lógica para errores específicos (ej: err.status === 404)
      }
    });
  }
}
