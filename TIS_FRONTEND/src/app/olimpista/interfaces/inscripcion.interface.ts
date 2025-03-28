
export interface Inscripcione {
  id:                number;
  fecha_inscripcion: Date;
  estado:            string;
  olimpista:         Olimpista | null;
  area:              Area;
  tutor:             Tutor;
  createdAt:         null;
  updatedAt:         null;
}

export interface Area {
  id:          number;
  nombre_area: string;
  descripcion: null | string;
  createdAt:   Date;
  updatedAt:   Date;
}

export interface Olimpista {
  id:               number;
  nombres:          string;
  apellidos:        string;
  ci:               string;
  fecha_nacimiento: Date;
  correo:           string;
  telefono:         string;
  colegio:          string;
  curso:            string;
  departamento:     string;
  provincia:        string;
  createdAt:        Date;
  updatedAt:        Date;
}

export interface Tutor {
  id:        number;
  nombres:   string;
  apellidos: string;
  ci:        string;
  correo:    string;
  telefono:  string;
  createdAt: Date;
  updatedAt: Date;
}



/////////////////////////////

export interface GetInscripcionResponse {
  inscripciones: Inscripcione[];
  links:         Links;
  meta:          Meta;
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
