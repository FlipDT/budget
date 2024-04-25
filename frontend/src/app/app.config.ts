import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideCharts,
  withDefaultRegisterables,
  } from 'ng2-charts';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { baseUrl } from './services/base-url.interceptor';
import { provideToastr } from 'ngx-toastr';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialog,
} from '@angular/material/dialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideCharts(withDefaultRegisterables()),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideToastr(),
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    provideHttpClient(withFetch(), withInterceptors([baseUrl])),
  ],
};
