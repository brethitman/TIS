// src/app/services/boleta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
<<<<<<< HEAD
import { environment } from '../../../environments/environment.development';
=======
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12

@Injectable({
  providedIn: 'root'
})
export class BoletaService {
<<<<<<< HEAD
  private readonly apiUrl = environment.apiUrl;
=======
  // Si usaste la Opción A (cambiaste a /email en Laravel)
  private apiUrl = 'http://localhost:8000/api/email';
  
  // O si usaste la Opción B (mantuviste /enviar-boleta en Laravel)
  // private apiUrl = 'http://localhost:8000/api/enviar-boleta';
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12

  constructor(private http: HttpClient) { }

  enviarBoletaPorEmail(datos: any): Observable<any> {
<<<<<<< HEAD
    return this.http.post(`${this.apiUrl}/email`, datos);
=======
    return this.http.post(this.apiUrl, datos);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }
}