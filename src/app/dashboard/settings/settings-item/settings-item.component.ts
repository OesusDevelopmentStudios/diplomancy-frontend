import { Component, input, model, output } from '@angular/core';

@Component({
    selector: 'app-settings-item',
    imports: [],
    templateUrl: './settings-item.component.html',
    styleUrl: './settings-item.component.css'
})

export class SettingsItemComponent
{
    title = input.required<string>();

    deployed = model.required<boolean>();

    onClick = output<void>();

    toggle(): void
    {
        this.deployed.set(!this.deployed());
        this.onClick.emit();
    }
}
