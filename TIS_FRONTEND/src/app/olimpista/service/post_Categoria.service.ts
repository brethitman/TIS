import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateNivelRequest,CreateNivelesBulkRequest,
  CreateNivelesBulkResponse,
  NivelResponse,
  AreaResponse } from '../interfaces/post_categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class NivelService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  crearNivelesEnArea(idArea: number, request: CreateNivelesBulkRequest): Observable<CreateNivelesBulkResponse> {
    return this.http.post<CreateNivelesBulkResponse>(
      `${this.apiUrl}/areas/${idArea}/niveles`,
      request
    );
  }

  getNivelesPorArea(idArea: number): Observable<NivelResponse[]> {
    return this.http.get<NivelResponse[]>(
      `${this.apiUrl}/areas/${idArea}/niveles`
    );
  }

  actualizarNivel(idNivel: number, datosActualizacion: Partial<CreateNivelRequest>): Observable<NivelResponse> {
    return this.http.put<NivelResponse>(
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
