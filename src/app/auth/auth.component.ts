import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { supportedLanguages, defaultLanguage } from '../common/common.data';
import { changeLanguage, loadLanguage } from '../common/common.helpers';

@Component({
    selector: 'app-auth',
    imports: [TranslateModule, NgClass, FormsModule],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css'
})

export class AuthComponent implements OnInit
{
    mode: string = 'login';
    usernameOk: boolean = true;
    emailOk: boolean = true;
    passwordOk: boolean = true;

    usernameMsg: string = 'Translation error';
    emailMsg: string = 'Translation error';
    passwordMsg: string = 'Translation error';

    inUsername: string = '';
    inEmail: string = '';
    inPassword: string = '';
    rememberMe: boolean = false;

    translationSubGuard: Subscription

    constructor(private translate : TranslateService, private router: Router)
    {
        this.translate.addLangs(supportedLanguages);
        this.translate.setFallbackLang(defaultLanguage);

        this.translationSubGuard = translate.stream('auth').subscribe((auth: any) => {
            this.usernameMsg = auth.invalid_username;
            this.emailMsg = auth.invalid_email;
            this.passwordMsg = auth.invalid_password;
        });
    }

    ngOnInit(): void
    {
        loadLanguage(this.translate);
        this.loadTokenAndRedirect();
    }

    loadTokenAndRedirect(): void
    {
        const token: String = document.cookie;
        if (!token)
        {
            return
        }

        // TODO: Validate token with server
        // this.router.navigate(['/dashboard', this.translate.getCurrentLang()]);
        console.log('Existing token:', token);
        sessionStorage.setItem('token', token.toString());
    }

    changeLanguage(lang: string): void
    {
        changeLanguage(this.translate, lang);
    }

    switchMode(mode: string): void
    {
        if (this.mode === mode) return;

        this.usernameOk = true;
        this.emailOk = true;
        this.passwordOk = true;
        this.mode = mode;
    }

    onKeyPress(): void
    {
        if (this.mode === 'login')
        {
            this.validateLogin();
        }
        else
        {
            this.validateLogon();
        }
    }

    validateLogin(): void
    {
        this.usernameOk = true;
        this.emailOk = true;
        this.passwordOk = true;

        // TODO: Placeholder for real authentication logic
        console.log('Remember me:', this.rememberMe);
        console.log('Logging in with', this.inUsername, this.inPassword);

        if (this.rememberMe)
        {
            // TODO: Replace with real token from server
            const token = 'PLACEHOLDER_AUTH_TOKEN';
            const date = new Date();
            date.setDate(date.getDate() + 30);
            console.log('Token will expire on:', date.toUTCString());
            document.cookie = `${token}; expires=${date.toUTCString()}; path=/`; // TODO: secure; <- add this in production with HTTPS
        }

        //this.router.navigate(['/dashboard']);
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
