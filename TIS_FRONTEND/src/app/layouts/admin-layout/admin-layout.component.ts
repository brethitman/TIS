import { Component } from '@angular/core';
import { NavMenuComponent } from '../../ui/components/nav-menu/nav-menu.component';
import { RouterOutlet } from '@angular/router';
import { SearchEstudianteInputComponent } from "../../olimpista/components/search-estudiante-input/search-estudiante-input.component";


@Component({
  selector: 'app-admin-layout',
  //standalone:true,
  imports: [NavMenuComponent, RouterOutlet,/* SearchEstudianteInputComponent*/],
  templateUrl: './admin-layout.component.html',

})
export class AdminLayoutComponent {

}
