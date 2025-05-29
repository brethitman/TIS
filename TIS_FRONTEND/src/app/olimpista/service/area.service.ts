import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area, Nivele } from '../interfaces/area.interface';
import { GetAreaRespose } from '../interfaces/get-area-response';
<<<<<<< HEAD
import { environment } from '../../../environments/environment.development';
=======
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12

@Injectable({
  providedIn: 'root'
})
export class AreaService {
<<<<<<< HEAD
  private readonly apiUrl = environment.apiUrl;
=======
  private apiUrl = 'http://localhost:8000/api/area';
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12

  constructor(private http: HttpClient) { }

  // Obtener áreas paginadas
  getAreas(): Observable<GetAreaRespose> {
<<<<<<< HEAD
    return this.http.get<GetAreaRespose>(`${this.apiUrl}/area`);
=======
    return this.http.get<GetAreaRespose>(this.apiUrl);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }

  // Obtener una sola área por ID
  getAreaById(id: number): Observable<Area> {
<<<<<<< HEAD
    return this.http.get<Area>(`${this.apiUrl}/area/${id}`);
=======
    return this.http.get<Area>(`${this.apiUrl}/${id}`);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }

  // Crear nueva área
  createArea(area: Omit<Area, 'id'|'createdAt'|'updatedAt'|'olimpiada'|'niveles'>): Observable<Area> {
<<<<<<< HEAD
    return this.http.post<Area>(`${this.apiUrl}/area`, area);
=======
    return this.http.post<Area>(this.apiUrl, area);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }

  // Actualizar área existente
  updateArea(areaId: number, area: Partial<Area>): Observable<Area> {
<<<<<<< HEAD
    return this.http.put<Area>(`${this.apiUrl}/area/${areaId}`, area);
=======
    return this.http.put<Area>(`${this.apiUrl}/${areaId}`, area);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }

  // Agregar nivel a un área
  addNivelToArea(areaId: number, nivel: Omit<Nivele, 'id_nivel'|'id_area'|'created_at'|'updated_at'>): Observable<Nivele> {
<<<<<<< HEAD
    return this.http.post<Nivele>(`${this.apiUrl}/area/${areaId}/niveles`, nivel);
=======
    return this.http.post<Nivele>(`${this.apiUrl}/${areaId}/niveles`, nivel);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }
}
