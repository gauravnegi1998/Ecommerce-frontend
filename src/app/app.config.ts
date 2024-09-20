import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

// importProvidersFrom([
//   ProductPageModules
// ]),

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withInMemoryScrolling({
        scrollPositionRestoration: "top",
      })),
    provideClientHydration(), provideAnimationsAsync(), provideHttpClient(), provideToastr(),
    // importProvidersFrom(LucideAngularModule.pick({ Eye }))
  ],
};
