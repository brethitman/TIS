import { Inscripcione } from "./inscripcion.interface";
export interface GetInscripcionResponse {
  inscripciones: Inscripcione[];
  links:         Links;
  meta:          Meta;
}

 interface Links {
  first: string;
  last:  null;
  prev:  null;
  next:  null;
}

 interface Meta {
  current_page: number;
  from:         number;
  path:         string;
  per_page:     number;
  to:           number;
}
