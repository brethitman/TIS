import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from '../interfaces/inscripcion.interface';
<<<<<<< HEAD
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class TutorService {
  private readonly apiUrl = environment.apiUrl;
=======

@Injectable({ providedIn: 'root' })
export class TutorService {
  private apiUrl = 'http://localhost:8000/api/tutor';
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12

  constructor(private http: HttpClient) {}

  create(tutor: Partial<Tutor>): Observable<Tutor> {
<<<<<<< HEAD
    return this.http.post<Tutor>(`${this.apiUrl}/tutor`, tutor);
=======
    return this.http.post<Tutor>(this.apiUrl, tutor);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }

  // Opcional: Buscar tutor por CI (útil para evitar duplicados)
  findByCi(ci: string): Observable<Tutor | null> {
<<<<<<< HEAD
    return this.http.get<Tutor | null>(`${this.apiUrl}/tutor?ci=${ci}`);
=======
    return this.http.get<Tutor | null>(`${this.apiUrl}?ci=${ci}`);
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }
}