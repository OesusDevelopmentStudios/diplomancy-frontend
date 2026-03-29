import { Component, input, OnInit, output } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.css'],
    imports: [FormsModule]
})

export class CheckboxComponent implements OnInit
{
    selected = input<boolean>(false);
    onChange = output<boolean>();
    isChecked : boolean = false;

    ngOnInit(): void {
        this.isChecked = this.selected();
    }

    onClick()
    {
        this.isChecked = !this.isChecked;
        this.onChange.emit(this.isChecked)
    }
}
