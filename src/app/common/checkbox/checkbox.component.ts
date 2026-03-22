import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.css'],
    imports: [FormsModule]
})

export class CheckboxComponent
{

    isChecked : boolean = false;

    onClick()
    {
        this.isChecked = !this.isChecked;
    }
}
