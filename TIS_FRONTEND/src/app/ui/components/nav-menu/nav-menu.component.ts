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
    { name: "REGISTRAR OLIMPIADA", path: "/admin/olimpiada" },
    { name: "Registro", path: "/admin/sales" }
  ];

  // Opciones cuando no está autenticado
 // nav-menu.component.ts
private noAuthMenuOptions: MenuOption[] = [
  { name: "Home", path: "/inicio/waba" },
  { name: "olimpiadas", path: "/inicio/look" },
  { name: "Inscribirse", path: "/inicio/inscripcion-todo" }, // ✅ Nueva opción
  { name: "login", path: "/inicio/dodog" },
  { name: "registro", path: "/inicio/mmmm" }
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
