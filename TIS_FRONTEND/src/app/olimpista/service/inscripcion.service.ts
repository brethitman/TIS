import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { Inscripcione } from '../interfaces/inscripcion.interface';
import { GetInscripcionResponse } from '../interfaces/get-inscripcion-response';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  private http = inject(HttpClient);

  // Método para obtener todas las inscripciones con paginación
  public findAll(): Observable<Inscripcione[]> {
    return this.http.get<GetInscripcionResponse>(`${environment.apiUrl}/inscripcion`)
      .pipe(
        map((resp) => resp.inscripciones) // Ahora accede correctamente a la lista de inscripciones
      );
  }
}
