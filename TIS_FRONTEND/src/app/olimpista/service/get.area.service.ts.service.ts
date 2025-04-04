import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { AreaService } from './area.service';
import { GetAreaResponse } from '../interfaces/get-area-response';
import { Area } from '../interfaces/area.interface';

@Injectable({
  providedIn: 'root'
})
export class GetAreaService {

  private http = inject(HttpClient);

  public findAll(): Observable<Area[]> {
    return this.http.get<GetAreaResponse>(`${environment.apiUrl}/area`)
      .pipe(
        map((resp) => resp.areas)
      );
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> ojopiojo
