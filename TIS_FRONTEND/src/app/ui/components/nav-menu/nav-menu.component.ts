// nav-menu.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';

interface MenuOption {
  path: string;
  name: string;
}

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav-menu.component.html',
})
export class NavMenuComponent {
  showMobileMenu = false;

  constructor(public authService: AuthService) {}

  // Opciones cuando está autenticado
  private authMenuOptions: MenuOption[] = [
    { name: "REPORTES", path: "/admin/products" },
    { name: "REGISTRAR OLIMPIADA", path: "/admin/olimpiada" },
  ];

  // Opciones Home (siempre visibles en el centro)
  private homeOptions: MenuOption[] = [
    { name: "Home", path: "/inicio/waba" },
  ];

  // Opciones de Login (solo cuando no está autenticado)
  private loginOptions: MenuOption[] = [
    { name: "Iniciar Sesión", path: "/inicio/dodog" },
  ];

  // Getter para opciones de Home
  getHomeOptions(): MenuOption[] {
    return this.homeOptions;
  }

  // Getter para opciones de Login
  getLoginOptions(): MenuOption[] {
    return this.loginOptions;
  }

  // Getter para opciones de usuario autenticado
  getAuthOptions(): MenuOption[] {
    return this.authMenuOptions;
  }

  // Propiedad que devuelve todas las opciones para menú móvil
  get menuOptions(): MenuOption[] {
    const options = [...this.homeOptions];
    
    if (this.authService.isLoggedIn()) {
      options.push(...this.authMenuOptions);
    } else {
      options.push(...this.loginOptions);
    }
    
    return options;
  }

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout();
    this.closeMobileMenu();
    // Aquí podrías redirigir a login si lo deseas
  }

  // Métodos para manejar menú móvil
  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  closeMobileMenu(): void {
    this.showMobileMenu = false;
  }
}