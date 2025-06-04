import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {
  fullName = '';
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Simulamos registro exitoso después de 1 segundo
    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = 'Registro exitoso! Redirigiendo...';

      // Simulamos login automático después de registro
      this.authService.login(this.email, 'user123').subscribe(success => {
        if (success) {
          setTimeout(() => this.router.navigate(['/admin/products']), 1500);
        }
      });
    }, 1000);
  }
}
