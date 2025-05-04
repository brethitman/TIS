export interface GETParaInscripcionResponse {
  id_area:          number;
  id_olimpiada:     number;
  nombre_area:      string;
  descripcion:      string;
  gradoIniAr:       string;
  gradoFinAr:       string;
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
  gradoIniCat:  string;
  gradoFinCat:  string;
  created_at:   Date;
  updated_at:   Date;
}
