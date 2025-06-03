import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from '../interfaces/inscripcion.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class TutorService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  create(tutor: Partial<Tutor>): Observable<Tutor> {
    return this.http.post<Tutor>(`${this.apiUrl}/tutor`, tutor);
  }

  // Opcional: Buscar tutor por CI (útil para evitar duplicados)
  findByCi(ci: string): Observable<Tutor | null> {
    return this.http.get<Tutor | null>(`${this.apiUrl}/tutor?ci=${ci}`);
  }
}