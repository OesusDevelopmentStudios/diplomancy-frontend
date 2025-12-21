import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { supportedLanguages, defaultLanguage, tokenStorageKey } from '../common/common.data';
import { loadLanguage } from '../common/common.helpers';


@Component({
    selector: 'app-game',
    imports: [TranslateModule],
    templateUrl: './game.component.html',
    styleUrl: './game.component.css'
})

export class GameComponent implements OnInit
{
    private token: String | null = null;

    constructor(private translate : TranslateService, private router: Router)
    {
        this.translate.addLangs(supportedLanguages);
        this.translate.setFallbackLang(defaultLanguage);
    }

    ngOnInit(): void
    {
        loadLanguage(this.translate);
        this.token = sessionStorage.getItem(tokenStorageKey);
        if (!this.token)
        {
            this.router.navigate(['/']);
            return;
        }
    }
}
