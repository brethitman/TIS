import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AreasComponent } from './olimpista/pages/areas/areas.component';
import { Inicio1Component } from './olimpista/pages/inicio1/inicio1.component';
import { Inicio2Component } from './olimpista/pages/inicio2/inicio2.component';
import { Inicio3Component } from './olimpista/pages/inicio3/inicio3.component';

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
  // Agrega estas nuevas rutas para las páginas de inicio
  {
    path: 'inicio/waba',
    component: Inicio1Component
  },
  {
    path: 'inicio/look',
    component: Inicio2Component
  },
  {
    path: 'inicio/dodog',
    component: Inicio3Component
  },
  // Ruta por defecto (opcional)
  {
    path: '',
    redirectTo: 'inicio/waba',
    pathMatch: 'full'
  }
];
