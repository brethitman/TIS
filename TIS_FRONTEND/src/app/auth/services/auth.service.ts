import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Usuarios mock para prueba
  private mockUsers = [
    { email: 'admin@example.com', password: 'admin123' },
    { email: 'user@example.com', password: 'user123' }
  ];

  login(email: string, password: string): Observable<boolean> {
    const isValidUser = this.mockUsers.some(
      user => user.email === email && user.password === password
    );

    return of(isValidUser).pipe(
      delay(1000), // Simula tiempo de respuesta
      tap(result => {
        if (result) {
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
