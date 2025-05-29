import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDNivelCategoria } from "../interfaces/post_categoria.interface";
<<<<<<< HEAD
import { environment } from '../../../environments/environment.development';
=======
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12

@Injectable({
  providedIn: 'root'
})
export class CategoriaVisualizacionService {
<<<<<<< HEAD
  private readonly apiUrl = environment.apiUrl;
=======

  private apiUrl = 'http://localhost:8000/api/categorias'; 
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12

  constructor(private http: HttpClient) {}
  
  getCategoriasPorArea(idArea: number): Observable<IDNivelCategoria[]> {
<<<<<<< HEAD
    return this.http.get<IDNivelCategoria[]>(`${this.apiUrl}/categorias/${idArea}`);
=======
    return this.http.get<IDNivelCategoria[]>(`${this.apiUrl}/${idArea}`);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }
}