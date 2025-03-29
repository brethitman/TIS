
export interface Inscripcione {
  id:                number;
  fecha_inscripcion: Date;
  estado:            string;
  olimpista:         Olimpista;
  olimpistaId: number;
  area:              Area;
  areaId: number;
  tutor:             Tutor;
  tutorId: number;
  nivel:             NivelesCategoria;
  nivelId: number;
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
  tutorId: number;
  tutor?: Tutor;
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

export interface NivelesCategoria {
  id:           number;
  id_area:      number;
  nombre_nivel: string;
  descripcion:  null | string;
  fecha_examen: Date | null;
  costo:        number;
  habilitacion: boolean | null;
  created_at:   Date;
  updated_at:   Date;
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
