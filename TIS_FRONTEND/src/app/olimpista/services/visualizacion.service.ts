import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Estadistica {
  id: number;
  nombre: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class VisualizacionService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getEstadisticas(idNivel: number, tipo: string): Observable<Estadistica[]> {
    return this.http.get<Estadistica[]>(`${this.apiUrl}/estadisticas/${idNivel}/${tipo}`);
  }

  getInscripcionPorNivel(idNivel: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inscripciones/nivel/${idNivel}`);
  }
} 