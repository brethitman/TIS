import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AreasComponent } from './olimpista/pages/areas/areas.component';
import { Inicio1Component } from './olimpista/pages/inicio1/inicio1.component';
import { Inicio2Component } from './olimpista/pages/inicio2/inicio2.component';
import { Inicio3Component } from './olimpista/pages/inicio3/inicio3.component';
import { OlimpistaPageComponent } from './olimpista/pages/olimpista-page/olimpista-page.component';
import { Inscripcion1Component } from './olimpista/components/inscripcion1/inscripcion1.component';
import { Inscripcion2Component } from './olimpista/components/inscripcion2/inscripcion2.component';
import { Inscripcion3Component } from './olimpista/components/inscripcion3/inscripcion3.component';
import { HomeAreaComponent } from './olimpista/pages/home-area/home-area.component';
//import { DatosPostulanteComponent } from './olimpista/pages/datosPostulante-page.component.ts/datosPostulante-page.component';



export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("./auth/auth-routing.module").then(m => m.AuthRoutingModule),
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'products',
        loadChildren: () => import("./olimpista/estudiantes-routing.module").then(m => m.EstudiantesRoutingModule),
      },
      {
        path: 'areas',
        component: AreasComponent,
      },
    ]
  },
  // Rutas públicas
  {
    path: 'inicio/waba',
    component: Inicio1Component
  },
  {
    path: 'inicio/look',
    component: HomeAreaComponent
  },
  {
    path: 'inicio/dodog',
    component: Inicio3Component
  },
  {
    path: 'inscripcion/paso1',
    component: Inscripcion1Component
  },
  {
    path: 'inscripcion/paso2',
    component: Inscripcion2Component

  },
  {
    path: 'inscripcion/paso3',
    component: Inscripcion3Component

  },
  {
    path: 'inicio/OlimpistaForm',
    component: OlimpistaPageComponent
  },
  { path: 'inicio2', component: Inicio2Component },
  
  /*
  {
    path: 'inicio/datosPostulante',
    component: DatosPostulanteComponent
  },*/
  // Ruta por defecto (opcional)
  {
    path: '',
    redirectTo: 'inicio/waba',
    pathMatch: 'full'
  },
  // Ruta de respaldo para cualquier otra ruta no encontrada
  {
    path: '**',
    redirectTo: 'inicio/waba'
  }
];
