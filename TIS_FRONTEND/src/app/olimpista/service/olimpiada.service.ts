import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Olimpiada } from '../interfaces/olimpiada-interfase';

@Injectable({
  providedIn: 'root'
})
export class OlimpiadaService {
  private apiUrl = 'http://localhost:8000/api/olimpiada'; // URL base para endpoints de olimpiada

  constructor(private http: HttpClient) {}

  // Crear una nueva olimpiada
  createOlimpiada(olimpiada: Olimpiada): Observable<Olimpiada> {
    return this.http.post<Olimpiada>(this.apiUrl, olimpiada);
    
  }

  // Obtener todas las olimpiadas
  getOlimpiadas(): Observable<Olimpiada[]> {
    return this.http.get<Olimpiada[]>(this.apiUrl);
  }

  // Obtener una olimpiada por ID
  getOlimpiadaById(id: number): Observable<Olimpiada> {
    return this.http.get<Olimpiada>(`${this.apiUrl}/${id}`);
  }

  // Actualizar una olimpiada
  updateOlimpiada(id: number, data: Partial<Olimpiada> | any): Observable<any> {
    // Convertir fechas Date a strings si es necesario
    const payload = {
      ...data,
      fecha_inicio: data.fecha_inicio instanceof Date ? this.formatDateToBackend(data.fecha_inicio) : data.fecha_inicio,
      fecha_final: data.fecha_final instanceof Date ? this.formatDateToBackend(data.fecha_final) : data.fecha_final
    };
    return this.http.put(`${this.apiUrl}/${id}`, payload);
  }
  
  private formatDateToBackend(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  


  // Obtener una olimpiada con sus áreas relacionadas
  getOlimpiadaWithAreas(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/con-areas`);
  }

  // Método para agregar un área a una olimpiada (si es necesario)
  addAreaToOlimpiada(olimpiadaId: number, areaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${olimpiadaId}/areas`, areaData);
  }

  // Obtener áreas de una olimpiada específica
  getAreasByOlimpiada(olimpiadaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${olimpiadaId}/areas`);
  }

  deleteOlimpiada(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  
}