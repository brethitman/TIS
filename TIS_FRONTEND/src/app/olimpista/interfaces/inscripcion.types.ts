// src/app/interfaces/inscripcion.types.ts

// --- Interfaces para el Payload (Request) ---

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
  contacto: string;
}

export interface AreaInscripcion {
  area_id: number;
  nivelesCategoria: number[];
}

export interface InscripcionPayload {
  estado: string;
  curso_id: number;
  olimpistas: Olimpista[];
  tutors: Tutor[];
  areas: AreaInscripcion[];
}

// --- Interfaces para la Respuesta (Response) ---

export interface OlimpistaResponse extends Olimpista {
  id_curso: number;
  id_inscripcion: number;
  id_olimpista: number;
  created_at: string;
  updated_at: string;
}

export interface TutorResponse extends Tutor {
  id_inscripcion: number;
  id_tutor: number;
  created_at: string;
  updated_at: string;
}

export interface Nivel {
  nivel_id: number;
  nivel_nombre: string;
}

export interface AreaNivel {
  area_id: number;
  area_nombre: string;
  niveles: Nivel[];
}

export interface Curso {
  id: number;
  nombre: string;
}

export interface BoletaPagoResponse {
  id: number;
  numero_boleta: string;
  monto: string;
  fecha_generacion: string;
  areas_niveles: AreaNivel[];
  nombre_olimpiada: string;
  curso: Curso;
  olimpista: OlimpistaResponse;
  tutor_principal: TutorResponse;
  tutores_adicionales: TutorResponse[];
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
