/*
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesAreasComponent, InscripcionAreasComponent } from './components/inscripcion-areas/inscripcion-areas.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    InscripcionesAreasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    InscripcionesAreasComponent // Exportamos el componente para usarlo en otros módulos
  ]
})
export class EstudiantesModule { }
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BotonExelComponent } from './components/boton-exel/boton-exel.component';

@NgModule({
  declarations: [
    //BotonExelComponentuí
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
   // BotonExelComponent
  ]
})
export class EstudiantesModule { }








/*
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class EstudiantesModule { }
*/
