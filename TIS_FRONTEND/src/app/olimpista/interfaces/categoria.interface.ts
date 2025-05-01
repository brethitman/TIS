
//////////////////


export interface NivelesCategoria {
  id:           number;
  nombre_nivel: string;
  descripcion:  string;
  fecha_examen: Date;
  costo:        string;
  habilitacion: number;  ///cambiar a futuro a boolean
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

export interface BackendResponse {
  message: string;
  nivelCategoria: NivelesCategoria;
}
