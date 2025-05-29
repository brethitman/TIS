import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http:HttpClient ) {}

  enviarArchivo(archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    return this.http.post(`${this.apiUrl}/lee-excel`, formData);
  }
}
