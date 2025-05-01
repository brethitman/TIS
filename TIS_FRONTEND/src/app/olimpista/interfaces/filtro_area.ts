
export interface AreaElement {
  id:           number;
  id_olimpiada: number;
  nombre_area:  string;
  descripcion:  string;
  createdAt:    Date;
  updatedAt:    Date;
  olimpiada:    Olimpiada;
  niveles:      Nivele[];
}

export interface Nivele {
  id_nivel:     number;
  id_area:      number;
  nombre_nivel: string;
  descripcion:  string;
  fecha_examen: Date ;
  costo:        string;
  habilitacion: boolean;
  created_at:   Date;
  updated_at:   Date;
}

export interface Olimpiada {
  id_olimpiada:          number;
  nombre_olimpiada:      string;
  descripcion_olimpiada: string;
  fecha_inicio:          Date;
  fecha_final:           Date;
  created_at:            Date;
  updated_at:            Date;
}
