import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-auth',
    imports: [TranslateModule, NgClass],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css'
})
export class AuthComponent
{
    title: string = 'diplomancy';
    mode: string = 'login';
    usernameOk: boolean = true;
    emailOk: boolean = true;
    passwordOk: boolean = true;

    private supportedLanguages: Array<string> = ['en', 'pl'];
    private defaultLanguage: string = 'en';


    constructor(private translate : TranslateService, private router: Router)
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

    switchMode(mode: string): void
    {
        this.usernameOk = true;
        this.emailOk = true;
        this.passwordOk = true;
        this.mode = mode;
    }

    validateLogin(): void
    {
        this.usernameOk = true;
        this.emailOk = true;
        this.passwordOk = true;

        this.router.navigate(['/dashboard', "token123"]);
    }

    validateLogon(): void
    {
        this.usernameOk = false;
        this.emailOk = false;
        this.passwordOk = true;
    }
}
