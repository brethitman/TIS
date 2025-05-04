export interface Area {
    id: number;
    id_olimpiada: number;
    nombre_area: string;
    descripcion: string;
    gradoIniAr: string;
    gradoFinAr: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface NivelCategoria {
    id: number;
    nombre_nivel: string;
    descripcion: string;
    fecha_examen: string;
    costo: number;
    habilitacion: number;
    gradoIniCat: string;
    gradoFinCat: string;
    area: Area;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface NivelCategoriaCreate {
    nombre_nivel: string;
    descripcion?: string;
    fecha_examen: string;
    costo: number;
    habilitacion: number;
    gradoIniCat: string;
    gradoFinCat: string;
  }
  
  export interface NivelCategoriaResponse {
    message: string;
    niveles: NivelCategoria[];
  }