import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CursosResponse } from '../interfaces/cursoGET-interface';
@Injectable({
  providedIn: 'root',
})
export class CursoGETService {
  private apiUrl = 'http://127.0.0.1:8000/api/cursos'; // Define la URL base de la API

  constructor(private http: HttpClient) {}

  obtenerTodosLosCursos(): Observable<CursosResponse> {
    const url = `${this.apiUrl}/todos`;
    return this.http.get<CursosResponse>(url);
  }

  // Puedes agregar otros métodos para interactuar con la API de cursos
  // como crear, actualizar o eliminar cursos si tu API lo permite.
}