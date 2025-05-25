// src/app/interfaces/inscripcion.types.ts


export interface Olimpista {
  nombres: string;
  apellidos: string;
  ci: string;
  fecha_nacimiento: string;
  correo: string;
  telefono: string;
  colegio: string;
  departamento: string;
  provincia: string;
}

export interface Tutor {
  nombres: string;
  apellidos: string;
  ci: string;
  correo: string;
  telefono: string;
  contacto?: string;
}

export interface AreaInscripcion {
  area_id: number;
  nivelesCategoria: number[];
}

export interface InscripcionPayload {
  olimpiada_id: number; // Añadido este campo que faltaba
  estado: string;
  olimpistas: Olimpista[];
  tutors: Tutor[];
  areas: AreaInscripcion[];
}

// --- Fin Interfaces para el Payload ---


// --- Interfaces para la Respuesta (Datos recibidos del backend) ---
export interface OlimpistaResponse extends Olimpista {
  id_olimpista: number;
  id_inscripcion: number;
  created_at: string;
  updated_at: string;
}

export interface TutorResponse extends Tutor {
  id_tutor: number;
  id_inscripcion: number;
  created_at: string;
  updated_at: string;
}

export interface BoletaPagoResponse {
  id: number;
  numero_boleta: string;
  monto: string;
  fecha_generacion: string;
  id_olimpista: number;
  id_tutor: number;
  areas_niveles: Array<{
    area_id: number;
    area_nombre: string;
    niveles: Array<{
      nivel_id: number;
      nivel_nombre: string;
    }>;
  }>;
  nombre_olimpiada: string;
  olimpista: OlimpistaResponse;
  tutor: TutorResponse;
  created_at: string;
  updated_at: string;
}

export interface NivelSeleccionadoResponse {
  id: number;
  nombre_nivel: string;
  costo: string;
  fecha_examen: string | null;
}

export interface InscripcionResponse {
  id: number;
  estado: string;
  fecha_inscripcion: string;
  olimpistas: OlimpistaResponse[];
  tutors: TutorResponse[];
  boleta_pago: BoletaPagoResponse;
  niveles_seleccionados: NivelSeleccionadoResponse[];
  created_at: string;
  updated_at: string;
}

export interface InscripcionPostSuccessResponse {
  message: string;
  inscripcion: InscripcionResponse;
}
// --- Fin Interfaces para la Respuesta ---
