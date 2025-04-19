import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../interfaces/area.interface';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private apiUrl = 'http://localhost:8000/api/area'; // URL de tu API

  constructor(private http: HttpClient) {}

  // Método para enviar los datos del área
  createArea(area: Area): Observable<Area> {
    return this.http.post<Area>(this.apiUrl, area);
  }

  addCategoriaToArea(areaId: number, categoria: string) {
    // Aquí iría la lógica para enviar la categoría al backend
    return this.http.post('/api/areas/' + areaId + '/categorias', { categoria });
  }

   // Método para actualizar un área
   updateArea(areaId: number, area: Partial<Area>): Observable<Area> {
    return this.http.put<Area>(`${this.apiUrl}/${areaId}`, area);
  }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl);
  }

  getAreaById(id: number): Observable<{ area: Area }> {
    return this.http.get<{ area: Area }>(`${this.apiUrl}/${id}`);
  }
  
}
