import { Area } from "./area.interface";
export interface GetAreaRespose {
  areas: Area[];
  links: Links;
  meta:  Meta;
}

export interface Links {
  first: string;
  last:  string;
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
