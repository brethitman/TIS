import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
togglePasswordVisibility() {
throw new Error('Method not implemented.');
}
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';
passwordVisible: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          this.router.navigate(['/admin/products']); // Redirige al dashboard después de login
        } else {
          this.errorMessage = 'Credenciales incorrectas';
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Error en el servidor';
      }
    });
  }
  onCancel() {
    this.router.navigate(['/inicio/waba']); // Cambia a ruta de Home
  }
}
