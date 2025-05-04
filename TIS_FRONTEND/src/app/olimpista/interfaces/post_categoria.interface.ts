// src/app/interfaces/nivel.interface.ts

/*********************** REQUEST INTERFACES ***********************/
export interface CreateNivelRequest {
  nombre_nivel: string;
  gradoIniCat: string;
  gradoFinCat: string;
  descripcion: string;
  fecha_examen: string;
  costo: number;
  habilitacion: boolean;
}

export interface CreateNivelesBulkRequest {
  niveles: CreateNivelRequest[];
}

/*********************** RESPONSE INTERFACES ***********************/
export interface AreaResponse {
  id: number;
  id_olimpiada: number;
  nombre_area: string;
  gradoIniAr: string;
  gradoFinAr: string;
  createdAt: string;
  updatedAt: string;
}

export interface NivelResponse {
  id: number;
  nombre_nivel: string;
  descripcion: string | null;
  fecha_examen: string;
  costo: number;
  habilitacion: boolean;
  area: AreaResponse;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNivelesBulkResponse {
  message: string;
  niveles: NivelResponse[];
}
