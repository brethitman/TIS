// Interfaz para la respuesta de la API (wrapper)
export interface ApiResponse {
  message: string;
  data: Inscripcion;
}

// Interfaz para la respuesta completa de la API
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
  curso: string | null;
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
  areas_niveles: AreaNivel[] | null;
  createdAt: string;
  updatedAt: string;
}

// Nueva interfaz para areas_niveles basada en tu respuesta
export interface AreaNivel {
  area_id: number;
  area_nombre: string;
  niveles: NivelInfo[];
}

export interface NivelInfo {
  nivel_id: number;
  nivel_nombre: string;
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

// Interfaz para el payload de verificación
export interface VerificarPagoPayload {
  numero_boleta: string;
  estado: 'Pagado';
}