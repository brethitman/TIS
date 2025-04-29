import { Datum } from "./comprobante.interface";

export interface GetComprobanteResponse {
  data:  Datum[];
  links: Links;
  meta:  Meta;
}

export interface Meta {
  current_page: number;
  from:         number;
  last_page:    number;
  links:        Link[];
  path:         string;
  per_page:     number;
  to:           number;
  total:        number;
}

export interface Link {
  url:    null | string;
  label:  string;
  active: boolean;
}

export interface Links {
  first: string;
  last:  string;
  prev:  null;
  next:  null;
}
