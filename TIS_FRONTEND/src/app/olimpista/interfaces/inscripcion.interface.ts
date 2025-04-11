
export interface Inscripcione {
  id:                number;
  fecha_inscripcion: Date;
  estado:            string;
  olimpista:         Olimpista;
  tutor:             Tutor;
  nivel:             Nivel;
  createdAt:         Date;
  updatedAt:         Date;
}

export interface Nivel {
  id:           number;
  nombre_nivel: string;
  descripcion:  string;
  fecha_examen: Date;
  costo:        string;
  habilitacion: boolean;
  area:         Area;
  createdAt:    Date;
  updatedAt:    Date;
}

export interface Area {
  id:           number;
  id_olimpiada: number;
  nombre_area:  string;
  descripcion:  string;
  createdAt:    Date;
  updatedAt:    Date;
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
