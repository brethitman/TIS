// curso.service.ts - Servicio para obtener los cursos
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../interfaces/curso.interface';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiUrl = 'http://127.0.0.1:8000/api/curso'; // Cambia esto por tu endpoint real

  constructor(private http: HttpClient) {}

  obtenerCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }
}
