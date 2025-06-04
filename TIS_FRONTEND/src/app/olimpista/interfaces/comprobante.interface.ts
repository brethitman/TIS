export interface Datum {
  id:                 number;
  idBoleta:           number;
  archivoComprobante: string;
  numeroComprobante:  string;
  nombrePagador:      string;
  estadoVerificacion: string;
  fechaSubida:        Date;
  createdAt:          Date;
  updatedAt:          Date;
  boletaPago:         BoletaPago;
}

export interface BoletaPago {
  id:               number;
  numero_boleta:    string;
  monto:            string;
  fecha_generacion: Date;
  inscripcion:      Inscripcion;
  createdAt:        Date;
  updatedAt:        Date;
}

export interface Inscripcion {
  id:                number;
  fecha_inscripcion: Date;
  estado:            string;
  createdAt:         Date;
  updatedAt:         Date;
}



