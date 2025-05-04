

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InscripcionPayload, InscripcionPostSuccessResponse } from '../interfaces/inscripcion.types';

@Injectable({
  providedIn: 'root'
})
export class InscripcionServicee {
  private apiUrl = 'http://localhost:8000/api/inscripcion';

  constructor(private http: HttpClient) { }

  crearInscripcion(data: InscripcionPayload): Observable<InscripcionPostSuccessResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<InscripcionPostSuccessResponse>(this.apiUrl, data, { headers });
  }
}
