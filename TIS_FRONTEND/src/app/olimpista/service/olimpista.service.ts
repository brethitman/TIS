import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import {  Olimpista } from '../interfaces/olimpista-response';
import { GetOlimpistaResponse } from '../interfaces/get-olimpista-response';

@Injectable({
  providedIn: 'root'
})
export class OlimpistaService {

  private http = inject(HttpClient);

  public findAll(): Observable<Olimpista[]> {
    return this.http.get<GetOlimpistaResponse>(`${environment.apiUrl}/olimpista`)
      .pipe(
        map((resp) => resp.olimpistas)
      );
  }
}
