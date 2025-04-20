import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Inscripcione, Area, Olimpista, Tutor } from '../interfaces/inscripcion.interface';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  crearInscripcionCompleta(datos: {
    olimpistas: Olimpista[];
    tutors: Tutor[];
    areas: number[]; // Cambiamos el tipo de areas a number[]
  }): Observable<Inscripcione> {
    if (!datos.olimpistas || !datos.tutors || !datos.areas) {
      return throwError(() => new Error('Datos incompletos para la inscripción'));
    }

    const payload = {
      fecha_inscripcion: new Date().toISOString().split('T')[0],
      estado: 'Pendiente', // Puedes hacerlo dinámico si lo necesitas
      olimpistas: datos.olimpistas.map(olimp => ({
        nombres: olimp.nombres,
        apellidos: olimp.apellidos,
        ci: olimp.ci,
        fecha_nacimiento: olimp.fecha_nacimiento,
        correo: olimp.correo,
        telefono: olimp.telefono,
        colegio: olimp.colegio,
        curso: olimp.curso,
        departamento: olimp.departamento,
        provincia: olimp.provincia
      })),
      tutors: datos.tutors.map(tutor => ({
        nombres: tutor.nombres,
        apellidos: tutor.apellidos,
        ci: tutor.ci,
        correo: tutor.correo,
        telefono: tutor.telefono
      })),
      areas: datos.areas // Enviamos directamente el array de IDs
    };

    return this.http.post<{ inscripcion: Inscripcione }>(`${this.apiUrl}/inscripcion`, payload) // Ajustamos la clave de la respuesta a 'inscripcion'
      .pipe(
        map(response => response.inscripcion), // Mapeamos directamente a response.inscripcion
        catchError(this.handleError)
      );
  }

  getAreas(): Observable<Area[]> {
    return this.http.get<{ areas: Area[] }>(`${this.apiUrl}/area`)
      .pipe(
        map(response => response.areas),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la petición:', error);

    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || error.message;

      if (error.status === 422) {
        const errors = error.error?.errors;
        errorMessage += ': ' + Object.values(errors).flat().join(', ');
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
