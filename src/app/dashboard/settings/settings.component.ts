import { Component, InputSignal, OnInit, input } from '@angular/core';

import { tokenStorageKey } from '../../common/common.data';
import { decrypt } from '../../common/common.helpers';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit
{
    settingsOpen: InputSignal<boolean> = input.required<boolean>();

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
}
