import { Router } from '@angular/router';
 import { Component, OnInit } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { FormsModule } from '@angular/forms';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { AreaService } from '../../service/area.service';
 import { CategoriaService } from '../../service/categoria.service'; 
 import { OlimpistaService } from '../../service/olimpista.service';
 import { TutorService } from '../../service/tutor.service'; 
 import { InscripcionService } from '../../service/inscripcion.service'; 
 import { Area } from '../../interfaces/area.interface';
 import { NivelesCategoria } from '../../interfaces/categoria.interface';
 import { Olimpista } from '../../interfaces/olimpista-response';
 import { Tutor } from '../../interfaces/inscripcion.interface';
 import { Inscripcion } from '../../interfaces/inscripcion.interface';
 import { GetAreaResponse } from '../../interfaces/get-area-response';
 import { GetNIvelesCategoriaResponse } from '../../interfaces/get-categoria-response';
 
 @Component({
   selector: 'app-datosPostulante-page',
   templateUrl: './datosPostulante-page.component.html',
   standalone: true,
   imports: [CommonModule, FormsModule],
   //styleUrls: ['./inicio2.component.css']
 })
 export class DatosPostulanteComponent implements OnInit {
   inscripcionForm: FormGroup;
   areas: Area[] = [];
   niveles: NivelesCategoria[] = [];
   nivelSeleccionado: NivelesCategoria | null = null;
   cargandoAreas = true;
   cargandoNiveles = false;
   mensajeExito = '';
   mensajeError = '';
 
   constructor(
     private fb: FormBuilder,
     private areaService: AreaService,
     private categoriaService: CategoriaService,
     private olimpistaService: OlimpistaService,
     private tutorService: TutorService,
     private inscripcionService: InscripcionService,
     private router: Router
   ) {
     this.inscripcionForm = this.fb.group({
       // Datos del olimpista
       olimpistaNombres: ['', Validators.required],
       olimpistaApellidos: ['', Validators.required],
       olimpistaCi: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[0-9]*$')]],
       
       // Datos del tutor
       tutorNombres: ['', Validators.required],
       tutorApellidos: ['', Validators.required],
       tutorCi: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
       
       // Datos de la inscripción
       areaId: ['', Validators.required],
       nivelId: ['', Validators.required]
     });
   }
 
   ngOnInit(): void {
     this.cargarAreas();
   }
 
 
   cargarAreas(): void {
     this.cargandoAreas = true;
     this.areaService.getAreas().subscribe(
       (response: any) => {
         this.areas = Array.isArray(response) ? response : response.areas || [];
         this.cargandoAreas = false;
       },
       (error) => {
         console.error('Error al cargar áreas:', error);
         this.cargandoAreas = false;
       }
     );
   }
   testNivelesCategoria(areaId: number): void {
     this.niveles = [
       {
         id: 1,
         id_area: areaId,
         nombre_nivel: 'Básico',
         descripcion: 'Nivel inicial',
         fecha_examen: new Date('2023-12-15'),
         costo: 100,
         habilitacion: true,
         created_at: new Date(),
         updated_at: new Date()
       },
       {
         id: 2,
         id_area: areaId,
         nombre_nivel: 'Avanzado',
         descripcion: 'Nivel experto',
         fecha_examen: new Date('2023-12-20'),
         costo: 150,
         habilitacion: true,
         created_at: new Date(),
         updated_at: new Date()
       }
     ];
     
     console.log('Datos de prueba cargados para área', areaId);
   }
   
   onAreaSeleccionada(): void {
     const areaId = Number(this.inscripcionForm.get('areaId')?.value);
     
     if (areaId) {
       this.cargandoNiveles = true;
       this.inscripcionForm.get('nivelId')?.reset();
       this.nivelSeleccionado = null;
   
       this.categoriaService.getNivelesPorArea(areaId).subscribe({
         next: (niveles) => {
           this.niveles = niveles;
           this.cargandoNiveles = false;
           console.log('Niveles cargados:', this.niveles);
         },
         error: (error) => {
           console.error('Error:', error);
           this.cargandoNiveles = false;
         }
       });
     }
   }
   /*cargarNivelesPorArea(areaId: number): void {
     this.cargandoNiveles = true;
     this.categoriaService.getNivelesPorArea(areaId).subscribe({
       next: (response: GetNIvelesCategoriaResponse) => {
         this.niveles = response.nivelesCategoria;
         this.cargandoNiveles = false;
       },
       error: (err) => {
         console.error('Error al cargar niveles:', err);
         this.mensajeError = 'Error al cargar las categorías disponibles';
         this.cargandoNiveles = false;
       }
     });
   }*/
 
   /*onAreaSeleccionada(): void {
     const areaId = this.inscripcionForm.get('areaId')?.value;
     if (areaId) {
       this.cargandoNiveles = true;
       this.inscripcionForm.get('nivelId')?.reset();
       this.nivelSeleccionado = null;
       
       this.categoriaService.getNivelesPorArea(areaId).subscribe({
         next: (response: GetNIvelesCategoriaResponse) => {
           this.niveles = response.nivelesCategoria; // Accede a la propiedad 'niveles' de la respuesta
           this.cargandoNiveles = false;
         },
         error: (err) => {
           console.error('Error al cargar niveles:', err);
           this.mensajeError = 'Error al cargar las categorías disponibles';
           this.cargandoNiveles = false;
         }
       });
     }
   }*/
 
   onNivelSeleccionado(): void {
     const nivelId = this.inscripcionForm.get('nivelId')?.value;
     this.nivelSeleccionado = this.niveles.find(n => n.id === nivelId) || null;
   }
 
   onSubmit(): void {
     if (this.inscripcionForm.invalid) return;
   
     const formValue = this.inscripcionForm.value;
   
     this.olimpistaService.create({
       nombres: formValue.olimpistaNombres,
       apellidos: formValue.olimpistaApellidos,
       ci: formValue.olimpistaCi
     }).subscribe({
       next: (olimpista) => {
         this.tutorService.create({
           nombres: formValue.tutorNombres,
           apellidos: formValue.tutorApellidos,
           ci: formValue.tutorCi
         }).subscribe({
           next: (tutor) => {
             const inscripcionData = {
               olimpistaId: olimpista.id,  // <-- Usa olimpistaId en lugar de id_olimpista
               tutorId: tutor.id,
               areaId: formValue.areaId,
               nivelId: formValue.nivelId,
               fecha_inscripcion: new Date(),
               estado: 'Pendiente'
             };
             
             this.inscripcionService.createInscripcion(inscripcionData).subscribe({
               next: () => {
                 console.log('Inscripción exitosa');
                 this.inscripcionForm.reset();
               }
             });
           }
         });
       }
     });
   }
   getNombreAreaSeleccionada(): string {
     const areaId = this.inscripcionForm.value.areaId;
     const area = this.areas.find(a => a.id === areaId);
     return area?.nombre_area || 'Área seleccionada';
   }
   
   getFechaExamenFormateada(): string {
     if (!this.nivelSeleccionado?.fecha_examen) {
       return 'Por definir';
     }
     // Asumiendo que fecha_examen es string o Date
     const fecha = new Date(this.nivelSeleccionado.fecha_examen);
     return fecha.toLocaleDateString('es-ES'); // Formato dd/MM/yyyy
   }
   
   agregarOtraArea(): void {
     // Implementa la lógica para agregar múltiples áreas si es necesario
     console.log('Funcionalidad para agregar otra área');
   }
   
   irADatosOlimpistas() {
     this.router.navigate(['/inicio/OlimpistaForm']);
   }
 }