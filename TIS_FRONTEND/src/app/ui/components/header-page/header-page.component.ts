import { Component , Input} from '@angular/core';

@Component({
  selector: 'app-header-page',
  standalone:true,
  imports: [],
  templateUrl: './header-page.component.html',

})
export class HeaderPageComponent {

  @Input( {required :true} )
  public title: string = "Sin tutulo";



  @Input({required :true} )
  public description: string = "Sin descripcion";
}
