import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // provideRouter(routes, withPreloading(PreloadAllModules)),
    //withPreloading(PreloadAllModules) --> this we added for the preloading module.
    // ahiya mukel hse to app.routes.ts file ma jetla components na routes hse te bdha preload thy jse

    provideHttpClient(),
  ],
};
