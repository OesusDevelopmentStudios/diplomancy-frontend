import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { supportedLanguages, defaultLanguage, tokenStorageKey } from '../common/common.data';
import { loadLanguage, decrypt, changeLanguage } from '../common/common.helpers';
import { Country } from '../common/enums/common.enums.country';
import { Phase } from '../common/enums/common.enums.phase';
import { Game } from './data/dashboard.data.game';

import { SidebarComponent } from './children/sidebar/sidebar.component';
import { SettingsComponent } from './children//settings/settings.component';
import { DashItemComponent } from './children//dash-item/dash-item.component';
import { SearchComponent } from './children/search/search.component';

@Component({
    selector: 'app-dashboard',
    imports: [TranslateModule, FormsModule, SidebarComponent, SettingsComponent, DashItemComponent, SearchComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit
{
    showSettings: boolean = false;
    showSearch: boolean = false;
    gameData: Game[] = [];

    private token: String | null = null;

    /* Dummy data for items, replace with actual data from server */
    countries: Country[] = [Country.NOR, Country.SWE, Country.RUS, Country.GER, Country.FRA, Country.SPA, Country.ITA,
                            Country.GBR, Country.AUT_HUN, Country.OTT_EMP];
    phases: Phase[] = [Phase.MOVE, Phase.RETREAT, Phase.REINFORCE];
    /* Dummy data end */

    constructor(public translate : TranslateService, private router: Router)
    {
        this.translate.addLangs(supportedLanguages);
        this.translate.setFallbackLang(defaultLanguage);

        // TODO: Dummy game data, replace with actual data from server
        for (let i = 0; i < 10; i++)
        {
            const country = this.countries[Math.floor(Math.random() * this.countries.length)];
            const phase = this.phases[Math.floor(Math.random() * this.phases.length)];
            const unreadCount: number = Math.floor(Math.random() * 3);
            const deadline = new Date((new Date().getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000));

            this.gameData.push(new Game('game' + (i + 1), 'Game Name ' + (i + 1), deadline, country, phase, unreadCount,
                Math.floor(Math.random() * 10), Math.random() < 0.5));
        }
        // Dummy data end TODO: Replace with fetching from server

        this.sortByDeadline();
    }

    sortByDeadline(): void
    {
        this.gameData.sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
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

    manageSearch(): void
    {
        this.showSearch = !this.showSearch;
    }

    validateToken(token: string): void
    {
        // TODO: Validate token with server
        console.log('Validating token:', token);
        const valid: boolean = true; // Placeholder for actual validation result

        if (!valid || token === '')
        {
            this.router.navigate(['/']);
        }
        // Token is valid
        this.token = token;
        // Token is invalid
    }

    onGameSelected(gameId: string): void
    {
        this.router.navigate(['/game', gameId]);
    }

    changeLanguage(lang: string): void
    {
        changeLanguage(this.translate, lang);
    }

    createNewGame(): void
    {
        this.router.navigate(['/create']);
    }
}
