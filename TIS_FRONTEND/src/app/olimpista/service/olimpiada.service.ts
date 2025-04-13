import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OlimpiadaService {
  private apiUrl = 'http://localhost:8000/api/olimpiada';

  constructor(private http: HttpClient) { }

  getOlimpiadas(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getOlimpiadaWithAreas(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/con-areas`);
  }

  createOlimpiada(olimpiada: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, olimpiada);
  }

  updateOlimpiada(id: number, olimpiada: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, olimpiada);
  }

  deleteOlimpiada(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}