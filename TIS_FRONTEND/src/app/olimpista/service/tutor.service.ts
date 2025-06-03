import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from '../interfaces/inscripcion.interface';

// src/app/services/tutor.service.ts
//import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  // Fuente de datos observable
  private tutorPrincipalSource = new BehaviorSubject<any[]>([]);
  
  // Observable que los componentes pueden observar
  tutorPrincipal$ = this.tutorPrincipalSource.asObservable();
  
  // Método para actualizar el valor
  actualizarTutorPrincipal(tutor: any[]) {
    this.tutorPrincipalSource.next(tutor);
  }
}