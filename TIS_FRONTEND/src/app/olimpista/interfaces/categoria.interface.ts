
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

export interface BackendResponse {
  message: string;
  nivelCategoria: NivelesCategoria;
}