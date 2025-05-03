import { CursoNivel } from "./cursoNivel.interface";
export interface GetCursoNivelResponse {
  curso_nivel: CursoNivel[];
  links:       Links;
  meta:        Meta;
}


export interface Links {
  first: string;
  last:  null;
  prev:  null;
  next:  null;
}

export interface Meta {
  current_page: number;
  from:         number;
  path:         string;
  per_page:     number;
  to:           number;
}
