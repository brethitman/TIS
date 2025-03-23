import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../interfaces/area.interface';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private apiUrl = 'http://localhost:8000/api/area'; // URL de tu API

  constructor(private http: HttpClient) {}

  // Método para enviar los datos del área
  createArea(area: Area): Observable<Area> {
    return this.http.post<Area>(this.apiUrl, area);
  }
}
