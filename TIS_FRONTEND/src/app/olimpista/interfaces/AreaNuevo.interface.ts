export interface Curso {
    id_curso: number;
    nameCurso: string;
  }

  export interface AreaBasicRequest {
    id_olimpiada: number;
    nombre_area: string;
    descripcion?: string;
     permite_multiples_areas: boolean; // Nuevo campo requerido
    cursos: number[];
  }

  export interface AreaBasicResponse {
    message: string;
    data: {
        id: number;
        id_olimpiada: number;
        nombre_area: string;
        descripcion: string;
        permite_multiples_areas: boolean; // Nuevo campo
        createdAt: string;
        updatedAt: string;
        olimpiada: {
            id_olimpiada: number;
            nombre_olimpiada: string;
            descripcion_olimpiada: string;
            fecha_inicio: string;
            fecha_final: string;
            createdAt: string; // Cambiado a camelCase
            updatedAt: string; // Cambiado a camelCase
        };
        cursos: Curso[];
    };
}
