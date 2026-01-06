import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { supportedLanguages, defaultLanguage, tokenStorageKey } from '../common/common.data';
import { loadLanguage, decrypt, changeLanguage } from '../common/common.helpers';
import { SwitchComponent } from '../common/switch/switch.component';

import { Friend } from './dashboard.friend';

@Component({
    selector: 'app-dashboard',
    imports: [TranslateModule, NgClass, FormsModule, SwitchComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit
{
    sidebarOpen: boolean = false;
    friends: Friend[] = [];
    enemies: Friend[] = [];
    showBlacklist: boolean = false;

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

    refresghFriends(): void
    {
        // TODO: Fetch friends status from server, for refresh will just display random dummy data
        for (let i = 0; i < 1; i++)
        {
            this.friends.push(new Friend('Friend with a long ass name test' + (i + 1), Math.random() < 0.5));
        }
    }

    getFriendClass(list: Friend[], index: number): string
    {
        if (list.length == 1) return "single";
        if (index == 0) return "first";
        if (index == list.length - 1) return "last";
        return "middle";
    }
}
