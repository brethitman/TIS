import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development'; // Asegúrate de que la URL de tu API esté configurada correctamente
import { map, Observable } from 'rxjs';
import { Olimpiada } from '../interfaces/olimpiada.interfacel';  // Asegúrate de tener la interfaz Olimpiada definida

@Injectable({
  providedIn: 'root'
})
export class GetOlimpiadaService {

  private http = inject(HttpClient);

  // Método para obtener todas las olimpiadas
  public findAll(): Observable<Olimpiada[]> {
    return this.http.get<{ olimpiadas: Olimpiada[] }>(`${environment.apiUrl}/olimpiadas`)  // Reemplaza la URL según corresponda
      .pipe(
        map((resp) => resp.olimpiadas)  // Asegúrate de que el backend te devuelva las olimpiadas bajo la propiedad "olimpiadas"
      );
  }
}
