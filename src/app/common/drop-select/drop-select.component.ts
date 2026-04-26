import { Component, input, OnChanges, output } from '@angular/core';

import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
    selector: 'app-drop-select',
    imports: [CheckboxComponent],
    templateUrl: './drop-select.component.html',
    styleUrls: ['./drop-select.component.css']
})

export class DropSelectComponent implements OnChanges
{
    items = input.required<Array<string>>();
    default = input<Array<number>>([]);
    text = input<string>("{}");
    selected = output<Array<number>>();

    selectedElements: Array<number> = [];
    width: string = "100px"

    ngOnInit(): void
    {
        this.selectedElements = this.default();
    }

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

    onSelected(index: number, selected: boolean): void
    {
        let changed: boolean = false;
        if (selected && !this.selectedElements.includes(index))
        {
            this.selectedElements.push(index);
            changed = true;
        }
        else if (!selected && this.selectedElements.includes(index))
        {
            this.selectedElements = this.selectedElements.filter((v): boolean => v !== index);
            changed = true;
        }

        if (changed)
        {
            this.selected.emit(this.selectedElements);
        }
    }
}
