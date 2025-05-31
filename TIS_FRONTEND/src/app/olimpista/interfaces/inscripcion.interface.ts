// inscripcion.interface.ts
export interface Inscripcione {
  id: number;
  fecha_inscripcion: Date;
  estado: Estado;
  olimpistas: Olimpista[];
  tutors: Tutor[];
  areas: AreaInscripcion[]; // Cambiar a AreaInscripcion para incluir más datos
  createdAt: Date;
  updatedAt: Date;
}

// Nueva interfaz específica para áreas en inscripciones
export interface AreaInscripcion {
  id: number;
  id_olimpiada: number;
  id_inscripcion: number;
  nombre_area: string;
  descripcion: string;
  nivel?: NivelInscripcion; // Relación con el nivel específico de esta inscripción
  createdAt: Date;
  updatedAt: Date;
}

// Nueva interfaz para niveles en inscripciones
export interface NivelInscripcion {
  id: number;
  id_area: number;
  nombre_nivel: string;
  descripcion?: string;
  fecha_examen: Date;
  costo: string;
  habilitacion: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Area {
  id: number;
  id_olimpiada: number;
  id_inscripcion: number;
  nombre_area: string;
  descripcion: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum Estado {
  Pagado = "Pagado",
  Pendiente = "Pendiente",
  Verificado = "Verificado",
}

export interface Olimpista {
  id: number;
  id_inscripcion: number;
  nombres: string;
  apellidos: string;
  ci: string;
  fecha_nacimiento: Date;
  correo: string;
  telefono: string;
  colegio: string;
  curso: string;
  departamento: string;
  provincia: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tutor {
  id: number;
  id_inscripcion: number;
  nombres: string;
  apellidos: string;
  ci: string;
  correo: string;
  telefono: string;
  createdAt: Date;
  updatedAt: Date;
}