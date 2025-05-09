// --- Interfaces para el Payload (Datos enviados al backend) ---


export interface Olimpista {
  nombres: string;
  apellidos: string;
  ci: string;
  fecha_nacimiento: string;
  correo: string;
  telefono: string;
  colegio: string;
  departamento: string;  // <-- Campo corregido (antes era 'curso')
  provincia: string;
}

// Tutor: Mantenemos la misma estructura del payload
export interface Tutor {
  nombres: string;
  apellidos: string;
  ci: string;
  correo: string;
  telefono: string;
  contacto: string;  // <-- Nuevo campo según la API
}

export interface AreaInscripcion {
  area_id: number;
  nivelesCategoria: number[];
}

// Payload: Eliminamos 'fecha_inscripcion' (la API la genera automáticamente)
export interface InscripcionPayload {
  estado: string;
  olimpistas: Olimpista[];
  tutors: Tutor[];
  areas: AreaInscripcion[];
}

// --- Interfaces para la Respuesta (Datos recibidos del backend) ---

export interface OlimpistaResponse extends Olimpista {
  id: number;
  id_inscripcion: number;
  createdAt: string;
  updatedAt: string;
}

export interface TutorResponse extends Tutor {
  id: number;
  id_inscripcion: number;
  createdAt: string;
  updatedAt: string;
}

export interface BoletaPagoResponse {
  id: number;
  numero_boleta: string;
  monto: string;
  fecha_generacion: string;
  createdAt: string;
  updatedAt: string;
}

// Cambiamos 'habilitacion' a boolean según la respuesta de la API
export interface NivelSeleccionadoResponse {
  id: number;
  nombre_nivel: string;
  descripcion: string;
  fecha_examen: string;
  costo: string;
  habilitacion: boolean;  // <-- Tipo corregido (era number)
  createdAt: string;
  updatedAt: string;
}

export interface InscripcionResponse {
  id: number;
  estado: string;
  olimpistas: OlimpistaResponse[];
  tutors: TutorResponse[];
  boleta_pago: BoletaPagoResponse;
  niveles_seleccionados: NivelSeleccionadoResponse[];
  createdAt: string;
  updatedAt: string;
}

// Respuesta completa del endpoint POST /api/inscripcion
export interface InscripcionPostSuccessResponse {
  message: string;
  inscripcion: InscripcionResponse;
}
