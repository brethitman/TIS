// verificar-boleta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import {  VerificarPagoPayload,
  VerificarPagoResponse,InscripcionDetallada } from '../interfaces/postVerificarBoleta.interface';



@Injectable({
  providedIn: 'root'
})
export class VerificarBoletaService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  verificarPago(payload: VerificarPagoPayload): Observable<VerificarPagoResponse> {
    return this.http.post<VerificarPagoResponse>(
      `${this.apiUrl}/inscripciones/verificar-pago`,
      payload
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.handleError(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private handleError(error: HttpErrorResponse): string {
    let errorMessage = 'Error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      switch (error.status) {
        case 404:
          errorMessage = 'Boleta no encontrada';
          break;
        case 409:
          errorMessage = 'La boleta ya fue pagada anteriormente';
          break;
        case 422:
          errorMessage = 'Estado incompatible para pago';
          break;
        default:
          errorMessage = `Error del servidor (${error.status}): ${error.message}`;
      }

      if (error.error?.message) {
        errorMessage += ` - Detalles: ${error.error.message}`;
      }
    }

    console.error('Error en verificación de pago:', errorMessage);
    return errorMessage;
  }

  getInscripcion(id: number): Observable<InscripcionDetallada> {
    return this.http.get<InscripcionDetallada>(
      `${this.apiUrl}/inscripciones/${id}`
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.handleError(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
