import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; 
import { NivelCategoria } from '../interfaces/categoria.interface'; 

@Injectable({
  providedIn: 'root'
})
export class NivelCategoriaService {
  private apiUrl = 'http://localhost:8000/api/nivelCategoria';

  constructor(private http: HttpClient) {}

  // Método para enviar los datos de la categoría al backend
  createCategoria(nivelesCategoria: NivelesCategoria): Observable<NivelesCategoria> {
    return this.http.post<NivelesCategoria>(this.apiUrl, nivelesCategoria);
  }

  // Método opcional para obtener todas las categorías
  getCategorias(): Observable<GetCategoriaResponse> {
    return this.http.get<GetCategoriaResponse>(this.apiUrl);
  }
}