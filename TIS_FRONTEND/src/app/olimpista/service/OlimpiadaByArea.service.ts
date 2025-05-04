import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import { IDOlimpiadabyArea } from '../interfaces/olimpiadaAreaCategoria.interface';
import { OlimpiadaResponse } from '../interfaces/post_categoria.interface';

@Injectable({
  providedIn: 'root' 
})
export class OlimpiadaByAreaService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las áreas asociadas a una olimpiada específica.
   * @param olimpiadaId El ID de la olimpiada.
   * @returns Un Observable que emite un array de IDOlimpiadabyArea.
   */
  getAreasByOlimpiadaId(olimpiadaId: number): Observable<IDOlimpiadabyArea[]> {
    const url = `${this.baseUrl}/olimpiadas/${olimpiadaId}/areas`;
    return this.http.get<IDOlimpiadabyArea[]>(url);
  }

  /**
   * Obtiene información detallada de una olimpiada por su ID.
   * @param olimpiadaId El ID de la olimpiada.
   * @returns Un Observable que emite la información de la olimpiada.
   */
  getOlimpiadaById(olimpiadaId: number): Observable<OlimpiadaResponse> {
    const url = `${this.baseUrl}/olimpiadas/${olimpiadaId}`;
    return this.http.get<OlimpiadaResponse>(url);
  }
}