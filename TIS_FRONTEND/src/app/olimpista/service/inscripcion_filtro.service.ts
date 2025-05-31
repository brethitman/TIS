// inscripcion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Inscripcione } from '../interfaces/inscripcion.interface';

export interface GETParaInscripcionResponse {
  id_area: number;
  id_olimpiada: number;
  nombre_area: string;
  descripcion: string;
  gradoIniAr: string;
  gradoFinAr: string;
  created_at: Date;
  updated_at: Date;
  nivel_categorias: NivelCategoria[];
}

export interface NivelCategoria {
  id_nivel: number;
  id_area: number;
  nombre_nivel: string;
  descripcion: null | string;
  fecha_examen: Date;
  costo: string;
  habilitacion: boolean;
  gradoIniCat: string;
  gradoFinCat: string;
  created_at: Date;
  updated_at: Date;
}

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene las áreas y niveles disponibles para una olimpiada específica
   * @param olimpiadaId ID de la olimpiada
   * @returns Observable con la lista de áreas y sus niveles
   */
  getAreasParaInscripcion(olimpiadaId: number): Observable<GETParaInscripcionResponse[]> {
    if (!olimpiadaId || isNaN(olimpiadaId)) {
      return throwError(() => new Error('ID de olimpiada inválido'));
    }

    return this.http.get<GETParaInscripcionResponse[]>(
      `${this.apiUrl}/olimpiadasInscripcion/${olimpiadaId}/areas`
    ).pipe(
      retry(3),
      catchError((error) => {
        console.error('Error al obtener áreas para inscripción:', error);
        return throwError(() => new Error('Error al cargar datos de inscripción'));
      })
    );
  }

  /**
   * Obtiene todas las inscripciones
   * @returns Observable con la lista de inscripciones
   */
  getInscripciones(): Observable<Inscripcione[]> {
    return this.http.get<Inscripcione[]>(`${this.apiUrl}/inscripciones`).pipe(
      retry(2),
      catchError((error) => {
        console.error('Error al obtener inscripciones:', error);
        return throwError(() => new Error('Error al cargar inscripciones'));
      })
    );
  }

  /**
   * Obtiene inscripciones filtradas por olimpiada, área y nivel
   * @param olimpiadaId ID de la olimpiada
   * @param areaId ID del área
   * @param nivelId ID del nivel
   * @returns Observable con las inscripciones filtradas
   */
  getInscripcionesFiltradas(olimpiadaId: number, areaId: number, nivelId: number): Observable<Inscripcione[]> {
    const params = new URLSearchParams({
      olimpiada: olimpiadaId.toString(),
      area: areaId.toString(),
      nivel: nivelId.toString()
    });

    return this.http.get<Inscripcione[]>(`${this.apiUrl}/inscripciones/filtradas?${params}`).pipe(
      retry(2),
      catchError((error) => {
        console.error('Error al obtener inscripciones filtradas:', error);
        return throwError(() => new Error('Error al cargar inscripciones filtradas'));
      })
    );
  }
  

  /**
   * Obtiene inscripciones por área y nivel específicos
   * @param areaId ID del área
   * @param nivelId ID del nivel
   * @returns Observable con las inscripciones del área y nivel
   */
  getInscripcionesByAreaYNivel(areaId: number, nivelId: number): Observable<Inscripcione[]> {
    return this.http.get<Inscripcione[]>(`${this.apiUrl}/inscripciones/area/${areaId}/nivel/${nivelId}`).pipe(
      retry(2),
      catchError((error) => {
        console.error('Error al obtener inscripciones por área y nivel:', error);
        return throwError(() => new Error('Error al cargar inscripciones por área y nivel'));
      })
    );
  }
  
}