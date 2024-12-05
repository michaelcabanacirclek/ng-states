import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";

import { routes } from "./app.routes";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideEffects } from "@ngrx/effects";

import { provideStore as provideNgxsStore } from "@ngxs/store";
import { withNgxsReduxDevtoolsPlugin } from "@ngxs/devtools-plugin";
import { UserStore } from "./users/stores/ngxs-store/user.store";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(),
    provideNgxsStore([UserStore], withNgxsReduxDevtoolsPlugin()),
  ],
};
