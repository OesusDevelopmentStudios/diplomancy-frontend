import { Component, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { supportedLanguages, defaultLanguage, tokenStorageKey, apiBaseUrl } from '../common/common.data';
import { changeLanguage, decrypt, encrypt, loadLanguage, sleep, validateEmail, validatePassword } from '../common/common.helpers';
import { CheckboxComponent } from '../common/components/checkbox/checkbox.component';

@Component({
    selector: 'app-auth',
    imports: [TranslateModule, NgClass, FormsModule, CheckboxComponent],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css'
})

export class AuthComponent implements OnInit
{
    mode: string = 'login';
    usernameOk: boolean = true;
    emailOk: boolean = true;
    passwordOk: boolean = true;

    inUsername: string = '';
    inEmail: string = '';
    inPassword: string = '';
    rememberMe: boolean = false;

    showCookiesBanner: boolean = false;
    useCookies: boolean = false;

    private http = inject(HttpClient);

    constructor(private translate : TranslateService, private router: Router)
    {
        this.translate.addLangs(supportedLanguages);
        this.translate.setFallbackLang(defaultLanguage);

        const cookiesEnabled = localStorage.getItem('cookies_enabled');
        if (cookiesEnabled)
        {
            this.useCookies = cookiesEnabled === 'true';
        }
        else
        {
            this.showCookiesBanner = true;
        }
    }

    ngOnInit(): void
    {
        loadLanguage(this.translate);
        this.loadTokenAndRedirect();
    }

    loadTokenAndRedirect(): void
    {
        const token: string = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || '';
        if (!token)
        {
            return;
        }

        // TODO: Validate token with server
        decrypt(token).then(decryptedToken => {
            console.log('Decrypted token: ', decryptedToken);
        });
        // TODO: If not valid remove cookie
        // document.cookie = `token=; path=/`;

        sessionStorage.setItem(tokenStorageKey, token.toString());
        this.router.navigate(['/dashboard']);
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

        // TODO: Get token from server
        const token = 'PLACEHOLDER_AUTH_TOKEN';
        encrypt(token).then(encryptedToken => {
            this.login(encryptedToken);
        });
    }

    login(token: string): void
    {
        if (this.rememberMe && this.useCookies)
        {
            const date = new Date();
            date.setDate(date.getDate() + 30);
            console.log('Token will expire on:', date.toUTCString());
            document.cookie = `token=${token}; expires=${date.toUTCString()}; path=/`; // TODO: secure; <- add this in production with HTTPS
        }

        sessionStorage.setItem(tokenStorageKey, token);
        this.router.navigate(['/dashboard']);
    }

    async validateLogon(): Promise<void>
    {
        // Reset validation states
        this.emailOk = true;
        this.passwordOk = true;
        this.usernameOk = true;

        // Allow UI to update before performing validation
        await sleep(10);

        // Validate all data
        this.emailOk = validateEmail(this.inEmail);
        this.passwordOk = validatePassword(this.inPassword);
        this.usernameOk = this.inUsername.trim().length > 0;

        // Return if any validation failed
        if (!this.emailOk || !this.passwordOk || !this.usernameOk)
        {
            return;
        }

        this.logon()
    }

    logon()
    {
        const json = {"email": this.inEmail, "username": this.inUsername, "password": this.inPassword}
        this.http.post(`${apiBaseUrl}/auth/logon`, json).subscribe({
            next(data) { console.log("Response: ", data) },
            error(error) { console.error("Error: ", error) }
        });
    }

    reset(): void
    {
        this.usernameOk = true;
        this.emailOk = true;
        this.passwordOk = true;
    }

    switchCookiesConsent(consent: boolean): void
    {
        this.useCookies = consent;
        localStorage.setItem('cookies_enabled', consent.toString());
        this.showCookiesBanner = false;
    }
}
