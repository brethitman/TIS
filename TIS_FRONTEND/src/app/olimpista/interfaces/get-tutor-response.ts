import { Tutore } from "./tutor.interface";

export interface GetTutorResponse {
  tutores: Tutore[];
  links:   Links;
  meta:    Meta;
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
