import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDNivelCategoria } from "../interfaces/post_categoria.interface";
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriaVisualizacionService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  
  getCategoriasPorArea(idArea: number): Observable<IDNivelCategoria[]> {
    return this.http.get<IDNivelCategoria[]>(`${this.apiUrl}/categorias/${idArea}`);
  }
}