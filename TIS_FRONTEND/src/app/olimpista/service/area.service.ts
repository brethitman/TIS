import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area, Nivele } from '../interfaces/area.interface';
import { GetAreaRespose } from '../interfaces/get-area-response';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private apiUrl = 'http://localhost:8000/api/area';

  constructor(private http: HttpClient) { }

  // Obtener áreas paginadas
  getAreas(): Observable<GetAreaRespose> {
    return this.http.get<GetAreaRespose>(this.apiUrl);
  }

  // Obtener una sola área por ID
  getAreaById(id: number): Observable<Area> {
    return this.http.get<Area>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva área
  createArea(area: Omit<Area, 'id'|'createdAt'|'updatedAt'|'olimpiada'|'niveles'>): Observable<Area> {
    return this.http.post<Area>(this.apiUrl, area);
  }

  // Actualizar área existente
  updateArea(areaId: number, area: Partial<Area>): Observable<Area> {
    return this.http.put<Area>(`${this.apiUrl}/${areaId}`, area);
  }

  // Agregar nivel a un área
  addNivelToArea(areaId: number, nivel: Omit<Nivele, 'id_nivel'|'id_area'|'created_at'|'updated_at'>): Observable<Nivele> {
    return this.http.post<Nivele>(`${this.apiUrl}/${areaId}/niveles`, nivel);
  }
}
