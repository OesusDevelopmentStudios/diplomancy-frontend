import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.css',
})

export class DropdownComponent
{
    items = input.required<Array<string>>();
    default = input<number>(0);
    selected = output<string>();

    activeElement: number = this.default();
}
