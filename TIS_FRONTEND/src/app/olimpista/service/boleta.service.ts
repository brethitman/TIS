// src/app/services/boleta.service.ts
import { Injectable } from '@angular/core';
import { BoletaPagoResponse, NivelSeleccionadoResponse } from '../interfaces/inscripcion.types';

@Injectable({
  providedIn: 'root'
})
export class BoletaService {
  private boletaData: {
    boleta: BoletaPagoResponse | null,
    niveles: NivelSeleccionadoResponse[]
  } = { boleta: null, niveles: [] };

  setBoletaData(boleta: BoletaPagoResponse, niveles: NivelSeleccionadoResponse[]) {
    this.boletaData = { boleta, niveles };
  }

  getBoletaData() {
    return this.boletaData;
  }
}
