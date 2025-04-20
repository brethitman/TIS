import { Tutore } from "./tutor.interface";
export interface GetTutoresResponse {
  tutores: Tutore[];
  links:   Links;
  meta:    Meta;
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

