export interface IDOlimpiadabyArea {
  id_area:          number;
  id_olimpiada:     number;
  id_inscripcion:   number | null;
  nombre_area:      string;
  descripcion:      string;
  created_at:       Date;
  updated_at:       Date;
  nivel_categorias: NivelCategoria[];
}

export interface NivelCategoria {
  id_nivel:     number;
  id_area:      number;
  nombre_nivel: string;
  descripcion:  null | string;
  fecha_examen: Date;
  costo:        string;
  habilitacion: boolean;
  created_at:   Date;
  updated_at:   Date;
}
