// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // Importa tu configuración de la aplicación
import { AppComponent } from './app/app.component'; // Importa tu componente raíz

// *** AGREGAR ESTAS LÍNEAS ***
// Importar las funciones y datos de localización necesarios
import { registerLocaleData } from '@angular/common';
import localeEsBo from '@angular/common/locales/es-BO'; // Datos para español de Bolivia

// A veces, para ciertos locales o funcionalidades avanzadas, también se necesita data extra:
// import localeEsBoExtra from '@angular/common/locales/extra/es-BO';

// Registrar los datos del locale
registerLocaleData(localeEsBo);
// Si importaste la data extra, regístrala también:
// registerLocaleData(localeEsBoExtra);
// ***************************

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

