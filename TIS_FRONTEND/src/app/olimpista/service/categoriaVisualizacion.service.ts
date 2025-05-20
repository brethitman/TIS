import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NivelCategoria } from "../interfaces/areavisualizacion.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoriaVisualizacionService {

  private apiUrl = 'http://bluenebula.tis.cs.umss.edu.bo/api/categorias'; 

  constructor(private http: HttpClient) {}
  getCategoriasPorArea(idArea: number): Observable<NivelCategoria[]> {
    return this.http.get<NivelCategoria[]>(`${this.apiUrl}/${idArea}`);
  }
}