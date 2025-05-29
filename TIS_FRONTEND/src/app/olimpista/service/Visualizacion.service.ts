import { VisualizacionPageResponse } from "../interfaces/olimpiadaVisualizacion.interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })

export class VisualizacionService {
    private apiUrl = 'http://localhost:8000/api';

    constructor(private http: HttpClient) { }

    getOlimpiadaById(id: number): Observable<VisualizacionPageResponse> {
        return this.http.get<VisualizacionPageResponse>(`${this.apiUrl}/olimpiada/${id}`);
    }

    getAreasXOlimpiada(olimpiadaId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${olimpiadaId}/olimpiada/areas`);
    }

     storeInscripcion(inscripcionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/inscripcionList`, inscripcionData);
  }
}