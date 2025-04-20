import { Component ,Input} from '@angular/core';
import { Olimpiada } from '../../interfaces/area.interface';
import { OlimpiadaCardComponent } from '../olimpiada-card/olimpiada-card.component';
import { Area } from '../../interfaces/area.interface';
@Component({
  selector: 'app-olimpiada-list',
  imports: [OlimpiadaCardComponent],
  templateUrl: './olimpiada-list.component.html',

})
export class OlimpiadaListComponent {

  @Input({required:true})
  Olimpiada!: any[];


  @Input() Areas: Area[] = [];

}
