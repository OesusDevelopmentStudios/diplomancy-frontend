import { NgClass } from '@angular/common';
import { Component, OnInit, model } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';

import { tokenStorageKey } from '../../common/common.data';
import { decrypt, validateEmail } from '../../common/common.helpers';

import { SettingsItemComponent } from './settings-item/settings-item.component';
import { SwitchComponent } from '../../common/switch/switch.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-settings',
    imports: [NgClass, FormsModule, TranslatePipe, SettingsItemComponent, SwitchComponent],
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit
{
    settingsOpen = model.required<boolean>();

    token : String = "";
    cookiesEnabled: boolean = false;
    user_email: String = "us******le.com";

    emailOk: boolean = true;
    emailPasswordOk: boolean = true;
    passwordOk: boolean = true;
    newPasswordOk: boolean = true;
    repeatPasswordOk: boolean = true;

    newEmail: string = '';
    password: string = '';
    newPassword: string = '';
    repeatPassword: string = '';

    ngOnInit()
    {
        const token = sessionStorage.getItem(tokenStorageKey)
        decrypt(token ? token : '').then(decryptedToken => {
            this.token = decryptedToken;
        });

        this.loadSettings();
    }

    loadSettings(): void
    {
        const cookiesEnabled = localStorage.getItem('cookies_enabled');
        if (cookiesEnabled)
        {
            this.cookiesEnabled = cookiesEnabled === 'true';
        }

        // TODO: Load email from database
        const email = 'example@mail.net';
        this.user_email = email.substring(0, 2) + '****' + email.substring(email.indexOf('@'));
    }

    showSettings(): boolean
    {
        return this.settingsOpen();
    }

    changeCookiesSetting(): void
    {
        this.cookiesEnabled = !this.cookiesEnabled;
        if (this.cookiesEnabled)
        {
            localStorage.setItem('cookies_enabled', 'true');
        }
        else
        {
            localStorage.setItem('cookies_enabled', 'false');
            this.wipeCookies();
        }
    }

    close(): void
    {
        this.settingsOpen.set(false);
    }

    logout(): void
    {
        if (this.cookiesEnabled)
        {
            document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }

        sessionStorage.removeItem(tokenStorageKey);
        window.location.reload();
    }

    changeEmail(): void
    {
        this.resetEmail();
        if (!validateEmail(this.newEmail))
        {
            this.emailOk = false;
            return;
        }

        // TODO: Verify password and update email in database
        // For now just simulate failure
        this.emailPasswordOk = false;

        // TODO: On validation success, update email in database and update displayed email
    }

    resetEmail(): void
    {
        this.emailOk = true;
        this.emailPasswordOk = true;
    }

    changePassword(): void
    {
        this.resetPassword();
        // TODO: Validate new password strength and match, verify old password, and update in database
        // For now just simulate failure
        this.passwordOk = false;
        this.newPasswordOk = false;
        this.repeatPasswordOk = false;
    }

    resetPassword(): void
    {
        this.emailOk = true;
        this.passwordOk = true;
        this.newPasswordOk = true;
        this.repeatPasswordOk = true;
    }

    wipeCookies(): void
    {
        document.cookie.split(';').forEach(cookie => {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });
    }
}
