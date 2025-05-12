import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BoletaPagoResponse } from '../interfaces/inscripcion.types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = `${environment.apiUrl}/email`; 

  constructor(private http: HttpClient) {
    console.log('URL del API de correo:', this.apiUrl);
  }

  enviarBoletaPorEmail(boleta: BoletaPagoResponse, destinatario: string): Observable<any> {
    // Crear un objeto limpio para evitar problemas de serialización
    const boletaData = {
      numero_boleta: boleta.numero_boleta || 'Sin número',
      monto: typeof boleta.monto === 'number' ? String(boleta.monto) : boleta.monto || '0',
      fecha_generacion: boleta.fecha_generacion || new Date().toISOString()
    };

    const payload = {
      destinatario: destinatario,
      asunto: `Boleta de Pago #${boletaData.numero_boleta}`,
      boleta: boletaData
    };
    
    console.log('Enviando solicitud a:', this.apiUrl);
    console.log('Payload:', JSON.stringify(payload, null, 2));
    
    return this.http.post<{success: boolean, message: string}>(this.apiUrl, payload)
      .pipe(
        tap(response => console.log('Respuesta del servidor:', response)),
        catchError(this.handleError)
      );
  }
  
  private handleError(error: HttpErrorResponse) {
    console.error('Error completo:', error);
    
    let errorMessage = 'Ha ocurrido un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código: ${error.status}, ` + 
                     `Mensaje: ${error.error?.message || error.statusText}`;
                     
      // Si hay un mensaje detallado en la respuesta
      if (error.error && typeof error.error === 'object') {
        console.log('Detalles del error del servidor:', error.error);
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}