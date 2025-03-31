import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Route, Routes } from '@angular/router';
import { AreasComponent } from './pages/areas/areas.component';
import { OlimpistaPageComponent } from './pages/olimpista-page/olimpista-page.component';
import { Inicio1Component } from './pages/inicio1/inicio1.component';

const routes: Routes = [
   {
      path:'',
      component:OlimpistaPageComponent,

   },
   {
    path: 'Areas',
    component: AreasComponent,
   },


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class EstudiantesRoutingModule { }

