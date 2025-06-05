// Nuevas interfaces auxiliares
export interface Curso {
  id_curso: number;
  nameCurso: string;
  id_inscripcion: number | null;
}

export interface AreaNivel {
  area_id: number;
  area_nombre: string;
  niveles: NivelBasico[];
}

export interface NivelBasico {
  nivel_id: number;
  nivel_nombre: string;
}

// Interfaces principales
export interface Inscripcion {
  id: number;
  fecha_inscripcion: string | null;
  estado: 'Pendiente' | 'Pagado' | 'Verificado';
  olimpistas: Olimpista[];
  tutors: Tutor[];
  boleta_pago: BoletaPago;
  niveles_seleccionados: NivelCategoria[];
  createdAt: string;
  updatedAt: string;
}

export interface Olimpista {
  id: number;
  id_inscripcion: number;
  nombres: string;
  apellidos: string;
  ci: string;
  fecha_nacimiento: string;
  correo: string;
  telefono: string;
  colegio: string;
  curso: Curso | null;  // Corregido
  departamento: string;
  provincia: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tutor {
  id: number;
  id_inscripcion: number;
  nombres: string;
  apellidos: string;
  ci: string;
  correo: string;
  telefono: string;
  contacto: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BoletaPago {
  id: number;
  numero_boleta: string;
  monto: string;
  fecha_generacion: string;
  nombre_olimpiada: string | null;
  areas_niveles: AreaNivel[] | null;  // Corregido
  createdAt: string;
  updatedAt: string;
}

export interface NivelCategoria {
  id: number;
  nombre_nivel: string;
  descripcion: string;
  fecha_examen: string;
  costo: string;
  habilitacion: boolean;
  createdAt: string;
  updatedAt: string;
}

// Payload
export interface VerificarPagoPayload {
  numero_boleta: string;
  estado: 'Pagado';
}
