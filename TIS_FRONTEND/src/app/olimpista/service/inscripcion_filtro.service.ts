// inscripcion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, throwError, map } from 'rxjs';
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
export class InscripcionFiltroService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene las áreas y niveles disponibles para una olimpiada específica
   * @param olimpiadaId ID de la olimpiada
   * @returns Observable con la lista de áreas y sus niveles
   */
  getAreasParaInscripcion(idOlimpiada: number): Observable<GETParaInscripcionResponse[]> {
    return this.http.get<GETParaInscripcionResponse[]>(`${this.apiUrl}/areas/olimpiada/${idOlimpiada}`).pipe(
      map(areas => {
        // Filtrar los niveles deshabilitados de cada área
        return areas.map(area => ({
          ...area,
          nivel_categorias: area.nivel_categorias.filter(nivel => 
            nivel.habilitacion === true || nivel.habilitacion === 1
          )
        }));
      }),
      retry(1),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Error en el servicio de inscripción:', error);
    return throwError(() => error);
  }
}
