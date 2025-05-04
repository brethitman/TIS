/*

export interface Inscripcione {
  id:                number;
  fecha_inscripcion: Date;
  estado:            string;
  olimpistas:        Olimpista[];
  tutors:            Tutor[];
  areas:             Area[];
  createdAt:         Date;
  updatedAt:         Date;
}

export interface Area {
  id:             number;
  id_olimpiada:   number;
  id_inscripcion: number;
  nombre_area:    string;
  descripcion:    string;
  createdAt:      Date;
  updatedAt:      Date;
}

export interface Olimpista {
  id:               number;
  id_inscripcion:   number;
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
  id:             number;
  id_inscripcion: number;
  nombres:        string;
  apellidos:      string;
  ci:             string;
  correo:         string;
  telefono:       string;
  createdAt:      Date;
  updatedAt:      Date;
}


*/

////////////////////////////////


export interface Inscripcione {
  id:                number;
  fecha_inscripcion: Date;
  estado:            Estado;
  olimpistas:        Olimpista[];
  tutors:            Tutor[];
  areas:             Area[];
  createdAt:         Date;
  updatedAt:         Date;
}

export interface Area {
  id:             number;
  id_olimpiada:   number;
  id_inscripcion: number;
  nombre_area:    string;
  descripcion:    string;
  createdAt:      Date;
  updatedAt:      Date;
}

export enum Estado {
  Pagado = "Pagado",
  Pendiente = "Pendiente",
  Verificado = "Verificado",
}

export interface Olimpista {
  id:               number;
  id_inscripcion:   number;
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
  id:             number;
  id_inscripcion: number;
  nombres:        string;
  apellidos:      string;
  ci:             string;
  correo:         string;
  telefono:       string;
  createdAt:      Date;
  updatedAt:      Date;

}
