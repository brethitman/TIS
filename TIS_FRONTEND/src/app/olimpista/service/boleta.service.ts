// src/app/services/boleta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BoletaService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  enviarBoletaPorEmail(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/email`, datos);
  }
}