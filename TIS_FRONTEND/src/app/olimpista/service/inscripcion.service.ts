import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { Inscripcion, Area, NivelesCategoria } from '../interfaces/inscripcion.interface';
import { GetInscripcionResponse } from '../interfaces/get-inscripcion-response';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private apiUrl = 'http://localhost:8000/api/inscripcion';

  private http = inject(HttpClient);

  // Método para obtener todas las inscripciones con paginación
  public findAll(): Observable<Inscripcion[]> {
    return this.http.get<GetInscripcionResponse>(`${environment.apiUrl}/inscripcion`)
      .pipe(
        map((resp) => resp.inscripciones) // Ahora accede correctamente a la lista de inscripciones
      );
  }
  createInscripcion(inscripcion: Partial<Inscripcion>): Observable<Inscripcion> {
    return this.http.post<Inscripcion>('/api//inscripcion', inscripcion);
  }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.apiUrl}/areas`);
  }

  getNiveles(): Observable<NivelesCategoria[]> {
    return this.http.get<NivelesCategoria[]>(`${this.apiUrl}/niveles`);
  }
}

/*public findAll(): Observable<Inscrito[]> {
  return this.http.get<GetInscritos>(`${environment.apiUrl}/inscripcion`)
    .pipe(
      map((resp) => resp.inscrito) // Ahora accede correctamente a la lista de inscripciones
    );
}*/
