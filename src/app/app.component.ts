import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, TranslateModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent
{
    title: string = 'diplomancy';

    private supportedLanguages: Array<string> = ['en', 'pl'];
    private defaultLanguage: string = 'en';

    constructor(private translate : TranslateService)
    {
        this.translate.addLangs(this.supportedLanguages);
        this.translate.setFallbackLang(this.defaultLanguage);

        const browserLang: string | undefined = this.translate.getBrowserLang();
        this.translate.use(
            browserLang && this.supportedLanguages.includes(browserLang)
                ? browserLang
                : this.defaultLanguage
        );
    }

    changeLanguage(lang: string): void
    {
        if (this.supportedLanguages.includes(lang))
        {
            this.translate.use(lang);
        }
    }
}
