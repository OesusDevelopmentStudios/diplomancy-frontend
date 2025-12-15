import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

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

    usernameMsg: string = 'Translation error';
    emailMsg: string = 'Translation error';
    passwordMsg: string = 'Translation error';

    private supportedLanguages: Array<string> = ['en', 'pl'];
    private defaultLanguage: string = 'en';
    private translationSubGuard: Subscription


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

        this.translationSubGuard = translate.stream('auth').subscribe((auth: any) => {
            this.usernameMsg = auth.invalid_username;
            this.emailMsg = auth.invalid_email;
            this.passwordMsg = auth.invalid_password;
        });
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
        if (this.mode === mode) return;

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

        this.router.navigate(['/dashboard', this.translate.getCurrentLang()]);
    }

    validateLogon(): void
    {
        this.usernameOk = false;
        this.emailOk = false;
        this.passwordOk = true;
    }

    reset(): void
    {
        this.usernameOk = true;
        this.emailOk = true;
        this.passwordOk = true;
    }
}
