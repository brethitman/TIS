
export interface NivelesCategoria {
  id:           number;
  nombre:       string;
  fecha_examen: Date | null;
  costo:        string;
  habilitacion: boolean | null;
  createdAt:    Date;
  updatedAt:    Date;
}
