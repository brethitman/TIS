import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private apiUrl = 'http://localhost:8000/api/inscripcion'; // Ajusta la URL si es necesario

  constructor(private http: HttpClient) { }

  // Crear una nueva inscripción
  crearInscripcion(inscripcionData: any): Observable<any> {
    return this.http.post(this.apiUrl, inscripcionData);
  }

  // Obtener todas las inscripciones (opcional)
  getInscripciones(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
