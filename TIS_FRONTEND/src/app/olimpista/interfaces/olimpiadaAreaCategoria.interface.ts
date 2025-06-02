import { IDNivelCategoria } from './post_categoria.interface';

export interface IDOlimpiadabyArea {
  id_area: number;
  nombre_area: string;
  descripcion: string | null;
  gradoIniAr: string;
  gradoFinAr: string;
  id_olimpiada: number;
  permite_multiples_areas: boolean;
  nivel_categorias?: IDNivelCategoria[];
}

// Re-export IDNivelCategoria as NivelCategoria
export type NivelCategoria = IDNivelCategoria;

// post_categoria.interface.ts

export interface NivelCategoriaCreate {
  nombre_nivel: string;
  gradoIniCat: string;
  gradoFinCat: string;
  descripcion: string | null;
  fecha_examen: string;
  costo: number;
  habilitacion: number; // Debe ser un número (0 o 1)
}

export interface NivelCategoriaResponse {
  message: string;
  niveles: NivelCategoria[];
}