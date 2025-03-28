import { NivelesCategoria } from "./categoria.interface";


export interface GetCategoriaResponse {
  nivelesCategorias: NivelesCategoria[];
  links:             Links;
  meta:              Meta;
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