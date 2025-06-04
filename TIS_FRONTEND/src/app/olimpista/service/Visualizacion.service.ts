import { VisualizacionPageResponse } from "../interfaces/olimpiadaVisualizacion.interface";
import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class VisualizacionService {
    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getOlimpiadaById(id: number): Observable<VisualizacionPageResponse> {
        console.log(`🔍 Solicitando olimpiada con ID: ${id}`);
        console.log(`📡 URL completa: ${this.apiUrl}/olimpiadas/${id}`);
        return this.http.get<VisualizacionPageResponse>(`${this.apiUrl}/olimpiadas/${id}`)
            .pipe(
                tap(response => {
                    console.log('📥 Respuesta completa del servidor:', response);
                    console.log('🏆 Datos de olimpiada:', response.olimpiada);
                    if (response.olimpiada) {
                        console.log('📋 Campos específicos:');
                        console.log('  - presentacion:', response.olimpiada.presentacion);
                        console.log('  - requisitos:', response.olimpiada.requisitos);
                        console.log('  - premios:', response.olimpiada.premios);
                        console.log('  - informacion_adicional:', response.olimpiada.informacion_adicional);
                        console.log('  - fecha_inscripcion_inicio:', response.olimpiada.fecha_inscripcion_inicio);
                        console.log('  - fecha_inscripcion_final:', response.olimpiada.fecha_inscripcion_final);
                    }
                })
            );
    }

    getAreasXOlimpiada(olimpiadaId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/olimpiadas/${olimpiadaId}/areas`);
    }

    storeInscripcion(inscripcionData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/inscripcionList`, inscripcionData);
    }
}