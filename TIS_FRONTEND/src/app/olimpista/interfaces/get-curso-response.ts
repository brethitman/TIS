import { Curso } from "./curso.interface";
export interface GetCursoResponse {
  cursos: Curso[];
  links:  Links;
  meta:   Meta;
}


export interface Links {
  first: string;
  last:  null;
  prev:  null;
  next:  string;
}

export interface Meta {
  current_page: number;
  from:         number;
  path:         string;
  per_page:     number;
  to:           number;
}
