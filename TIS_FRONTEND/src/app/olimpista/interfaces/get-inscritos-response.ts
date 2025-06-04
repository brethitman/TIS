import { Inscrito } from "./inscritos.interface"; 

export interface GetInscritos {
    inscrito: Inscrito[];
    resource:        string;
    owner:           string;
    code:            string;
    severity:        number;
    message:         string;
    source:          string;
    startLineNumber: number;
    startColumn:     number;
    endLineNumber:   number;
    endColumn:       number;

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