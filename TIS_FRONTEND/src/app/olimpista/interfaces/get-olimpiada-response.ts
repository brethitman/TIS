import { Olimpiada } from "./area.interface";
export interface GetOlimpiadaResponse {
  olimpiadas: Olimpiada[];
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
