import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//import { NavMenuComponent } from '../../ui/components/nav-menu/nav-menu.component';
//import { SearchProductsInputComponent } from "../../products/components/search-products-input/search-products-input.component";

@Component({
  /*  selector: 'app-admin-layout',
    imports: [NavMenuComponent, RouterOutlet, SearchProductsInputComponent],
    templateUrl: './admin-layout.component.html'
    */

    selector: 'app-auth-layout',
    standalone:true,
    imports:[RouterOutlet],
   // templateUrl: './auth-layout.component.html'
     template: `
      <main class="auth__layout">
          <router-outlet></router-outlet>
      </main>
      `
})
export class AuthLayoutComponent {

}
