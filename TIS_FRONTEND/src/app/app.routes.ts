import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AreasComponent } from './olimpista/pages/areas/areas.component';

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
        path: 'areas', // Ruta para el componente AreasComponent
        component: AreasComponent, // Usa el componente directamente
      },
    ]
  },
];
