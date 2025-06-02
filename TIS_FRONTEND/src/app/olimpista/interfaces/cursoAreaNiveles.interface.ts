// curso-area.interface.ts
export interface CursoWithAreas {
  id_curso: number;
  nameCurso: string;
  areas: AreaWithNiveles[];
}

export interface AreaWithNiveles {
  id_area: number;
  id_olimpiada: number;
  nombre_area: string;
  descripcion: string;
  created_at: string;
  updated_at: string;
  permite_multiples_areas: number;
  nivel_categorias: NivelCategoria[];
}

export interface NivelCategoria {
  id_nivel: number;
  id_area: number;
  nombre_nivel: string;
  descripcion: string;
  fecha_examen: string;
  costo: string;  // Mantenemos como string por el formato "00.00"
  habilitacion: number;
  gradoIniCat: string;
  gradoFinCat: string;
  created_at: string;
  updated_at: string;
}

// Si necesitas crear niveles (para formularios)
export interface NivelCategoriaCreate {
  nombre_nivel: string;
  gradoIniCat: string;
  gradoFinCat: string;
  descripcion: string | null;
  fecha_examen: string;
  costo: number;  // Number para formularios
  habilitacion: number;
}
