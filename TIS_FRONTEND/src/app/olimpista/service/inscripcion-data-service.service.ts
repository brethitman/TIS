import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Olimpista, Tutor, Area } from '../interfaces/inscripcion.interface'; // Ajusta la ruta según donde tengas tus interfaces

// Define una interfaz para la estructura completa de los datos del formulario
interface InscripcionFormData {
  olimpistas: Olimpista[];
  tutors: Tutor[];
  areas: { id: number }[]; // Guardaremos solo los IDs de las áreas seleccionadas
}

@Injectable({
  providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})
export class InscripcionDataService {
  // Usamos BehaviorSubject para poder inicializar con datos vacíos y obtener el último valor
  private formDataSubject = new BehaviorSubject<InscripcionFormData>({
    olimpistas: [],
    tutors: [],
    areas: []
  });
  // Exponemos los datos como un Observable para que los componentes puedan suscribirse
  formData$: Observable<InscripcionFormData> = this.formDataSubject.asObservable();

  constructor() { }

  // Método para obtener los datos actuales
  getCurrentFormData(): InscripcionFormData {
    return this.formDataSubject.value;
  }

  // Métodos para actualizar partes específicas de los datos
  setOlimpistas(olimpistas: Olimpista[]): void {
    const currentData = this.getCurrentFormData();
    this.formDataSubject.next({ ...currentData, olimpistas });
  }

  setTutors(tutors: Tutor[]): void {
    const currentData = this.getCurrentFormData();
    this.formDataSubject.next({ ...currentData, tutors });
  }

  setAreas(areas: { id: number }[]): void {
     const currentData = this.getCurrentFormData();
     this.formDataSubject.next({ ...currentData, areas });
  }


  // Método para obtener los datos de Olimpistas
  getOlimpistas(): Olimpista[] {
    return this.getCurrentFormData().olimpistas;
  }

   // Método para obtener los datos de Tutores
  getTutors(): Tutor[] {
    return this.getCurrentFormData().tutors;
  }

    // Método para obtener los datos de Áreas (solo IDs)
  getAreas(): { id: number }[] {
    return this.getCurrentFormData().areas;
  }

  // Método para obtener todos los datos combinados para el envío final
  getCompleteFormDataForSubmit(): any { // Puedes tipar esto más específicamente si tienes una interfaz para el payload final
     const completeData = this.getCurrentFormData();
     // Asegúrate de que las áreas se envíen en el formato correcto si es necesario (por ejemplo, solo un array de IDs)
     const areasToSend = completeData.areas.map(area => area.id); // Asumiendo que la API espera un array de IDs
     return {
        olimpistas: completeData.olimpistas,
        tutors: completeData.tutors,
        areas: areasToSend
     };
  }


  // Método para limpiar los datos después de un envío exitoso o si se cancela
  clearFormData(): void {
    this.formDataSubject.next({
      olimpistas: [],
      tutors: [],
      areas: []
    });
  }
}
