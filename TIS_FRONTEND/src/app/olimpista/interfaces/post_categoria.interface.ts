// post_categoria.interface.ts

export interface CreateNivelRequest {
  nombre_nivel: string;
  gradoIniCat: string;
  gradoFinCat: string;
  descripcion: string;
  fecha_examen: string;
  costo: number;
  habilitacion: boolean | number; // Acepta tanto boolean como number
}

export interface CreateNivelesBulkRequest {
  niveles: CreateNivelRequest[];
}

export interface CreateNivelesBulkResponse {
  message?: string;
  niveles?: NivelResponse[];
  status?: string;
  success?: boolean;
}

export interface NivelResponse {
  id_nivel?: number;
  nombre_nivel: string;
  gradoIniCat: string;
  gradoFinCat: string;
  descripcion: string | null;
  fecha_examen: string;
  costo: number;
  habilitacion: boolean | number;
  id_area?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AreaResponse {
  id_area: number;
  nombre_area: string;
  descripcion: string | null;
  gradoIniAr: string;
  gradoFinAr: string;
  id_olimpiada: number;
  createdAt?: string;
  updatedAt?: string;
  niveles?: NivelResponse[];
}

export interface OlimpiadaResponse {
  id_olimpiada: number;
  nombre: string;
  descripcion: string | null;
  anio: number;
  fecha_inicio: string;
  fecha_fin: string;
  createdAt?: string;
  updatedAt?: string;
  areas?: AreaResponse[];
}

// olimpiadaAreaCategoria.interface.ts (update or extend if needed)
export interface IDNivelCategoria {
  id_nivel: number;
  nombre_nivel: string;
  gradoIniCat: string;
  gradoFinCat: string;
  descripcion: string | null;
  fecha_examen: string;
  costo: number;
  habilitacion: boolean | number;
  id_area?: number;
}

export interface IDOlimpiadabyArea {
  id_area: number;
  nombre_area: string;
  descripcion: string | null;
  gradoIniAr: string;
  gradoFinAr: string;
  id_olimpiada: number;
  nivel_categorias?: IDNivelCategoria[];
}
