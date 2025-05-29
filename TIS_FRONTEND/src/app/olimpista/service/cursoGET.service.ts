import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CursosResponse } from '../interfaces/cursoGET-interface';
<<<<<<< HEAD
import { environment } from '../../../environments/environment.development';

=======
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
@Injectable({
  providedIn: 'root',
})
export class CursoGETService {
<<<<<<< HEAD
  private readonly apiUrl = environment.apiUrl;
=======
  private apiUrl = 'http://127.0.0.1:8000/api/cursos'; // Define la URL base de la API
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12

  constructor(private http: HttpClient) {}

  obtenerTodosLosCursos(): Observable<CursosResponse> {
<<<<<<< HEAD
    return this.http.get<CursosResponse>(`${this.apiUrl}/cursos/todos`);
=======
    const url = `${this.apiUrl}/todos`;
    return this.http.get<CursosResponse>(url);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }

  // Puedes agregar otros métodos para interactuar con la API de cursos
  // como crear, actualizar o eliminar cursos si tu API lo permite.
}