import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { Olimpiada } from '../../../olimpista/interfaces/olimpiada-interfase';

interface MenuOption {
  name: string;
  path: string;
  children?: MenuOption[];
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

  private homeOptions: MenuOption[] = [
    { name: "Home", path: "/inicio/waba" },
  ];

  // Opciones de Login (solo cuando no está autenticado)
  private loginOptions: MenuOption[] = [
    { name: "Iniciar Sesión", path: "/inicio/dodog" },
  ];

  // Getter para opciones de Home
  getHomeOptions(): MenuOption[] {
    return this.authService.isLoggedIn() ? [] : this.homeOptions;
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
    if (this.authService.isLoggedIn()) {
      return [...this.authMenuOptions];
    } else {
      return [...this.homeOptions, ...this.loginOptions];
    }
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
