import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-settings-item',
    imports: [],
    templateUrl: './settings-item.component.html',
    styleUrl: './settings-item.component.css'
})

export class SettingsItemComponent
{
    title = input.required<string>();
    onClick = output<void>();

    deployed: boolean = false;
    arrow: string = "assets/arrow_down.png";

    toggle(): void
    {
        this.deployed = !this.deployed;
        this.arrow = this.deployed ? "assets/arrow_up.png" : "assets/arrow_down.png";
        this.onClick.emit();
    }
}
