export interface VisualizacionPageResponse {
    olimpiada: Olimpiada;
}

export interface Olimpiada {
    id: number;
    nombre_olimpiada: string;
    descripcion_olimpiada: string;
    presentacion?: string | null;
    requisitos?: string | null;
    fecha_inscripcion_inicio?: Date | string | null;
    fecha_inscripcion_final?: Date | string | null;
    premios?: string | null;
    informacion_adicional?: string | null;
    fecha_inicio: Date | string;
    fecha_final: Date | string;
    areas: Area[];
    createdAt: Date | string;
    updatedAt: Date | string;
    
    // Campos adicionales por si el backend devuelve nombres diferentes
    presentacion_olimpiada?: string | null;
    requisitos_olimpiada?: string | null;
    premios_olimpiada?: string | null;
    info_adicional?: string | null;
    
    // Para capturar cualquier campo adicional
    [key: string]: any;
}

export interface Area {
    id_area: number;
    id_olimpiada: number;
    nombre_area: string;
    descripcion: string;
    gradoIniAr: string;
    gradoFinAr: string;
    created_at: Date | string;
    updated_at: Date | string;
    nivel_categorias: NivelCategoria[];
}

export interface NivelCategoria {
    id_nivel: number;
    id_area: number;
    nombre_nivel: string;
    descripcion: null | string;
    fecha_examen: Date | string;
    costo: string;
    habilitacion: boolean;
    gradoIniCat: string;
    gradoFinCat: string;
    created_at: Date | string;
    updated_at: Date | string;
}