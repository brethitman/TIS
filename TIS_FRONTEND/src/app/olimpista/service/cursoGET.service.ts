import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CursosResponse } from '../interfaces/cursoGET-interface';
import { environment } from '../../../environments/environment.development';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CursoGETService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerTodosLosCursos(): Observable<CursosResponse> {
    console.log('Llamando a la API de cursos...');
    return this.http.get<CursosResponse>(`${this.apiUrl}/cursos/todos`).pipe(
      tap(response => console.log('Respuesta de la API:', response))
    );
  }

  // Puedes agregar otros métodos para interactuar con la API de cursos
  // como crear, actualizar o eliminar cursos si tu API lo permite.
}