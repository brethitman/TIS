export interface Curso {
    id_curso: number;
    nameCurso: string;
  }
  
  export interface CursosResponse {
    data: Curso[];
  }