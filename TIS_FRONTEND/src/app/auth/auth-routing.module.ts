import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { OlimpistaPageComponent } from '../olimpista/pages/olimpista-page/olimpista-page.component';
import { Inscripcion1Component } from '../olimpista/components/inscripcion1/inscripcion1.component';
import { Inicio2Component } from '../olimpista/pages/inicio2/inicio2.component';



const routes: Routes = [
  {
    path: "login",
    component: LoginPageComponent,
  },
  {
    path: "register",
    component: RegisterPageComponent,
  },
  {
    path: 'inicio/OlimpistaForm',
    component: OlimpistaPageComponent,
  },
  { 
    path: 'inicio2', 
    component: Inicio2Component },

 
  {
    /*
    path: 'inicio/datosPostulante',
    component: DatosPostulanteComponent,
    */
  },

  ];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
