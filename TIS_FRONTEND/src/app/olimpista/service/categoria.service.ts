import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NivelesCategoria } from '../interfaces/categoria.interface';
import { GetNivelesCategoria } from '../interfaces/get-categoria-response';
import { NivelCategoria } from "../interfaces/areavisualizacion.interface";
<<<<<<< HEAD
import { environment } from '../../../environments/environment.development';
=======
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
<<<<<<< HEAD
  private readonly apiUrl = environment.apiUrl;
=======

  private apiUrl = 'http://localhost:8000/api/nivelCategoria'; // Corregido el endpoint
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12

  constructor(private http: HttpClient) {}

  /**
   * Crea un nuevo nivel de categoría
   * @param nivelCategoria Datos del nivel a crear
   * @returns Observable con la respuesta del servidor
   */
  crearNivelCategoria(nivelCategoria: Omit<NivelesCategoria, 'id' | 'created_at' | 'updated_at'>): Observable<NivelesCategoria> {
<<<<<<< HEAD
    return this.http.post<NivelesCategoria>(`${this.apiUrl}/nivelCategoria`, nivelCategoria);
=======
    return this.http.post<NivelesCategoria>(this.apiUrl, nivelCategoria);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }

  /**
   * Obtiene todos los niveles de categoría
   * @returns Observable con la lista paginada de niveles
   */
  obtenerNivelesCategoria(): Observable<GetNivelesCategoria> {
<<<<<<< HEAD
    return this.http.get<GetNivelesCategoria>(`${this.apiUrl}/nivelCategoria`);
=======
    return this.http.get<GetNivelesCategoria>(this.apiUrl);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }

  /**
   * Obtiene un nivel de categoría por ID
   * @param id ID del nivel
   * @returns Observable con los datos del nivel
   */
  obtenerNivelPorId(id: number): Observable<NivelesCategoria> {
<<<<<<< HEAD
    return this.http.get<NivelesCategoria>(`${this.apiUrl}/nivelCategoria/${id}`);
=======
    return this.http.get<NivelesCategoria>(`${this.apiUrl}/${id}`);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }

  /**
   * Actualiza un nivel de categoría
   * @param id ID del nivel a actualizar
   * @param cambios Objeto con los cambios
   * @returns Observable con el nivel actualizado
   */
  actualizarNivel(id: number, cambios: Partial<NivelesCategoria>): Observable<NivelesCategoria> {
<<<<<<< HEAD
    return this.http.put<NivelesCategoria>(`${this.apiUrl}/nivelCategoria/${id}`, cambios);
=======
    return this.http.put<NivelesCategoria>(`${this.apiUrl}/${id}`, cambios);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }

  /**
   * Elimina un nivel de categoría
   * @param id ID del nivel a eliminar
   * @returns Observable vacío
   */
  eliminarNivel(id: number): Observable<void> {
<<<<<<< HEAD
    return this.http.delete<void>(`${this.apiUrl}/nivelCategoria/${id}`);
=======
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }

  /*getNivelesPorArea(areaId: number): Observable<GetNIvelesCategoriaResponse> {
    return this.http.get<GetNIvelesCategoriaResponse>(`${this.apiUrl}/por-area/${areaId}`);
  }*/

    getNivelesPorArea(areaId: number): Observable<NivelesCategoria[]> {
<<<<<<< HEAD
      return this.http.get<any>(`${this.apiUrl}/nivelCategoria/por-area/${areaId}`).pipe(
=======
      return this.http.get<any>(`${this.apiUrl}/por-area/${areaId}`).pipe(
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
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
<<<<<<< HEAD
    return this.http.patch<NivelesCategoria>(`${this.apiUrl}/nivelCategoria/${id}/habilitacion`, body);
  }

  getNivelesByArea(areaId: number): Observable<NivelesCategoria[]> {
    return this.http.get<any>(`${this.apiUrl}/nivelCategoria/por-area/${areaId}`).pipe(
=======
    return this.http.patch<NivelesCategoria>(`${this.apiUrl}/${id}/habilitacion`, body);
  }

  getNivelesByArea(areaId: number): Observable<NivelesCategoria[]> {
    return this.http.get<any>(`${this.apiUrl}/por-area/${areaId}`).pipe(
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
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
