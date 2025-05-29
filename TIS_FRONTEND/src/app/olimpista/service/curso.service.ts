// curso.service.ts - Servicio para obtener los cursos
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../interfaces/curso.interface';
<<<<<<< HEAD
import { environment } from '../../../environments/environment.development';
=======
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12

@Injectable({
  providedIn: 'root',
})
export class CursoService {
<<<<<<< HEAD
  private readonly apiUrl = environment.apiUrl;
=======
  private apiUrl = 'http://127.0.0.1:8000/api/curso'; // Cambia esto por tu endpoint real
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12

  constructor(private http: HttpClient) {}

  obtenerCursos(): Observable<Curso[]> {
<<<<<<< HEAD
    return this.http.get<Curso[]>(`${this.apiUrl}/curso`);
=======
    return this.http.get<Curso[]>(this.apiUrl);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }
}
