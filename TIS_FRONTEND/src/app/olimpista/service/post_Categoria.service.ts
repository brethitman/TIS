import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  CreateNivelRequest,
  CreateNivelesBulkRequest,
  CreateNivelesBulkResponse,
  NivelResponse,
  AreaResponse 
} from '../interfaces/post_categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class NivelService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  /**
   * Crea múltiples niveles en un área específica.
   * @param idArea ID del área donde se crearán los niveles
   * @param request Objeto con el array de niveles a crear
   * @returns Observable con la respuesta de la creación masiva
   */
  crearNivelesEnArea(idArea: number, request: CreateNivelesBulkRequest): Observable<CreateNivelesBulkResponse> {
    return this.http.post<CreateNivelesBulkResponse>(
      `${this.apiUrl}/areas/${idArea}/niveles`,
      request
    );
  }

  /**
   * Crea un solo nivel para un área específica.
   * @param idArea ID del área donde se creará el nivel
   * @param nivel Datos del nivel a crear
   * @returns Observable con la respuesta de la creación del nivel
   */
  crearNivelPorArea(idArea: number, nivel: CreateNivelRequest): Observable<NivelResponse> {
    // Enviar un objeto con la estructura que espera el backend
    return this.http.post<NivelResponse>(
      `${this.apiUrl}/areas/${idArea}/niveles`,
      { niveles: [nivel] } // Ahora lo envolvemos en un array dentro de la propiedad 'niveles'
    );
  }

  /**
   * Obtiene todos los niveles de un área específica.
   * @param idArea ID del área de la cual se quieren obtener los niveles
   * @returns Observable con el array de niveles
   */
  getNivelesPorArea(idArea: number): Observable<NivelResponse[]> {
    return this.http.get<NivelResponse[]>(
      `${this.apiUrl}/areas/${idArea}/niveles`
    );
  }

  /**
   * Actualiza un nivel existente.
   * @param idNivel ID del nivel a actualizar
   * @param datosActualizacion Datos a actualizar del nivel
   * @returns Observable con la respuesta de la actualización
   */
  actualizarNivel(idNivel: number, datosActualizacion: Partial<CreateNivelRequest>): Observable<NivelResponse> {
    return this.http.put<NivelResponse>(
      `${this.apiUrl}/niveles/${idNivel}`,
      datosActualizacion
    );
  }

  /**
   * Elimina un nivel existente.
   * @param idNivel ID del nivel a eliminar
   * @returns Observable con mensaje de confirmación
   */
  eliminarNivel(idNivel: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/niveles/${idNivel}`
    );
  }
}
