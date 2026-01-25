import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

import { TranslatePipe } from '@ngx-translate/core';

import { SwitchComponent } from '../../common/switch/switch.component';
import { tokenStorageKey } from '../../common/common.data';
import { decrypt } from '../../common/common.helpers';

import { Friend } from './sidebar.friend';
import { of } from 'rxjs';

@Component({
    selector: 'app-sidebar',
    imports: [TranslatePipe, NgClass, SwitchComponent],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit
{
    sidebarOpen: boolean = false;
    showBlacklist: boolean = false;
    matchedFriends: Friend[] = [];
    matchedEnemies: Friend[] = []

    token : String = "";

    private friends: Friend[] = [];
    private enemies: Friend[] = [];
    private filter: string = "";

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
        this.filterData();
    }

    refreshFriends(): void
    {
        // TODO: Fetch friends status from server, for refresh will just display random dummy data
        for (let i = 0; i < 25; i++)
        {
            this.friends.push(new Friend(i, 'Friend ' + (i + 1), Math.random() < 0.5));
        }

        this.filterData();
    }

    removeFriend(id: number): void
    {
        // TODO: Update friendlist in the backend
        if (this.matchedFriends.at(id))
        {
            const uniqueId = this.matchedFriends.at(id)?.id;
            const friendIndex = this.friends.findIndex(friend => friend.id === uniqueId);
            this.friends.splice(friendIndex, 1);
        }

        this.filterData();
    }

    addToBlackList(id: number): void
    {
        // TODO: Update firndlist and blacklist in backend
        const friend = this.matchedFriends.at(id);
        if (!friend)
        {
            return;
        }

        this.enemies.push(friend);
        const uniqueId = this.matchedFriends.at(id)?.id;
        const friendIndex = this.friends.findIndex(friend => friend.id === uniqueId);
        this.friends.splice(friendIndex, 1);
        this.filterData();
    }

    removeFromBlacklist(id: number)
    {
        if (this.matchedEnemies.at(id))
        {
            const uniqueId = this.matchedEnemies.at(id)?.id;
            const enemyIndex = this.enemies.findIndex(enemy => enemy.id === uniqueId);
            this.enemies.splice(enemyIndex, 1);
        }

        this.filterData();
    }

    getFriendClass(list: Friend[], index: number): string
    {
        console.error("Getting class for index " + index + " in list of length " + list.length);
        if (list.length == 1) return "single";
        if (index == 0) return "first";
        if (index == list.length - 1) return "last";

        return "middle";
    }

    onSearchInput(text: string): void
    {
        this.filter = text.toLowerCase();
        this.filterData();
    }

    filterData(): void
    {
        console.info("Current mode: " + (this.showBlacklist ? "Blacklist" : "Friendslist"));
        if (this.filter.length == 0)
        {
            this.matchedFriends = this.friends;
            this.matchedEnemies = this.enemies;
            return;
        }

        console.warn("Filtering friends: "  + this.filter);
        for (const enemy of this.enemies)
        {
            console.log(enemy.username.toLocaleLowerCase());
        }

        this.matchedFriends = this.friends.filter(friend => friend.username.toLowerCase().includes(this.filter));
        this.matchedEnemies = this.enemies.filter(enemy => enemy.username.toLowerCase().includes(this.filter));

        console.warn("Matched friends: " + this.matchedEnemies.length);
        for (const enemy of this.matchedEnemies)
        {
            console.log(enemy.username);
        }
    }
}
