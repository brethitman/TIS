import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { InscripcionService } from '../../service/inscripcion.service'; // Asegúrate de que esta ruta sea correcta
import { Area, Olimpista, Tutor } from '../../interfaces/inscripcion.interface'; // Ajusta la ruta, asegurando que Olimpista y Tutor estén disponibles
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { InscripcionDataService } from '../../service/inscripcion-data-service.service';
import { Router } from '@angular/router';

// --- Validador Personalizado (Puede estar en este archivo o uno separado) ---
/**
 * Validador para requerir un mínimo de elementos en un FormArray.
 * Devuelve {'minLengthArray': {'requiredLength': min, 'actualLength': control.length}} si es inválido.
 */
export function minLengthArray(min: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (!(control instanceof FormArray)) {
       // Este validador solo funciona en FormArrays. Si no es un FormArray, es válido para este validador.
       return null;
    }
    if (control.length < min) {
      return {'minLengthArray': { 'requiredLength': min, 'actualLength': control.length }};
    }
    return null;
  };
}
// --- Fin Validador Personalizado ---


@Component({
  selector: 'app-iscripcion3',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './iscripcion3.component.html',
})
export class Iscripcion3Component implements OnInit {
  areasForm: FormGroup;
  areas: Area[] = []; // Lista de áreas posibles cargadas desde el backend
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private inscripcionService: InscripcionService,
    private inscripcionDataService: InscripcionDataService // Servicio para datos entre pasos
  ) {
    // Inicializa el formulario con el FormArray 'areas' y el validador personalizado
    this.areasForm = this.fb.group({
      areas: this.fb.array([], minLengthArray(1)) // Requiere al menos 1 elemento en el FormArray
    });
  }

  ngOnInit(): void {
    // Cargar datos de pasos anteriores
    const olimpistasData = this.inscripcionDataService.getOlimpistas();
    const tutorsData = this.inscripcionDataService.getTutors();

    // Redirigir si no hay datos de pasos anteriores (evitar acceso directo)
    if ((!olimpistasData || olimpistasData.length === 0) || (!tutorsData || tutorsData.length === 0)) {
         console.warn('Datos de pasos anteriores no encontrados. Redirigiendo a paso 1.');
         this.router.navigate(['/inscripcion/paso1']);
         return;
    }

    // Cargar la lista de áreas disponibles desde el backend
    this.loadAreas();

    // Cargar áreas seleccionadas previamente del servicio de datos (si existen)
    const savedAreas = this.inscripcionDataService.getAreas(); // Esto es { id: number }[]

    if (savedAreas && savedAreas.length > 0) {
        // Si hay áreas guardadas, añadirlas al FormArray
        savedAreas.forEach(area => {
          // Usa createAreaForm con el ID guardado para preseleccionar
          this.areasFormArray.push(this.createAreaForm(area.id));
        });
    } else {
      // Si no hay áreas guardadas, asegura que haya al menos un campo de selección de área
       if (this.areasFormArray.controls.length < 1) { // Añade solo si el FormArray está vacío
          this.addArea();
       }
    }

    // Marcar el FormArray de áreas como tocado al iniciar si está vacío
    // Esto es para que el mensaje de validación minLengthArray(1) se muestre inmediatamente si no hay áreas.
    if (this.areasFormArray.length === 0) {
        this.areasFormArray.markAsTouched();
    }
  }

  // Carga las áreas posibles desde el servicio (para poblar el select)
  private loadAreas(): void {
     this.inscripcionService.getAreas().subscribe({
      next: (areas) => {
            this.areas = areas;
            console.log('Áreas posibles cargadas:', this.areas); // Log para verificar la carga
        },
      error: (err) => {
        this.errorMessage = 'Error cargando áreas de competencia: ' + (err.message || 'Error desconocido');
        console.error('Error loading areas:', err); // Log del error de carga
      }
    });
  }

  // Getter para acceder fácilmente al FormArray 'areas'
  get areasFormArray(): FormArray {
    return this.areasForm.get('areas') as FormArray;
  }

  // Crea un nuevo FormGroup para una sola área, con un campo 'id' requerido.
  // Recibe un ID opcional para preseleccionar un valor.
  createAreaForm(areaId?: number): FormGroup {
    return this.fb.group({
      id: [areaId || '', Validators.required] // Campo 'id' es requerido
    });
  }

  // Añade un nuevo FormGroup de área al FormArray
  addArea(): void {
    const areaFormGroup = this.createAreaForm();
    this.areasFormArray.push(areaFormGroup);
    // Marca el nuevo control como tocado para mostrar validación si es necesario
    areaFormGroup.get('id')?.markAsTouched();
    // Marca el FormArray como tocado también si es el primero que se añade
    if (this.areasFormArray.length === 1) {
      this.areasFormArray.markAsTouched();
    }
  }

  // Elimina un FormGroup de área del FormArray por índice
  removeArea(index: number): void {
     // Solo permitir eliminar si al menos uno quedará, basado en el validador minLengthArray
     // Obtiene el mínimo requerido del validador si existe, de lo contrario asume 0 para eliminar libremente
     const minRequired = (this.areasFormArray.validator as any)?.minLengthArray?.requiredLength || 0;

     if (this.areasFormArray.length > minRequired) {
        this.areasFormArray.removeAt(index);
         // Si después de eliminar la longitud es igual al mínimo, marca el FormArray como tocado para revalidar
         if (this.areasFormArray.length === minRequired && minRequired > 0) {
             this.areasFormArray.markAsTouched();
         }
     } else {
          // Opcional: Mostrar un mensaje si se intenta eliminar cuando ya es el mínimo
         if (minRequired > 0) {
             this.errorMessage = `Debe seleccionar al menos ${ minRequired } área.`;
               this.successMessage = null; // Limpia éxito
         }
     }
  }

  // Navega al paso anterior (Paso 2)
   prevStep(): void {
      // Guarda los datos actuales (el valor del FormArray de áreas) en el servicio antes de navegar
      // areasFormArray.value es [{ id: 1 }, { id: 3 }, ...]
      this.inscripcionDataService.setAreas(this.areasFormArray.value);
      this.router.navigate(['/inscripcion/paso2']);
   }

  // Método que se llama al enviar el formulario
  onSubmit(): void {
    // Marca todo el formulario de este componente (que contiene el FormArray de áreas) como tocado
    this.areasForm.markAllAsTouched();

    // Verifica la validez del formulario frontend y si las áreas posibles se cargaron.
    if (this.areasForm.invalid || this.areas.length === 0) {
       // Muestra un mensaje de error general o específico
       if (this.areas.length === 0) {
            this.errorMessage = 'No se pudieron cargar las áreas de competencia. No es posible enviar el formulario.';
       } else if (this.areasFormArray.errors?.['minLengthArray']) {
             this.errorMessage = `Debe seleccionar al menos ${this.areasFormArray.errors['minLengthArray'].requiredLength} área.`;
        }
         else {
            this.errorMessage = 'Por favor, revise las áreas seleccionadas.';
            console.log('Validación frontend fallida en Paso 3:', this.areasForm); // Log para ver detalles de la validación frontend
       }

        this.successMessage = null; // Limpia éxito
        return; // Detiene la ejecución si el formulario frontend es inválido
    }

    this.errorMessage = null;
    this.successMessage = null;
    this.isLoading = true;

    // --- CORRECCIÓN APLICADA AQUÍ (obtener datos de areas del formulario local) ---
    // 1. Obtiene los datos de olimpistas y tutores del servicio (que sí están guardados ahí).
    const olimpistasData = this.inscripcionDataService.getOlimpistas();
    const tutorsData = this.inscripcionDataService.getTutors();

    // 2. Obtiene el valor actual del FormArray de áreas DIRECTAMENTE del formulario local.
    //    Esto devuelve un array de objetos: [{ id: idSeleccionado1 }, { id: idSeleccionado2 }, ...]
    const currentAreasData = this.areasFormArray.value;

    // 3. Mapea este array de objetos a un array de IDs numéricos [idSeleccionado1, idSeleccionado2, ...]
    //    Le indicamos a TypeScript que cada 'area' en el array tiene una propiedad 'id'.
    //    Este es el formato exacto que tu backend espera.
    const areasToSend = currentAreasData.map((area: { id: any }) => area.id);
    // Si estás seguro de que el ID SIEMPRE debe ser un número:
    // const areasToSend: number[] = currentAreasData.map((area: { id: number }) => area.id);
    // -----------------------------------------------------------------------------

    // 4. Construye el payload final combinando todos los datos.
    const finalPayload = {
      olimpistas: olimpistasData,
      tutors: tutorsData,
      areas: areasToSend // Usa el array de IDs recién mapeado
    };
    // --- FIN CORRECCIÓN ---


    // --- PASO CRÍTICO DE DEPURACIÓN ---
    // Log exacto de los datos que se van a enviar a la API
    console.log('Datos FINALES a enviar al backend:', finalPayload);
    // Abre la pestaña Network en las Herramientas de Desarrollador del navegador
    // para comparar este log con el "Request Payload" real de la petición POST.
    // ¡Con esta corrección, el Payload en la red debería mostrar áreas: [..., ...] !
    // ----------------------------------


    // Llama al servicio para enviar los datos al backend
    this.inscripcionService.crearInscripcionCompleta(finalPayload)
      .pipe(
        // finalize se ejecuta al terminar el subscribe (éxito o error)
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: () => {
          this.successMessage = '¡Inscripción realizada con éxito!';
          // Limpia los datos del servicio después de un envío exitoso
          this.inscripcionDataService.clearFormData();
          // Opcional: redirigir al inicio o a una página de confirmación después de un tiempo
           setTimeout(() => {
             this.router.navigate(['/inscripcion/paso1']); // O '/confirmacion'
           }, 4000); // Redirige después de 4 segundos

        },
        error: (err) => {
          console.error('Error en la inscripción (respuesta del backend):', err); // Log del error completo en consola

          // Intenta obtener un mensaje de error más útil de la respuesta del backend
          let friendlyErrorMessage = 'Error desconocido al realizar la inscripción.';

            if (err && err.error) {
                if (typeof err.error === 'string') {
                    friendlyErrorMessage = err.error; // Si err.error es un string simple
                } else if (typeof err.error === 'object') {
                    // Intenta obtener el mensaje de alguna propiedad común como 'message'
                    friendlyErrorMessage = err.error.message || JSON.stringify(err.error); // O muestra el objeto completo si no hay mensaje
                }
            } else if (err && err.message) {
                friendlyErrorMessage = err.message; // Mensaje del error HTTP
            }

          this.errorMessage = friendlyErrorMessage;
           this.successMessage = null; // Limpia éxito
        }
      });
  }

    // La función resetForm() no se usa después de un éxito con redirección,
    // pero la dejo aquí si la necesitas en otro contexto.
    // resetForm(): void {
    //     this.inscripcionForm.reset();
    //     this.olimpistas.clear();
    //     this.tutors.clear();
    //     this.areasFormArray.clear();
    //     this.addOlimpista();
    //     this.addTutor();
    //     this.addArea();
    //     this.errorMessage = null;
    //     this.successMessage = null;
    // }
}
