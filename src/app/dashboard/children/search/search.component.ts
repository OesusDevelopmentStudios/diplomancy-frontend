import { Component, model } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';

import { CheckboxComponent } from '../../../common/checkbox/checkbox.component';

@Component({
    selector: 'app-search',
    imports: [CheckboxComponent, TranslatePipe],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})

export class SearchComponent
{
    showSearch = model.required<boolean>();

    close(): void
    {
        this.showSearch.set(false);
    }
}
