import { VisualizacionPageResponse } from "../interfaces/olimpiadaVisualizacion.interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })

export class VisualizacionService {
    private apiUrl = 'http://bluenebula.tis.cs.umss.edu.bo/api/olimpiada';

    constructor(private http: HttpClient) { }

    getOlimpiadaById(id: number): Observable<VisualizacionPageResponse> {
        return this.http.get<VisualizacionPageResponse>(`${this.apiUrl}/${id}`);
    }

    getAreasXOlimpiada(olimpiadaId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${olimpiadaId}/areas`);
    }

}