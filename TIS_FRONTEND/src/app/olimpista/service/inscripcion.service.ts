import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { GetAreaResponse } from '../interfaces/get-area-response';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private apiUrl = 'http://localhost:8000/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  crearInscripcionCompleta(datos: any): Observable<any> {
    // Validación básica de datos antes de enviar
    if (!datos.olimpista || !datos.tutor || !datos.areaId) {
      return throwError(() => new Error('Datos incompletos para la inscripción'));
    }

    const payload = {
      fecha_inscripcion: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
      estado: 'Pendiente',
      olimpista: {
        nombres: datos.olimpista.nombres || '',
        apellidos: datos.olimpista.apellidos || '',
        ci: datos.olimpista.ci || '',
        fecha_nacimiento: datos.olimpista.fecha_nacimiento || '',
        correo: datos.olimpista.correo || '',
        telefono: datos.olimpista.telefono || '',
        colegio: datos.olimpista.colegio || '',
        curso: datos.olimpista.curso || '',
        departamento: datos.olimpista.departamento || '',
        provincia: datos.olimpista.provincia || ''
      },
      tutor: {
        nombres: datos.tutor.nombres || '',
        apellidos: datos.tutor.apellidos || '',
        ci: datos.tutor.ci || '',
        correo: datos.tutor.correo || '',
        telefono: datos.tutor.telefono || ''
      },
      id_area: Number(datos.areaId) // Asegura que sea un número
    };

    console.log('Enviando payload:', payload); // Para depuración

    return this.http.post(`${this.apiUrl}/inscripcion`, payload, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getAreas(): Observable<GetAreaResponse> {
    return this.http.get<GetAreaResponse>(`${this.apiUrl}/area`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la petición:', error);

    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.status === 422) {
        // Manejo especial para errores de validación
        const validationErrors = error.error.errors || {};
        errorMessage = 'Errores de validación:\n';
        for (const key in validationErrors) {
          errorMessage += `${key}: ${validationErrors[key].join(', ')}\n`;
        }
      } else {
        errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
