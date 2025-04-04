import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderPageComponent } from './ui/components/header-page/header-page.component';
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { NavMenuComponent } from "./ui/components/nav-menu/nav-menu.component";

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, NavMenuComponent],
  templateUrl: './app.component.html',

})
export class AppComponent {
  title = 'Tis_Frontend';
}
