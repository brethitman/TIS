import { Olimpista } from "./olimpista-response";
export interface GetOlimpistaResponse {
  olimpistas: Olimpista[];
  links:      Links;
  meta:       Meta;
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
