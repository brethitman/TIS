import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Olimpiada } from '../interfaces/olimpiada.interfacel';

@Injectable({
  providedIn: 'root'
})
export class OlimpiadaService {

  private apiUrl = 'http://localhost:8000/api/olimpiada';  // Reemplaza con la URL real de tu API

  constructor(private http: HttpClient) { }

  // Obtener todas las olimpiadas
  obtenerOlimpiadas(): Observable<Olimpiada[]> {
    return this.http.get<Olimpiada[]>(this.apiUrl);
  }

  // Crear una nueva olimpiada
  crearOlimpiada(olimpiada: Olimpiada): Observable<Olimpiada> {
    return this.http.post<Olimpiada>(this.apiUrl, olimpiada);
  }

  // Obtener olimpiada por ID
  obtenerOlimpiadaPorId(id: number): Observable<Olimpiada> {
    return this.http.get<Olimpiada>(`${this.apiUrl}/${id}`);
  }
}
