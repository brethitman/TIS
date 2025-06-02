import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CursoWithAreas } from '../interfaces/cursoAreaNiveles.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CursoAreaService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Obtener cursos con sus áreas por olimpiada
  getCursosConAreasByOlimpiada(olimpiadaId: number): Observable<CursoWithAreas[]> {
    return this.http.get<CursoWithAreas[]>(`${this.apiUrl}/olimpiadas/${olimpiadaId}/cursos-areas`);
  }
}
