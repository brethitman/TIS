
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
  createdAt:         null;
  updatedAt:         null;
}///////////////////////
export interface GetBoletaResponse {
  boletasPago: BoletasPago[];
  links:       Links;
  meta:        Meta;
}


export interface Links {
  first: string;
  last:  null;
  prev:  null;
  next:  null;
}

export interface Meta {
  current_page: number;
  from:         number;
  path:         string;
  per_page:     number;
  to:           number;
}
