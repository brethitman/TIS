// olimpiadaAreaCategoria.interface.ts

export interface IDOlimpiadabyArea {
  id_area: number;
  id_olimpiada:     number;
  id_inscripcion:   number | null;
  nombre_area: string;
  descripcion: string | null; 
  nivel_categorias: NivelCategoria[] | null;
  // Añadimos los campos de grados de área
  gradoIniAr: string;
  gradoFinAr: string;
  created_at:       Date;
  updated_at:       Date;
}

export interface NivelCategoria {
  id_nivel?: number;
  id_area?: number;
  nombre_nivel: string;
  descripcion: string | null;
  gradoIniCat: string;
  gradoFinCat: string;
  fecha_examen: Date;
  costo: number;
  habilitacion: boolean; // Esto debe ser un número (0 o 1), no un booleano
  created_at:   Date;
  updated_at:   Date;
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
