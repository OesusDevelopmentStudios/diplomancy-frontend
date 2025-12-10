import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader"
import { provideTranslateService } from "@ngx-translate/core";
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = { providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
        lang: 'en',
        fallbackLang: 'en',
        loader : provideTranslateHttpLoader({
            prefix: '/locale/',
            suffix: '.json'
        })
    })
]};
