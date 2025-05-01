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
import { Inicio4Component } from './olimpista/pages/inicio4/inicio4.component';

// Importa tus nuevos componentes de inscripción
import { Iscripcion1Component } from './olimpista/components/iscripcion1/iscripcion1.component';
import { Iscripcion2Component } from './olimpista/components/iscripcion2/iscripcion2.component';
import { Iscripcion3Component } from './olimpista/components/iscripcion3/iscripcion3.component';
import { VistaAreasCategoriasComponent } from './olimpista/components/vista-areas-categorias/vista-areas-categorias.component';
import { VisualizacionListaComponent } from './olimpista/pages/visualizacion-lista/visualizacion-lista.component';


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
        path: 'products', // Revisa si 'products' es el nombre correcto para esta sección en tu app
        loadChildren: () => import("./olimpista/estudiantes-routing.module").then(m => m.EstudiantesRoutingModule),
      },
      {
        path: 'areas',
        component: AreasComponent,
      },
      // Si tienes más rutas de admin, añádelas aquí
      {
        path: '', // Ruta por defecto para /admin
        redirectTo: 'products', // O a donde quieras que redirija por defecto
        pathMatch: 'full'
      }
    ]
  },

  // --- Rutas de Inscripción ---
  {
    path: 'inscripcion/paso1',
    component: Iscripcion1Component
  },
  {
    path: 'inscripcion/paso2',
    component: Iscripcion2Component
  },
  {
    path: 'inscripcion/paso3',
    component: Iscripcion3Component
  },
  // Opcional: Redirigir '/inscripcion' al paso 1
  {
    path: 'inscripcion',
    redirectTo: 'inscripcion/paso1',
    pathMatch: 'full'
  },
  // --- Fin Rutas de Inscripción ---


  // Rutas públicas (las que ya tenías)
  {
    path: 'inicio/waba',
    component: Inicio1Component
  },
  {
    path: 'inicio/look',
    component: Inicio2Component
  },
  {
    path: 'inicio/dodog', // Esta ruta está duplicada en tu configuración original
    component: Inicio3Component
  },
  {
    path: 'inicio/Olimpiada/1/Visualizacion', // Esta ruta está duplicada en tu configuración original
    component: VisualizacionListaComponent
  },

  // {  // Removida la ruta duplicada
  //     path: 'inicio/dodog',
  //     component: Inicio3Component
  // },
  {
    path: 'inicio/mmmm',
    component: Inicio4Component
  },
  {
    path: 'inicio/OlimpistaForm', // Revisa si este es el nombre final para esta ruta
    component: OlimpistaPageComponent
  },

  {
    path: 'inicio/look/wach/:id',
    component: VistaAreasCategoriasComponent
    // Puedes añadir guards o resolvers si son necesarios
  },


  // Ruta por defecto
  {
    path: '',
    redirectTo: 'inicio/waba', // O podrías cambiarlo a 'inscripcion/paso1' si quieres que el inicio sea el formulario
    pathMatch: 'full'
  },

  // Ruta de respaldo para cualquier otra ruta no encontrada
  {
    path: '**',
    redirectTo: 'inicio/waba'
  },

];
