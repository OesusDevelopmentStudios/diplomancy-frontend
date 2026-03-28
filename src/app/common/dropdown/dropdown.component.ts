import { Component, input, OnChanges, output } from '@angular/core';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.css',
})

export class DropdownComponent implements OnChanges
{
    items = input.required<Array<string>>();
    default = input<number>(0);
    selected = output<string>();

    activeElement: number = this.default();
    width: string = "100px"

    ngOnChanges(): void
    {
        let length : number = 0;
        for (const item in this.items())
        {
            if (this.items()[item].length > length)
            {
                length = this.items()[item].length
            }
        }

        this.width = (14 * length).toString() + "px"
    }

    onSelected(index: number): void
    {
        this.activeElement = index;
        this.selected.emit(this.items().at(index)!);
    }
}
