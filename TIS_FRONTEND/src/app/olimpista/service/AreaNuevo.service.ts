import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AreaBasicRequest, AreaBasicResponse } from '../interfaces/AreaNuevo.interface';

@Injectable({
  providedIn: 'root'
})
export class AreaNuevoService {
  // URL base de tu API
  private apiUrl = 'http://127.0.0.1:8000/api';
  
  constructor(private http: HttpClient) { }
  
  /**
   * Crea un área básica con los cursos asociados
   * @param data Datos del área a crear
   * @returns Observable con la respuesta del servidor
   */
  crearAreaBasica(data: AreaBasicRequest): Observable<AreaBasicResponse> {
    return this.http.post<AreaBasicResponse>(`${this.apiUrl}/areas`, data);
  }
}