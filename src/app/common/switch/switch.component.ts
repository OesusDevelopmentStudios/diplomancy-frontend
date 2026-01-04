import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-switch',
    imports: [FormsModule],
    templateUrl: './switch.component.html',
    styleUrl: './switch.component.css'
})

export class SwitchComponent
{
    state = model(false);
    size = input.required<string>();
}
