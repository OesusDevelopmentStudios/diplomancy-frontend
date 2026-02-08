import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { supportedLanguages, defaultLanguage, tokenStorageKey } from '../common/common.data';
import { loadLanguage, decrypt, changeLanguage } from '../common/common.helpers';

import { SidebarComponent } from './sidebar/sidebar.component';
import { SettingsComponent } from './settings/settings.component';

@Component({
    selector: 'app-dashboard',
    imports: [TranslateModule, FormsModule, SidebarComponent, SettingsComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit
{
    showSettings: boolean = false;

    private token: String | null = null;

    constructor(public translate : TranslateService, private router: Router)
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

    manageSettings(): void
    {
        this.showSettings = !this.showSettings;
    }

    validateToken(token: string): void
    {
        // TODO: Validate token with server
        console.log('Validating token:', token);
        const valid: boolean = true; // Placeholder for actual validation result

        if (!valid || token === '') {
            this.router.navigate(['/']);
        }
        // Token is valid
        this.token = token;
        // Token is invalid
    }

    changeLanguage(lang: string): void
    {
        changeLanguage(this.translate, lang);
    }
}
