import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { supportedLanguages, defaultLanguage, tokenStorageKey } from '../common/common.data';
import { loadLanguage, decrypt, changeLanguage } from '../common/common.helpers';
import { GameData } from '../common/common.game';

import { SidebarComponent } from './sidebar/sidebar.component';
import { SettingsComponent } from './settings/settings.component';
import { DashItemComponent } from './dash-item/dash-item.component';

@Component({
    selector: 'app-dashboard',
    imports: [TranslateModule, FormsModule, SidebarComponent, SettingsComponent, DashItemComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit
{
    showSettings: boolean = false;
    gameData: GameData[] = [];

    private token: String | null = null;

    constructor(public translate : TranslateService, private router: Router)
    {
        this.translate.addLangs(supportedLanguages);
        this.translate.setFallbackLang(defaultLanguage);

        // TODO: Dummy game data, replace with actual data from server
        for (let i = 0; i < 10; i++)
        {
            this.gameData.push(new GameData('game' + i, 'Game ' + (i + 1), Math.floor(Math.random() * 5)));
        }
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
