import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTranslateHttpLoader, TranslateHttpLoader } from "@ngx-translate/http-loader"
import { provideTranslateService, TranslateLoader, TranslateModule } from "@ngx-translate/core";
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
