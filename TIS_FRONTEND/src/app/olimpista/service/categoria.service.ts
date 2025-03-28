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

  getByAreaId(areaId: number): Observable<NivelCategoria[]> {
    return this.http.get<NivelCategoria[]>(`${this.apiUrl}/area/${areaId}`);
  }

  create(categoria: Omit<NivelCategoria, 'id' | 'created_at' | 'updated_at'>): Observable<NivelCategoria> {
    return this.http.post<NivelCategoria>(this.apiUrl, categoria);
  }

  update(id: number, categoria: Partial<NivelCategoria>): Observable<NivelCategoria> {
    return this.http.put<NivelCategoria>(`${this.apiUrl}/${id}`, categoria);
  }
}