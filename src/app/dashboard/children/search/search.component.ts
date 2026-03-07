import { Component, model } from '@angular/core';

@Component({
    selector: 'app-search',
    imports: [],
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
