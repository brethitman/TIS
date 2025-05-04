export interface PostInscripcionResponse {
  message:     string;
  inscripcion: Inscripcion;
}

export interface Inscripcion {
  id:                    number;
  fecha_inscripcion:     Date;
  estado:                string;
  olimpistas:            Olimpista[];
  tutors:                Tutor[];
  boleta_pago:           BoletaPago;
  niveles_seleccionados: NivelesSeleccionado[];
  createdAt:             Date;
  updatedAt:             Date;
}

export interface BoletaPago {
  id:               number;
  numero_boleta:    string;
  monto:            string;
  fecha_generacion: Date;
  createdAt:        Date;
  updatedAt:        Date;
}

export interface NivelesSeleccionado {
  id:           number;
  nombre_nivel: string;
  descripcion:  string;
  fecha_examen: Date;
  costo:        string;
  habilitacion: number;
  createdAt:    Date;
  updatedAt:    Date;
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
