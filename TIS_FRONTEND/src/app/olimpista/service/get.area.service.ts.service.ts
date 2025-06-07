import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { Area } from '../interfaces/area.interface';
import { NivelesCategoria } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class GetAreaService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  // Método existente - mantener sin cambios
  findAll(): Observable<Area[]> {
    return this.http.get<{ areas: Area[] }>(`${this.apiUrl}/area`)
      .pipe(
        map(response => response.areas)
      );
  }

  // Método existente - mantener sin cambios
  updateArea(area: Area): Observable<Area> {
    const requestBody = {
      id_olimpiada: area.id_olimpiada,
      nombre_area: area.nombre_area,
      descripcion: area.descripcion,
      niveles: area.niveles.map(nivel => ({
        nombre_nivel: nivel.nombre_nivel,
        descripcion: nivel.descripcion,
        fecha_examen: this.formatDate(nivel.fecha_examen),
        costo: parseFloat(nivel.costo),
        habilitacion: nivel.habilitacion
      }))
    };

    return this.http.put<Area>(`${this.apiUrl}/area/${area.id}`, requestBody);
  }

  // Nuevo método agregado
  createNivel(nivelData: {
    nombre_nivel: string;
    descripcion: string;
    fecha_examen: Date;
    costo: string;
    habilitacion: boolean;
    id_area: number;
  }): Observable<NivelesCategoria> {
    const requestBody = {
      nombre_nivel: nivelData.nombre_nivel,
      descripcion: nivelData.descripcion,
      fecha_examen: this.formatDate(nivelData.fecha_examen), // Usar el formateador existente
      costo: nivelData.costo,
      habilitacion: nivelData.habilitacion,
      id_area: nivelData.id_area
    };

    return this.http.post<{ message: string; nivel: NivelesCategoria }>(
      `${this.apiUrl}/nivelCategoria`,
      requestBody
    ).pipe(
      map(response => ({
        ...response.nivel,
        fecha_examen: new Date(response.nivel.fecha_examen),
        createdAt: new Date(response.nivel.createdAt),
        updatedAt: new Date(response.nivel.updatedAt),
        area: {
          ...response.nivel.area,
          createdAt: new Date(response.nivel.area.createdAt),
          updatedAt: new Date(response.nivel.area.updatedAt)
        }
      }))
    );
  }

  // Método existente - mantener sin cambios
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

}
