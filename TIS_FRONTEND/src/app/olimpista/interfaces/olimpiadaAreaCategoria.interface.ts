// olimpiadaAreaCategoria.interface.ts

export interface IDOlimpiadabyArea {
  id_area: number;
  nombre_area: string;
  descripcion: string | null; 
  nivel_categorias: NivelCategoria[] | null;
}

export interface NivelCategoria {
  id_nivel?: number;
  id_area?: number;
  nombre_nivel: string;
  descripcion: string | null;
  gradoIniCat: string;
  gradoFinCat: string;
  fecha_examen: string;
  costo: number;
  habilitacion: number; // Esto debe ser un número (0 o 1), no un booleano
  created_at?: string;
  updated_at?: string;
}

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
