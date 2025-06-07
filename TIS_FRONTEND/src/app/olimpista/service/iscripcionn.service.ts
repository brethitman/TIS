import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InscripcionPayload, InscripcionPostSuccessResponse } from '../interfaces/inscripcion.types';

@Injectable({
  providedIn: 'root'
})
export class InscripcionServicee {
  private apiUrl = 'http://localhost:8000/api/inscripcion';

  constructor(private http: HttpClient) { }

  crearInscripcion(data: InscripcionPayload): Observable<InscripcionPostSuccessResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('Enviando datos al servidor:', data);
    
    return this.http.post<InscripcionPostSuccessResponse>(this.apiUrl, data, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la petición:', error);
    
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      if (error.status === 422) {
        // Error de validación
        const validationErrors = error.error?.errors || error.error;
        if (validationErrors) {
          errorMessage = JSON.stringify(validationErrors);
        } else {
          errorMessage = 'Error de validación en los datos enviados';
        }
      } else {
        errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
