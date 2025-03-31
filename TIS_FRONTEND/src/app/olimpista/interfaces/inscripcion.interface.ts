
export interface Inscripcion {
  id?: number;
  fecha_inscripcion: Date | string;
  estado: string;
  
  // Relaciones (pueden ser objetos o solo IDs)
  olimpista?: Olimpista;      // Objeto completo
  olimpistaId?: number;       // O solo el ID
  
  area?: Area;                // Objeto completo
  areaId?: number;            // O solo el ID
  
  tutor?: Tutor;              // Objeto completo
  tutorId?: number;           // O solo el ID
  
  nivel?: NivelesCategoria;   // Objeto completo
  nivelId?: number;           // O solo el ID
}
export interface InscritoForm {
  olimpista: {
    nombres: string;
    apellidos: string;
    ci: string;
    fecha_nacimiento?: Date; // Opcional si no es requerido en el form
    correo?: string; // Opcional si no es requerido en el form
    telefono?: string; // Opcional si no es requerido en el form
    colegio?: string; // Opcional si no es requerido en el form
    curso?: string; // Opcional si no es requerido en el form
    departamento?: string; // Opcional si no es requerido en el form
    provincia?: string; // Opcional si no es requerido en el form
  };
  
  tutor: {
    nombres: string;
    apellidos: string;
    ci: string;
    correo?: string; // Opcional si no es requerido en el form
    telefono?: string; // Opcional si no es requerido en el form
  };
  
  inscripcion: {
    areaId: number; // id_area seleccionada
    nivelId: number; // id_nivel seleccionado
    tutorId: number;
    olimpistaId: number;
    fecha_inscripcion: Date; // Puede ser la fecha actual
    estado?: string; // Puede ser 'Pendiente' por defecto
  };
  
  // Datos para mostrar en el formulario
  areas: {
    id: number;
    nombre_area: string;
    descripcion?: string;
  }[];
  
  niveles: {
    id: number;
    nombre_nivel: string;
    descripcion?: string;
    fecha_examen?: Date;
    costo: number;
  }[];
  
  // Datos calculados
  montoTotal: number;
}

export interface Area {
  id:          number;
  nombre_area: string;
  descripcion: null | string;
  createdAt:   Date;
  updatedAt:   Date;
}

export interface Olimpista {
  id:               number;
  nombres:          string;
  apellidos:        string;
  ci:               string;
  fecha_nacimiento: Date;
  correo:           string;
  telefono:         string;
  colegio:          string;
  curso:            string;
  departamento:     string;
  provincia:        string;
  tutorId: number;
  tutor?: Tutor;
  createdAt:        Date;
  updatedAt:        Date;
}

export interface Tutor {
  id:        number;
  nombres:   string;
  apellidos: string;
  ci:        string;
  correo:    string;
  telefono:  string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NivelesCategoria {
  id:           number;
  id_area:      number;
  nombre_nivel: string;
  descripcion:  null | string;
  fecha_examen: Date | null;
  costo:        number;
  habilitacion: boolean | null;
  created_at:   Date;
  updated_at:   Date;
}



/////////////////////////////

export interface GetInscripcionResponse {
  inscripciones: Inscripcion[];
  links:         Links;
  meta:          Meta;
}

export interface Links {
  first: string;
  last:  null;
  prev:  null;
  next:  null;
}

export interface Meta {
  current_page: number;
  from:         number;
  path:         string;
  per_page:     number;
  to:           number;
}
