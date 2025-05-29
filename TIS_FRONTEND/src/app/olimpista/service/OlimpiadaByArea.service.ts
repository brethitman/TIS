import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable, map } from 'rxjs'; 
import { IDOlimpiadabyArea, OlimpiadaResponse } from '../interfaces/post_categoria.interface';
<<<<<<< HEAD
import { environment } from '../../../environments/environment.development';
=======
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12

@Injectable({
  providedIn: 'root' 
})
export class OlimpiadaByAreaService {
<<<<<<< HEAD
  private readonly apiUrl = environment.apiUrl;
=======
  private baseUrl = 'http://localhost:8000/api';
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las áreas asociadas a una olimpiada específica.
   * @param olimpiadaId El ID de la olimpiada.
   * @returns Un Observable que emite un array de IDOlimpiadabyArea.
   */
  getAreasByOlimpiadaId(olimpiadaId: number): Observable<IDOlimpiadabyArea[]> {
<<<<<<< HEAD
    return this.http.get<IDOlimpiadabyArea[]>(`${this.apiUrl}/olimpiadas/${olimpiadaId}/areas`);
=======
    const url = `${this.baseUrl}/olimpiadas/${olimpiadaId}/areas`;
    return this.http.get<IDOlimpiadabyArea[]>(url);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }

  /**
   * Obtiene información detallada de una olimpiada por su ID.
   * @param olimpiadaId El ID de la olimpiada.
   * @returns Un Observable que emite la información detallada de la olimpiada.
   */
  getOlimpiadaById(olimpiadaId: number): Observable<OlimpiadaResponse> {
<<<<<<< HEAD
    return this.http.get<{olimpiada: OlimpiadaResponse}>(`${this.apiUrl}/olimpiadas/${olimpiadaId}`).pipe(
=======
    const url = `${this.baseUrl}/olimpiadas/${olimpiadaId}`;
    return this.http.get<{olimpiada: OlimpiadaResponse}>(url).pipe(
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
      map(response => response.olimpiada)
    );
  }
}
