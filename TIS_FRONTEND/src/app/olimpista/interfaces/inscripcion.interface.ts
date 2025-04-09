

export interface Inscripcione {
  id:                number;
  fecha_inscripcion: Date;
  estado:            string;
  olimpista:         Olimpista;
  area:              Area;
  tutor:             Tutor;
  nivel:             Nivel;
  createdAt:         Date | null;
  updatedAt:         Date | null;
}

export interface Area {
  id:          number;
  nombre_area: string;
  descripcion: null;
  createdAt:   Date;
  updatedAt:   Date;
}

export interface Nivel {
  id:           number;
  id_area:      number;
  nombre_nivel: string;
  descripcion:  string;
  fecha_examen: null;
  costo:        number;
  habilitacion: null;
  created_at:   Date;
  updated_at:   Date;
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

