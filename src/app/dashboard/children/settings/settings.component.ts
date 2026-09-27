import { NgClass } from '@angular/common';
import { Component, OnInit, effect, input, model, output, inject } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';

import { apiBaseUrl, tokenStorageKey } from '../../../common/common.data';
import { deleteCookie, validateEmail } from '../../../common/common.helpers';

import { SwitchComponent } from '../../../common/components/switch/switch.component';

import { SettingsItemComponent } from '../settings-item/settings-item.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-settings',
    imports: [NgClass, FormsModule, TranslatePipe, SettingsItemComponent, SwitchComponent],
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit
{
    token = input.required<string|null>();
    settingsOpen = model.required<boolean>();
    onLanguageChange = output<string>();

    cookiesEnabled: boolean = false;
    emailNotificationsEnabled: boolean = false;
    user_email: String = "us******le.com";

    sectionEmailOpen: boolean = false;
    sectionPasswordOpen: boolean = false;
    sectionDangerOpen: boolean = false;

    emailOk: boolean = true;
    emailPasswordOk: boolean = true;
    passwordOk: boolean = true;
    newPasswordOk: boolean = true;
    repeatPasswordOk: boolean = true;
    removeAccountPasswordOk: boolean = true;

    newEmail: string = '';
    password: string = '';
    newPassword: string = '';
    repeatPassword: string = '';

    confirmAccountDeletionAction: boolean = false;

    private http = inject(HttpClient)

    constructor()
    {
        effect(() => {
            if (!this.settingsOpen())
            {
                this.sectionEmailOpen = false;
                this.sectionPasswordOpen = false;
                this.sectionDangerOpen = false;
                this.confirmAccountDeletionAction = false;
                this.removeAccountPasswordOk = true;
            }

            if (this.token())
            {
                this.getDataFromBackend();
            }
        });
    }

    getDataFromBackend(): void
    {
        console.log("Fetching data from backend: " + this.token())
        // TODO: impl

        // TODO: Load email from database
        const email = 'example@mail.net';
        this.user_email = email.substring(0, 2) + '****' + email.substring(email.indexOf('@'));

        // Load email notifications setting from database, for now just set to false
        this.emailNotificationsEnabled = false;
    }

    ngOnInit()
    {
        this.loadSettings();
    }

    loadSettings(): void
    {
        const cookiesEnabled = localStorage.getItem('cookies_enabled');
        if (cookiesEnabled)
        {
            this.cookiesEnabled = cookiesEnabled === 'true';
        }
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

    changeEmailNotificationsSetting(): void
    {
        this.emailNotificationsEnabled = !this.emailNotificationsEnabled;
        // TODO: Sent new preference to backend and update in database
    }

    close(): void
    {
        console.log("Token is: " + this.token())

        this.settingsOpen.set(false);
        this.sectionEmailOpen = false;
        this.sectionPasswordOpen = false;
        this.sectionDangerOpen = false;
        this.confirmAccountDeletionAction = false;
        this.removeAccountPasswordOk = true;
    }

    logout(): void
    {
        if (this.cookiesEnabled)
        {
            deleteCookie(tokenStorageKey)
        }

        sessionStorage.removeItem(tokenStorageKey);
        const json = {"token": this.token()}
        this.http.post(`${apiBaseUrl}/auth/logout`, json).subscribe({
            next: (_) => { this.finalizeLogout(); },
            error: (_) => {
                console.error("Failed to close session cleanly!");
                this.finalizeLogout();
            }
        })
    }

    finalizeLogout()
    {
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

    changeLanguage(lang: string): void
    {
        this.onLanguageChange.emit(lang);
    }

    startAccountDeletion(): void
    {
        this.confirmAccountDeletionAction = true;
    }

    cancelAccountDeletion(): void
    {
        this.confirmAccountDeletionAction = false;
        this.removeAccountPasswordOk = true;
    }

    removeAccount(): void
    {
        // TODO: Verify password
        this.removeAccountPasswordOk = false;
        if (!this.removeAccountPasswordOk)
        {
            return;
        }
        // TODO: Send deletion request to the backend, wipe all data and log out on success

        // this.wipeCookies();
        // this.logout();
    }
}
