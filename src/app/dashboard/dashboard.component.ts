import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { supportedLanguages, defaultLanguage, tokenStorageKey } from '../common/common.data';
import { loadLanguage, decrypt, changeLanguage } from '../common/common.helpers';
import { Country } from '../common/enums/common.enums.country';
import { Phase } from '../common/enums/common.enums.phase';
import { GameData } from '../common/common.game';
import { Message } from '../common/common.message';

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
            let unread : Message[] = [];
            for (let j = 0; j < unreadCount; j++)
            {
                unread.push(this.getDummyMessage('msg' + i + '-' + j, country));
            }

            const messagesCount: number = Math.floor(Math.random() * 10);
            let messages : Message[] = [];
            for (let j = 0; j < messagesCount; j++)
            {
                messages.push(this.getDummyMessage('msg' + i + '-' + j, country));
            }

            const deadline = new Date((new Date().getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000));
            this.gameData.push(new GameData('game' + (i + 1), 'Game Name ' + (i + 1), deadline, country, phase, unread,
                messages, Math.floor(Math.random() * 10), Math.random() < 0.5));
        }
        // Dummy data end TODO: Replace with fetching from server

        this.sortByDeadline();
    }

    // Helper function for random data
    getDummyMessage(id: string, self: Country): Message
    {
        const past = new Date((new Date().getDate() - 6)).getTime();
        const date = new Date(past + Math.random() * (new Date().getTime() - past));
        let from: Country = self;
        while (from === self)
        {
            from = this.countries[Math.floor(Math.random() * this.countries.length)];
        }

        return new Message(id, from, date);
    }
    // TODO: To remove

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
}
