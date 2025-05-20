/*import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InscripcionPayload } from '../interfaces/inscripcion.types';

@Injectable({
  providedIn: 'root'
})
export class InscripcionServicee {
  private apiUrl = 'http://bluenebula.tis.cs.umss.edu.bo/api/inscripcion'; // Reemplaza con la URL real de tu API si es diferente

  constructor(private http: HttpClient) { }

  /**
   * Envía los datos de inscripción a la API del backend.
   * @param data El objeto de datos de inscripción.
   * @returns Un Observable con la respuesta de la API.
   */
  /*
  crearInscripcion(data: InscripcionPayload): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, data, { headers });
  }
}
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InscripcionPayload, InscripcionPostSuccessResponse } from '../interfaces/inscripcion.types';

@Injectable({
  providedIn: 'root'
})
export class InscripcionServicee {
  private apiUrl = 'http://bluenebula.tis.cs.umss.edu.bo/api/inscripcion';

  constructor(private http: HttpClient) { }

  crearInscripcion(data: InscripcionPayload): Observable<InscripcionPostSuccessResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<InscripcionPostSuccessResponse>(this.apiUrl, data, { headers });
  }
}
