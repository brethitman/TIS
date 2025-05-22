// get-olimpiada.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { Olimpiada } from '../interfaces/olimpiada-interfase';

@Injectable({
  providedIn: 'root',
})
export class GetOlimpiadaService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  findAll(): Observable<Olimpiada[]> {
    return this.http.get<{ olimpiadas: Olimpiada[] }>(`${this.apiUrl}/olimpiada`)
      .pipe(
        map(response => response.olimpiadas)
      );
  }

  // Método adicional para crear olimpiadas
  crearOlimpiada(olimpiadaData: {
    nombre_olimpiada: string;
    descripcion_olimpiada: string;
    presentacion?: string;
    requisitos?: string;
    fecha_inscripcion_inicio?: string;
    fecha_inscripcion_final?: string;
    premios?: string;
    informacion_adicional?: string;
    fecha_inicio: string;
    fecha_final: string;
    areas: {
      nombre_area: string;
      descripcion: string;
    }[];
  }): Observable<{ message: string, data: Olimpiada }> {
    return this.http.post<{ message: string, data: Olimpiada }>(
      `${this.apiUrl}/olimpiada`,
      olimpiadaData
    );
  }

}
