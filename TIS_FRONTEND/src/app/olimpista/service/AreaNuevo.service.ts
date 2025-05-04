import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AreaBasicRequest } from '../interfaces/AreaNuevo.interface';
import { AreaBasicResponse } from '../interfaces/AreaNuevo.interface';

@Injectable({
  providedIn: 'root'
})
export class AreaNuevoService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  crearAreaBasica(data: AreaBasicRequest): Observable<AreaBasicResponse> {
    return this.http.post<AreaBasicResponse>(`${this.apiUrl}/areas/basic`, data);
  }
}