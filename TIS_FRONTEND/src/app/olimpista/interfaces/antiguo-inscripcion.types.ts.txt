// src/app/interfaces/inscripcion.types.ts (o donde tengas tus tipos)

// --- Interfaces para el Payload (lo que envías) - Estas ya las tienes ---
export interface Olimpista {
  nombres: string;
  apellidos: string;
  ci: string;
  fecha_nacimiento: string; // o Date si manejas objetos de fecha
  correo: string;
  telefono: string;
  colegio: string;
  curso: string;
  departamento: string;
  provincia: string;
}

export interface Tutor {
  nombres: string;
  apellidos: string;
  ci: string;
  correo: string;
  telefono: string;
}

export interface AreaInscripcion {
  area_id: number;
  nivelesCategoria: number[];
}

export interface InscripcionPayload {
  fecha_inscripcion: string; // o Date
  estado: string;
  olimpistas: Olimpista[];
  tutors: Tutor[];
  areas: AreaInscripcion[];
}
// --- Fin Interfaces para el Payload ---


// --- Interfaces para la Respuesta (lo que recibes) - ¡Añadir estas! ---

// Estructura de Olimpista y Tutor en la respuesta (pueden incluir IDs, fechas de creación, etc.)
// Puedes reutilizar las interfaces de arriba si la estructura es la misma,
// pero es más robusto definir nuevas interfaces si el backend añade campos.
// Basado en tu respuesta de ejemplo:
export interface OlimpistaResponse extends Olimpista { // Hereda del payload si quieres
  id: number;
  id_inscripcion: number;
  createdAt: string;
  updatedAt: string;
}

export interface TutorResponse extends Tutor { // Hereda del payload si quieres
  id: number;
  id_inscripcion: number;
  createdAt: string;
  updatedAt: string;
}


// Estructura de la Boleta de Pago recibida en la respuesta
export interface BoletaPagoResponse {
    id: number;
    numero_boleta: string;
    monto: string; // O number si lo conviertes
    fecha_generacion: string; // O Date
    createdAt: string;
    updatedAt: string;
}

// Estructura de Nivel Seleccionado recibida en la respuesta
export interface NivelSeleccionadoResponse {
    id: number;
    nombre_nivel: string;
    descripcion: string;
    fecha_examen: string; // O Date
    costo: string; // O number
    habilitacion: number; // O boolean
    createdAt: string;
    updatedAt: string;
}

// Estructura de la Inscripción completa recibida DENTRO del objeto 'inscripcion' de la respuesta POST
export interface InscripcionResponse {
    id: number; // ID de la inscripción creada
    fecha_inscripcion: string; // O Date
    estado: string;
    olimpistas: OlimpistaResponse[]; // Ahora son los tipos Response
    tutors: TutorResponse[]; // Ahora son los tipos Response
    boleta_pago: BoletaPagoResponse; // Detalles de la boleta generada
    niveles_seleccionados: NivelSeleccionadoResponse[]; // Detalles de los niveles
    createdAt: string;
    updatedAt: string;
}

// Estructura COMPLETA de la respuesta exitosa del POST al endpoint /api/inscripcion
export interface InscripcionPostSuccessResponse {
    message: string; // El mensaje "Inscripción creada exitosamente"
    inscripcion: InscripcionResponse; // El objeto con todos los detalles de la inscripción creada
}

// --- Fin Interfaces para la Respuesta ---
