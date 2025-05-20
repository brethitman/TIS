// src/app/services/boleta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoletaService {
  // Si usaste la Opción A (cambiaste a /email en Laravel)
  private apiUrl = 'http://bluenebula.tis.cs.umss.edu.bo/api/email';
  
  // O si usaste la Opción B (mantuviste /enviar-boleta en Laravel)
  // private apiUrl = 'http://bluenebula.tis.cs.umss.edu.bo/api/enviar-boleta';

  constructor(private http: HttpClient) { }

  enviarBoletaPorEmail(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }
}