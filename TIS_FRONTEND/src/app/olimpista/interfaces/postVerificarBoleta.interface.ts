// postVerificarBoleta.interface.ts
export interface VerificarPagoPayload {
  numero_boleta: string;
  estado: 'Pagado';
}

export interface VerificarPagoResponse {
  message: string;
  data: InscripcionDetallada;
}

export interface InscripcionDetallada {
  id_inscripcion: number;
  estado: 'Pendiente' | 'Pagado' | 'Verificado';
  fechas: FechasInscripcion;
  olimpiada: string;
  participante: Participante;
  tutor: Tutor;
  detalles_academicos: DetallesAcademicos;
}

export interface FechasInscripcion {
  inscripcion: string;
  actualizacion: string;
}

export interface Participante {
  nombres: string;
  apellidos: string;
  ci: string;
  colegio: string;
  contacto: ContactoParticipante;
}

export interface ContactoParticipante {
  email: string;
  telefono: string;
}

export interface Tutor {
  nombres: string;
  apellidos: string;
  ci: string;
  contacto: ContactoTutor;
}

export interface ContactoTutor {
  email: string;
  telefono: string;
  parentesco?: string;
}

export interface DetallesAcademicos {
  boleta: BoletaPago;
  areas: AreaInscripcion[];
}

export interface BoletaPago {
  numero: string;
  monto: number;
  fecha_emision: string;
}

export interface AreaInscripcion {
  nombre: string;
  niveles: NivelInscripcion[];
}

export interface NivelInscripcion {
  nombre: string;
  costo: number;
  fecha_examen: string;
}
