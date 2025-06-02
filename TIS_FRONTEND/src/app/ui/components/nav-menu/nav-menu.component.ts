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
export class NavMenuComponent implements OnChanges {
  @Input() olimpiadas: Olimpiada[] = []; // Cambiado a array vacío por defecto
  isOlympiadDropdownOpen = false;
  
  // Opciones base del menú (usamos getters para siempre obtener copias frescas)
  private get baseAuthMenuOptions(): MenuOption[] {
    return [
      { name: "REPORTES", path: "/admin/products" },
      { name: "REGISTRAR OLIMPIADA", path: "/admin/olimpiada" },
    ];
  }

  private get baseNoAuthMenuOptions(): MenuOption[] {
    const options = [
      { name: "Home", path: "/inicio/waba" },
      { 
        name: "Olimpiadas", 
        path: "/inicio/olimpiadas",
        children: this.buildOlympiadOptions() // Llamada directa al constructor
      },
      { name: "Inscribirse", path: "/inicio/inscripcion-todo" },
      { name: "login", path: "/inicio/dodog" },
      { name: "registro", path: "/inicio/mmmm" }
    ];
    console.log('Opciones NO auth construidas:', options);
    return options;
  }

  constructor(public authService: AuthService) {
    console.log('NavMenuComponent inicializado');
    console.log('Olimpiadas iniciales:', this.olimpiadas);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.group('ngOnChanges - Detección de cambios');
    console.log('Cambios recibidos:', changes);
    
    if (changes['olimpiadas']) {
      console.log('Cambios en olimpiadas detectados:');
      console.log('Valor anterior:', changes['olimpiadas'].previousValue);
      console.log('Valor actual:', changes['olimpiadas'].currentValue);
      console.log('Primer cambio:', changes['olimpiadas'].firstChange);
    }
    console.groupEnd();
  }

  private buildOlympiadOptions(): MenuOption[] {
    console.log('Construyendo opciones de olimpiadas con:', this.olimpiadas);
    
    if (!this.olimpiadas || this.olimpiadas.length === 0) {
      console.warn('No hay olimpiadas para mostrar');
      return [{ name: "No hay olimpiadas disponibles", path: "/inicio/olimpiadas" }];
    }

    const options = [
      { name: "Todas las Olimpiadas", path: "/inicio/olimpiadas" },
      ...this.olimpiadas.map(olimpiada => {
        console.log('Procesando olimpiada:', olimpiada);
        return {
          name: olimpiada.nombre_olimpiada || `Olimpiada ${olimpiada.id}`,
          path: `/inicio/olimpiada/${olimpiada.id}`
        };
      })
    ];
    
    console.log('Opciones de olimpiadas generadas:', options);
    return options;
  }

  get menuOptions(): MenuOption[] {
    const options = this.authService.isLoggedIn() 
      ? this.baseAuthMenuOptions 
      : this.baseNoAuthMenuOptions;
    
    console.log('Opciones del menú devueltas:', options);
    return options;
  }

  toggleOlympiadDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.isOlympiadDropdownOpen = !this.isOlympiadDropdownOpen;
    console.log('Estado del desplegable:', this.isOlympiadDropdownOpen);
    
    // Forzar verificación de opciones al abrir
    if (this.isOlympiadDropdownOpen) {
      console.log('Opciones actuales del menú:', this.menuOptions);
    }
  }

  closeDropdown(): void {
    this.isOlympiadDropdownOpen = false;
  }

  logout(): void {
    this.authService.logout();
  }
}