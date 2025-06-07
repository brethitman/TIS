export interface BoletaPago {
    id_boleta: number;
    id_inscripcion: number;
    numero_boleta: string;
    monto: string;
    fecha_generacion: string;
    created_at: string;
    updated_at: string;
    id_olimpista: number | null;
    id_tutor: number | null;
    areas_niveles: any | null;
    nombre_olimpiada: string | null;
}

export interface Tutor {
    id_tutor: number;
    id_inscripcion: number;
    nombres: string;
    apellidos: string;
    ci: string;
    correo: string;
    telefono: string;
    created_at: string;
    updated_at: string;
    contacto: string | null;
}

export interface Olimpista {
    id_olimpista: number;
    id_inscripcion: number;
    nombres: string;
    apellidos: string;
    ci: string;
    fecha_nacimiento: string;
    correo: string;
    telefono: string;
    colegio: string;
    departamento: string;
    provincia: string;
    created_at: string;
    updated_at: string;
}

export interface Olimpiada {
    id_olimpiada: number;
    nombre_olimpiada: string;
    descripcion_olimpiada: string;
    presentacion: string;
    fecha_inscripcion_inicio: string;
    fecha_inscripcion_final: string;
    premios: string;
    requisitos: string;
    informacion_adicional: string;
    fecha_inicio: string;
    fecha_final: string;
    created_at: string;
    updated_at: string;
}

export interface Area {
    id_area: number;
    id_olimpiada: number;
    nombre_area: string;
    descripcion: string;
    created_at: string;
    updated_at: string;
    permite_multiples_areas: number;
    olimpiada: Olimpiada;
}

export interface Pivot {
    id_inscripcion: number;
    id_nivel: number;
    id_area: number;
    created_at: string;
    updated_at: string;
}

export interface NivelCategoria {
    id_nivel: number;
    id_area: number;
    nombre_nivel: string;
    descripcion: string | null;
    fecha_examen: string;
    costo: string;
    habilitacion: boolean;
    gradoIniCat: string;
    gradoFinCat: string;
    created_at: string;
    updated_at: string;
    pivot: Pivot;
    area: Area;
}

export interface Inscripcion {
    id_inscripcion: number;
    estado: string;
    created_at: string;
    updated_at: string;
    nivel_categorias: NivelCategoria[];
    olimpistas: Olimpista[];
    tutors: Tutor[];
    boleta_pago: BoletaPago;
}
