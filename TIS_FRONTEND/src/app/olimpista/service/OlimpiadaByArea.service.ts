import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDOlimpiadabyArea } from '../interfaces/olimpiadaAreaCategoria.interface';

@Injectable({
  providedIn: 'root'
})
export class OlimpiadaByAreaService { // Renaming this might be better, like AreaService, but keeping your name for now.

  private baseUrl = 'http://localhost:8000/api'; // Base URL for your API

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las áreas asociadas a una olimpiada específica.
   * @param olimpiadaId El ID de la olimpiada.
   * @returns Un Observable que emite un array de IDOlimpiadabyArea.
   */
  getAreasByOlimpiadaId(olimpiadaId: number): Observable<IDOlimpiadabyArea[]> {
    const url = `${this.baseUrl}/olimpiadas/${olimpiadaId}/areas`;
    return this.http.get<IDOlimpiadabyArea[]>(url);
  }




  // **NOTA:** Los siguientes métodos (getById, create, update, delete)
  // han sido comentados/eliminados porque el endpoint proporcionado
  // solo parece ser para obtener una lista de áreas por ID de olimpiada.
  // Si tienes otros endpoints para estas operaciones (ej: POST a /api/areas),
  // deberías agregarlos con la lógica correspondiente.

  /*
  // El endpoint proporcionado no permite obtener un área individual por su ID en este contexto.
  getOlimpiadaByAreaId(id_area: number): Observable<IDOlimpiadabyArea> {
     // Necesitarías un endpoint como /api/areas/{id_area} para esto,
     // o un endpoint que busque un área específica dentro de una olimpiada,
     // pero el endpoint dado es para LISTAR áreas de una olimpiada.
     console.error("Method not supported by the provided endpoint");
     throw new Error("Method not supported by the provided endpoint");
  }

  // El endpoint proporcionado es GET, no para crear, actualizar o eliminar.
  createOlimpiadaByArea(olimpiada: IDOlimpiadabyArea): Observable<IDOlimpiadabyArea> {
     console.error("Method not supported by the provided endpoint");
     throw new Error("Method not supported by the provided endpoint");
  }

  updateOlimpiadaByArea(id_area: number, olimpiada: IDOlimpiadabyArea): Observable<IDOlimpiadabyArea> {
     console.error("Method not supported by the provided endpoint");
     throw new Error("Method not supported by the provided endpoint");
  }

  deleteOlimpiadaByArea(id_area: number): Observable<void> {
     console.error("Method not supported by the provided endpoint");
     throw new Error("Method not supported by the provided endpoint");
  }
  */
}
