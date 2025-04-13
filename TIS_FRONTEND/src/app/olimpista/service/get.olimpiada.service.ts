import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { Olimpiada } from '../interfaces/olimpiada.interfacel';

@Injectable({
  providedIn: 'root'
})
export class GetOlimpiadaService {

  private http = inject(HttpClient);

  public findAll(): Observable<Olimpiada[]> {
    return this.http.get<{ olimpiadas: Olimpiada[] }>(`${environment.apiUrl}/olimpiada`)
      .pipe(
        map((resp) => resp.olimpiadas)
      );
  }
}
