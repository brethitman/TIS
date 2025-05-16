import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Inscripcion,VerificarPagoPayload } from '../interfaces/postVerificarBoleta.interface';



@Injectable({
  providedIn: 'root'
})
export class VerificarBoletaService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  verificarPago(payload: VerificarPagoPayload): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(
      `${this.apiUrl}/inscripciones/verificar-pago`,
      payload
    ).pipe(
      catchError(error => {
        console.error('Error en verificación de pago:', error.error);
        return throwError(() => error);
      })
    );
  }

  // (Opcional) Método para obtener datos de una inscripción
  getInscripcion(id: number): Observable<Inscripcion> {
    return this.http.get<Inscripcion>(`${this.apiUrl}/inscripciones/${id}`);
  }
}
