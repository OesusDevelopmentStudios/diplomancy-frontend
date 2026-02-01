import { Component, OnInit, model } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';

import { tokenStorageKey } from '../../common/common.data';
import { decrypt } from '../../common/common.helpers';

import { SettingsItemComponent } from './settings-item/settings-item.component';

@Component({
    selector: 'app-settings',
    imports: [TranslatePipe, SettingsItemComponent],
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit
{
    settingsOpen = model.required<boolean>();

    token : String = "";

    ngOnInit()
    {
        const token = sessionStorage.getItem(tokenStorageKey)
        decrypt(token ? token : '').then(decryptedToken => {
            this.token = decryptedToken;
        });
    }

    showSettings(): boolean
    {
        return this.settingsOpen();
    }

    close(): void
    {
        this.settingsOpen.set(false);
    }
}
