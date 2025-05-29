import { VisualizacionPageResponse } from "../interfaces/olimpiadaVisualizacion.interface";
import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class VisualizacionService {
    private readonly apiUrl = environment.apiUrl;
=======

@Injectable({ providedIn: 'root' })
export class VisualizacionService {
    private apiUrl = 'http://localhost:8000/api/olimpiada';
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12

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
<<<<<<< HEAD
        return this.http.get<any[]>(`${this.apiUrl}/olimpiadas/${olimpiadaId}/areas`);
=======
        return this.http.get<any[]>(`${this.apiUrl}/${olimpiadaId}/areas`);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
    }
}