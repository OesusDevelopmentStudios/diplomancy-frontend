import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

import { TranslatePipe } from '@ngx-translate/core';

import { SwitchComponent } from '../../common/switch/switch.component';
import { tokenStorageKey } from '../../common/common.data';
import { decrypt } from '../../common/common.helpers';

import { Friend } from './sidebar.friend';

@Component({
    selector: 'app-sidebar',
    imports: [TranslatePipe, NgClass, SwitchComponent],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit
{
    sidebarOpen: boolean = false;
    friends: Friend[] = [];
    enemies: Friend[] = [];
    showBlacklist: boolean = false;

    token : String = "";

    ngOnInit()
    {
        const token = sessionStorage.getItem(tokenStorageKey)
        decrypt(token ? token : '').then(decryptedToken => {
            this.token = decryptedToken;
        });
    }

    toggleSidebar(): void
    {
        this.sidebarOpen = !this.sidebarOpen;
    }

    refresghFriends(): void
    {
        // TODO: Fetch friends status from server, for refresh will just display random dummy data
        for (let i = 0; i < 25; i++)
        {
            this.friends.push(new Friend('Friend ' + (i + 1), Math.random() < 0.5));
        }
    }

    removeFriend(id: number): void
    {
        // TODO: Update friendlist in the backend
        if (this.friends.at(id))
        {
            this.friends.splice(id, 1);
        }
    }

    addToBlackList(id: number): void
    {
        // TODO: Update firndlist and blacklist in backend
        const friend = this.friends.at(id);
        if (!friend)
        {
            return;
        }

        this.enemies.push(friend);
        this.friends.splice(id, 1);
    }

    removeFromBlacklist(id: number)
    {
        if (this.enemies.at(id))
        {
            this.enemies.splice(id, 1);
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
