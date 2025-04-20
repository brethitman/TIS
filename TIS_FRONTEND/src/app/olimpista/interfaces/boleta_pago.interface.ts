
export interface BoletasPago {
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
