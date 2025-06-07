// inscripcion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

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
    // Validación básica del ID
    if (!olimpiadaId || isNaN(olimpiadaId)) {
      return throwError(() => new Error('ID de olimpiada inválido'));
    }

    return this.http.get<GETParaInscripcionResponse[]>(
      `${this.apiUrl}/olimpiadasInscripcion/${olimpiadaId}/areas`
    ).pipe(
      retry(3), // Reintentar hasta 3 veces en caso de error
      catchError((error) => {
        console.error('Error al obtener áreas para inscripción:', error);
        return throwError(() => new Error('Error al cargar datos de inscripción'));
      })
    );
  }
}
