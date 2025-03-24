import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NivelesCategoria } from '../interfaces/categoria.interface';
import { GetCategoriaResponse } from '../interfaces/get-categoria-response'; 

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:8000/api/categoria'; // Ajusta la URL según tu API

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
