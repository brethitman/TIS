import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { Inicio1Component } from './olimpista/pages/inicio1/inicio1.component';
import { Inicio3Component } from './olimpista/pages/inicio3/inicio3.component';
import { OlimpiadaPageComponent } from './olimpista/pages/olimpiada-page/olimpiada-page.component';
import { Inicio5ReportesComponent } from './olimpista/pages/inicio5-reportes/inicio5-reportes.component';//pagina de reportes
// Importa tus nuevos componentes de inscripción
import { VistaAreasCategoriasComponent } from './olimpista/components/vista-areas-categorias/vista-areas-categorias.component';
import { VentanaInformacionOlimpiadaComponent } from './olimpista/pages/ventana-informacion-olimpiada/ventana-informacion-olimpiada.component';
import { VisualizacionListaComponent } from './olimpista/pages/visualizacion-lista/visualizacion-lista.component';
import { InscripcionTodoComponent } from './olimpista/components/inscripcion-todo/inscripcion-todo.component';

import { PruebaOcrComponent } from './olimpista/components/prueba-ocr/prueba-ocr.component';

export const routes: Routes = [

  { path: 'prueba-ocr', component: PruebaOcrComponent },
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
      /*{
        path: 'products', // Revisa si 'products' es el nombre correcto para esta sección en tu app
        loadChildren: () => import("./olimpista/estudiantes-routing.module").then(m => m.EstudiantesRoutingModule),
      },*/
      {
        path: 'olimpiada',
        component: OlimpiadaPageComponent
      },
      // Si tienes más rutas de admin, añádelas aquí
      {
        path: '', // Ruta por defecto para /admin
        redirectTo: 'olimpiada', // O a donde quieras que redirija por defecto
        pathMatch: 'full'
      }
     ]
   },

  // --- Rutas de Inscripción ---
  
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
    path: 'inicio/dodog', // Esta ruta está duplicada en tu configuración original
    component: Inicio3Component
  },
  // {  // Removida la ruta duplicada
  //     path: 'inicio/dodog',
  //     component: Inicio3Component
  // },

{
  path: 'inicio/look/wach/:id',
  component: VistaAreasCategoriasComponent
  // Puedes añadir guards o resolvers si son necesarios
},

{ 
  path: 'ventana-informacion-olimpiada/:id', 
  component: VentanaInformacionOlimpiadaComponent 
},
{
  path: 'inicio/Olimpiada/:id/Visualizacion', // Esta ruta está duplicada en tu configuración original
  component: VisualizacionListaComponent
},
{
  path: 'inicio/look/inscripcion-todo/:id',
  component: InscripcionTodoComponent,
  data: { title: 'Formulario de Inscripción' }
},

  // Ruta por defecto
  {
    path: '',
    redirectTo: 'inicio/waba', // O podrías cambiarlo a 'inscripcion/paso1' si quieres que el inicio sea el formulario
    pathMatch: 'full'
  },

 

{
  path: '',
  redirectTo: 'admin/olimpiada', // Ahora redirigimos directamente al panel de admin
  pathMatch: 'full'
},


{
  path: 'inicio/look/inscripcion-todo/:id',
  component: InscripcionTodoComponent,
  data: { title: 'Formulario de Inscripción' }
},
{ 
  path: 'ventana-informacion-olimpiada/:id', 
  component: VentanaInformacionOlimpiadaComponent 
},

{
  path: '**',
  redirectTo: 'admin/olimpiada'
}



];