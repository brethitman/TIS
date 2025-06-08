import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Usuarios mock para prueba
  private mockUsers = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { email: 'user@example.com', password: 'user123', role: 'user' }
  ];

  constructor(private router: Router) {
    // Verificar si hay un estado de autenticación guardado
    const savedAuth = localStorage.getItem('isAuthenticated');
    if (savedAuth === 'true') {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    const isValidUser = this.mockUsers.some(
      user => user.email === email && user.password === password
    );

    return of(isValidUser).pipe(
      delay(1000), // Simula tiempo de respuesta
      tap(result => {
        if (result) {
          this.isAuthenticatedSubject.next(true);
          // Guardar estado de autenticación
          localStorage.setItem('isAuthenticated', 'true');
          // Guardar información del usuario
          const user = this.mockUsers.find(u => u.email === email);
          if (user) {
            localStorage.setItem('userRole', user.role);
          }
        }
      })
    );
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    // Limpiar datos de autenticación
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    // Redirigir a la página de inicio
    this.router.navigate(['/inicio/waba']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Método para verificar si el usuario es administrador
  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'admin';
  }
}
