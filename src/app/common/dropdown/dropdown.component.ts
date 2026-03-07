import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-dropdown',
    imports: [],
    template: './dropdown.component.html',
    styleUrl: './dropdown.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DropdownComponent
{}
