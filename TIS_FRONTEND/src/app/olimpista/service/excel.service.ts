import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
<<<<<<< HEAD
import { environment } from '../../../environments/environment.development';
=======
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
<<<<<<< HEAD
  private readonly apiUrl = environment.apiUrl;

=======

  private apiUrl= 'http://localhost:8000/api/lee-excel'
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  constructor(private http:HttpClient ) {}

  enviarArchivo(archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);
<<<<<<< HEAD
    return this.http.post(`${this.apiUrl}/lee-excel`, formData);
=======
    return this.http.post(this.apiUrl, formData);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }
}
