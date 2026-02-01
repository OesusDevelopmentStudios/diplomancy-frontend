import { Component, input } from '@angular/core';

@Component({
    selector: 'app-settings-item',
    imports: [],
    templateUrl: './settings-item.component.html',
    styleUrl: './settings-item.component.css'
})

export class SettingsItemComponent
{
    title = input.required<string>();

    deployed: boolean = false;
    arrow: string = "assets/arrow_down.png";

    toggle(): void
    {
        this.deployed = !this.deployed;
        this.arrow = this.deployed ? "assets/arrow_up.png" : "assets/arrow_down.png";
    }
}
