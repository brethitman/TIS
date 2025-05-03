import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NivelesCategoria } from '../interfaces/categoria.interface';
//import { GetNivelesCategoriaResponse } from '../interfaces/get-categoria-response';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'http://localhost:8000/api/nivelCategoria'; // Corregido el endpoint

  constructor(private http: HttpClient) { }

  /**
   * Crea un nuevo nivel de categoría
   * @param nivelCategoria Datos del nivel a crear
   * @returns Observable con la respuesta del servidor
   */
  crearNivelCategoria(nivelCategoria: Omit<NivelesCategoria, 'id' | 'created_at' | 'updated_at'>): Observable<any> {
    return this.http.post<NivelesCategoria>(this.apiUrl, nivelCategoria);
  }

  /**
   * Obtiene todos los niveles de categoría
   * @returns Observable con la lista paginada de niveles
   
  obtenerNivelesCategoria(): Observable<GetNivelesCategoriaResponse> {
    return this.http.get<GetNivelesCategoriaResponse>(this.apiUrl);
  }*/

  /**
   * Obtiene un nivel de categoría por ID
   * @param id ID del nivel
   * @returns Observable con los datos del nivel
   */
  obtenerNivelPorId(id: number): Observable<NivelesCategoria> {
    return this.http.get<NivelesCategoria>(`${this.apiUrl}/${id}`);
  }

  /**
   * Actualiza un nivel de categoría
   * @param id ID del nivel a actualizar
   * @param cambios Objeto con los cambios
   * @returns Observable con el nivel actualizado
   */
  actualizarNivel(
    id: number,
    cambios: { nombre_nivel: string; descripcion?: string | null; fecha_examen: Date | null; costo: number }
  ): Observable<any> {
    return this.http.put<NivelesCategoria>(`${this.apiUrl}/${id}`, cambios);
  }
  /**
   * Elimina un nivel de categoría
   * @param id ID del nivel a eliminar
   * @returns Observable vacío
   */
  eliminarNivel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /*getNivelesPorArea(areaId: number): Observable<GetNIvelesCategoriaResponse> {
    return this.http.get<GetNIvelesCategoriaResponse>(`${this.apiUrl}/por-area/${areaId}`);
  }*/

    getNivelesPorArea(areaId: number): Observable<NivelesCategoria[]> {
      return this.http.get<any>(`${this.apiUrl}/por-area/${areaId}`).pipe(
        map(response => {
          // Verifica diferentes estructuras de respuesta
          if (Array.isArray(response)) {
            return response as NivelesCategoria[];
          } else if (response.nivelesCategoria) {
            return response.nivelesCategoria as NivelesCategoria[];
          } else if (response.data) {
            return response.data as NivelesCategoria[];
          }
          throw new Error('Formato de respuesta no reconocido');
        }),
        catchError(error => {
          console.error('Error al obtener niveles por área:', error);
          throw error;
        })
      );
    }
    /**
   * Modifica la habilitacion de las categorias
   * @param id ID del nivel a eliminar
   * @returns observar si la categoria fue habilitada o no
   */

  habilitarCategoria(id: number, habilitacion: boolean | null): Observable<NivelesCategoria> {
    const body = { habilitacion };
    return this.http.patch<NivelesCategoria>(`${this.apiUrl}/${id}/habilitacion`, body);
  }

  getNivelesByArea(areaId: number): Observable<NivelesCategoria[]> {
    return this.http.get<any>(`${this.apiUrl}/por-area/${areaId}`).pipe(
      map(response => {
        // Maneja diferentes formatos de respuesta
        if (Array.isArray(response)) {
          return response;
        } else if (response.data) {
          return response.data;
        } else if (response.nivelesCategoria) {
          return response.nivelesCategoria;
        }
        throw new Error('Formato de respuesta no reconocido');
      }),
      catchError(error => {
        console.error('Error al obtener niveles por área:', error);
        return []; // Devuelve array vacío en caso de error
      })
    );
  }
}
