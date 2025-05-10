export interface Curso {
    id_curso: number;
    nameCurso: string;
  }
  
  export interface CursoRequest {
    id_curso: number;
  }
  
  export interface AreaBasicRequest {
    id_olimpiada: number;
    nombre_area: string;
    descripcion?: string;
    gradoIniAr: string;
    gradoFinAr: string;
    cursos: number[];
  }
  
  export interface AreaBasicResponse {
    message: string;
    data: {
      id: number;
      id_olimpiada: number;
      nombre_area: string;
      descripcion: string;
      gradoIniAr: string;
      gradoFinAr: string;
      createdAt: string;
      updatedAt: string;
      olimpiada: {
        id_olimpiada: number;
        nombre_olimpiada: string;
        descripcion_olimpiada: string;
        fecha_inicio: string;
        fecha_final: string;
        created_at: string;
        updated_at: string;
      };
      cursos: Curso[];
    };
  }