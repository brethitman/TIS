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

  enviarBoletaPorEmail(boletaData: BoletaPagoResponse, correo: string): Observable<any> {
    const payload = {
      destinatario: correo,
      asunto: 'Comprobante de Inscripción - Boleta de Pago',
      boleta: boletaData
    };

    return this.http.post(`${this.apiUrl}/enviar`, payload).pipe(
      tap(response => {
        console.log('Respuesta del servidor de correo:', response);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en el servicio de correo:', error);
        // Si el correo se envió pero hay un error en la respuesta, no lo tratamos como error
        if (error.status === 200) {
          return new Observable(subscriber => {
            subscriber.next({ success: true, message: 'Correo enviado exitosamente' });
            subscriber.complete();
          });
        }
        return throwError(() => error);
      })
    );
  }
}