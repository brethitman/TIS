import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NivelesCategoria } from '../interfaces/categoria.interface';
import { GetNIvelesCategoriaResponse } from '../interfaces/get-categoria-response';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'http://localhost:8000/api/nivelCategoria'; // Corregido el endpoint

  constructor(private http: HttpClient) {}

  /**
   * Crea un nuevo nivel de categoría
   * @param nivelCategoria Datos del nivel a crear
   * @returns Observable con la respuesta del servidor
   */
  crearNivelCategoria(nivelCategoria: Omit<NivelesCategoria, 'id' | 'created_at' | 'updated_at'>): Observable<NivelesCategoria> {
    return this.http.post<NivelesCategoria>(this.apiUrl, nivelCategoria);
  }

  /**
   * Obtiene todos los niveles de categoría
   * @returns Observable con la lista paginada de niveles
   */
  obtenerNivelesCategoria(): Observable<GetNIvelesCategoriaResponse> {
    return this.http.get<GetNIvelesCategoriaResponse>(this.apiUrl);
  }

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
  actualizarNivel(id: number, cambios: Partial<NivelesCategoria>): Observable<NivelesCategoria> {
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
}
