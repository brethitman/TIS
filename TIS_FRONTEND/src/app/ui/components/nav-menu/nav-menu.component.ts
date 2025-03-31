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
  constructor(public authService: AuthService) {}

  // Opciones cuando está autenticado
  private authMenuOptions: MenuOption[] = [
    { name: "REPORTES", path: "/admin/products" },
    { name: "Areas", path: "/admin/areas" },
    { name: "Registro", path: "/admin/sales" }
  ];

  // Opciones cuando no está autenticado
  private noAuthMenuOptions: MenuOption[] = [
    { name: "Home", path: "/inicio/waba" },
    { name: "pagina2", path: "/inicio/look" },
    { name: "login", path: "/inicio/dodog" }
  ];

  // Propiedad que devuelve las opciones según autenticación
  get menuOptions(): MenuOption[] {
    return this.authService.isLoggedIn() ? this.authMenuOptions : this.noAuthMenuOptions;
  }

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout();
    // Aquí podrías redirigir a login si lo deseas
  }
}
