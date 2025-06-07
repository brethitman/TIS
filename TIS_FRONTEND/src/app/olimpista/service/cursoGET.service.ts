import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CursosResponse } from '../interfaces/cursoGET-interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CursoGETService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerTodosLosCursos(): Observable<CursosResponse> {
    return this.http.get<CursosResponse>(`${this.apiUrl}/cursos/todos`);
  }

  // Puedes agregar otros métodos para interactuar con la API de cursos
  // como crear, actualizar o eliminar cursos si tu API lo permite.
}