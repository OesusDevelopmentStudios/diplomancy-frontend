import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { supportedLanguages, defaultLanguage, tokenStorageKey } from '../common/common.data';
import { loadLanguage, decrypt, changeLanguage } from '../common/common.helpers';

import { Friend } from './dashboard.friend';

@Component({
    selector: 'app-dashboard',
    imports: [TranslateModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit
{
    sidebarOpen: boolean = false;
    friends: Friend[] = [];

    private token: String | null = null;

    constructor(private translate : TranslateService, private router: Router)
    {
        this.translate.addLangs(supportedLanguages);
        this.translate.setFallbackLang(defaultLanguage);
    }

    ngOnInit(): void
    {
        loadLanguage(this.translate);
        const token = sessionStorage.getItem(tokenStorageKey)
        decrypt(token ? token : '').then(decryptedToken => {
            this.validateToken(decryptedToken);
        });
    }

    validateToken(token: string): void
    {
        // TODO: Validate token with server
        console.log('Validating token:', token);
        // Token is valid
        this.token = token;
        // Token is invalid
        // this.router.navigate(['/']);
    }

    changeLanguage(lang: string): void
    {
        changeLanguage(this.translate, lang);
    }

    toggleSidebar(): void
    {
        this.sidebarOpen = !this.sidebarOpen;
    }
}
