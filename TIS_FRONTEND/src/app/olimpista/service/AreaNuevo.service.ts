import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AreaBasicRequest } from '../interfaces/AreaNuevo.interface';
import { AreaBasicResponse } from '../interfaces/AreaNuevo.interface';
<<<<<<< HEAD
import { environment } from '../../../environments/environment.development';
=======
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12

@Injectable({
  providedIn: 'root'
})
export class AreaNuevoService {
<<<<<<< HEAD
  private readonly apiUrl = environment.apiUrl;
=======
  private apiUrl = 'http://127.0.0.1:8000/api';
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12

  constructor(private http: HttpClient) { }

  crearAreaBasica(data: AreaBasicRequest): Observable<AreaBasicResponse> {
    return this.http.post<AreaBasicResponse>(`${this.apiUrl}/areas/basic`, data);
  }
}