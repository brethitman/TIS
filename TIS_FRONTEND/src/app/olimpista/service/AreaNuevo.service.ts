import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  crearAreaBasica(data: AreaBasicRequest): Observable<any> {
    // Revisamos la URL correcta basada en tu controlador PHP
    // Añadimos encabezados para debug
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    // Antes de enviar, mostramos en consola para depuración
    console.log('Enviando datos al servidor:', data);
    
    // La URL debe coincidir con la definida en tus rutas de Laravel
    return this.http.post<any>(
      `${this.apiUrl}/areas/basic`, 
      data,
      { headers }
    );
  }
}