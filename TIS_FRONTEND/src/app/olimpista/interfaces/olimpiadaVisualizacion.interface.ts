export interface VisualizacionPageResponse {
    olimpiada: Olimpiada;
}

export interface Olimpiada {
    id:                    number;
    nombre_olimpiada:      string;
    descripcion_olimpiada: string;
    fecha_inicio:          Date;
    fecha_final:           Date;
    areas:                 Area[];
    createdAt:             Date;
    updatedAt:             Date;
}

export interface Area {
    id_area:          number;
    id_olimpiada:     number;
    nombre_area:      string;
    descripcion:      string;
    gradoIniAr:       string;
    gradoFinAr:       string;
    created_at:       Date;
    updated_at:       Date;
    nivel_categorias: NivelCategoria[];
}

export interface NivelCategoria {
    id_nivel:     number;
    id_area:      number;
    nombre_nivel: string;
    descripcion:  null | string;
    fecha_examen: Date;
    costo:        string;
    habilitacion: boolean;
    gradoIniCat:  string;
    gradoFinCat:  string;
    created_at:   Date;
    updated_at:   Date;
}
