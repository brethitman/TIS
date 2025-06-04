import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AreaBasicRequest } from '../interfaces/AreaNuevo.interface';
import { AreaBasicResponse } from '../interfaces/AreaNuevo.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AreaNuevoService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  crearAreaBasica(data: AreaBasicRequest): Observable<AreaBasicResponse> {
    return this.http.post<AreaBasicResponse>(`${this.apiUrl}/areas/basic`, data);
  }
}