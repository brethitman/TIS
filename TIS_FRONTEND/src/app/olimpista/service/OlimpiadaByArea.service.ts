import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable, map, catchError, throwError } from 'rxjs'; 
import { IDOlimpiadabyArea, OlimpiadaResponse } from '../interfaces/post_categoria.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root' 
})
export class OlimpiadaByAreaService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las áreas asociadas a una olimpiada específica.
   * @param olimpiadaId El ID de la olimpiada.
   * @returns Un Observable que emite un array de IDOlimpiadabyArea.
   */
  getAreasByOlimpiadaId(olimpiadaId: number): Observable<IDOlimpiadabyArea[]> {
    return this.http.get<IDOlimpiadabyArea[]>(`${this.apiUrl}/olimpiadas/${olimpiadaId}/areas`);
  }

  /**
   * Obtiene información detallada de una olimpiada por su ID.
   * @param olimpiadaId El ID de la olimpiada.
   * @returns Un Observable que emite la información detallada de la olimpiada.
   */
  getOlimpiadaById(olimpiadaId: number): Observable<OlimpiadaResponse> {
    return this.http.get<{olimpiada: OlimpiadaResponse}>(`${this.apiUrl}/olimpiadas/${olimpiadaId}`).pipe(
      map(response => {
        if (!response.olimpiada) {
          throw new Error('No se encontró la olimpiada');
        }
        return response.olimpiada;
      }),
      catchError(error => {
        console.error('Error al obtener olimpiada:', error);
        return throwError(() => new Error('Error al cargar los detalles de la olimpiada'));
      })
    );
  }
}
