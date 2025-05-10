// src/app/services/email.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoletaPagoResponse } from '../interfaces/inscripcion.types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = `${environment.apiUrl}/email`;

  constructor(private http: HttpClient) {}

  enviarBoletaPorEmail(boleta: BoletaPagoResponse, destinatario: string): Observable<any> {
    return this.http.post<{success: boolean, message: string}>(this.apiUrl, {
      boleta,
      destinatario
    });
  }
}