export interface Inscrito {
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