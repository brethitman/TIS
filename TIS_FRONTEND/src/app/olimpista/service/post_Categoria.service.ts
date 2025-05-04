import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NivelCategoria ,NivelCategoriaCreate,NivelCategoriaResponse} from '../interfaces/post_categoria.interface';




@Injectable({
  providedIn: 'root'
})
export class PostNivelCategoriaService {
  private apiUrl = 'http://localhost:8000/api'; // Ajusta la URL base

  constructor(private http: HttpClient) { }

  crearNivelesEnArea(idArea: number, niveles: NivelCategoriaCreate[]): Observable<NivelCategoriaResponse> {
    return this.http.post<NivelCategoriaResponse>(
      `${this.apiUrl}/areas/${idArea}/niveles`,
      { niveles }
    );
  }

  getNivelesPorArea(idArea: number): Observable<NivelCategoria[]> {
    return this.http.get<NivelCategoria[]>(
      `${this.apiUrl}/areas/${idArea}/niveles`
    );
  }

  actualizarNivel(idNivel: number, datosActualizacion: Partial<NivelCategoriaCreate>): Observable<NivelCategoria> {
    return this.http.put<NivelCategoria>(
      `${this.apiUrl}/niveles/${idNivel}`,
      datosActualizacion
    );
  }

  eliminarNivel(idNivel: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/niveles/${idNivel}`
    );
  }
}