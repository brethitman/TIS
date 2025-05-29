<<<<<<< HEAD
=======
// nav-menu.component.ts
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
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
<<<<<<< HEAD
=======
  showMobileMenu = false;

>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  constructor(public authService: AuthService) {}

  // Opciones cuando está autenticado
  private authMenuOptions: MenuOption[] = [
    { name: "REPORTES", path: "/admin/products" },
    { name: "REGISTRAR OLIMPIADA", path: "/admin/olimpiada" },
<<<<<<< HEAD
    //{ name: "Registro", path: "/admin/sales" }
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
=======
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
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
  }

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout();
<<<<<<< HEAD
    // Aquí podrías redirigir a login si lo deseas
  }
}
=======
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
>>>>>>> cbf6d1198050c038220ef21197136757105a2f12
