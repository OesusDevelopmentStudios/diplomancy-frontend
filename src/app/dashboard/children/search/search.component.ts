import { Component, model } from '@angular/core';

import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { CheckboxComponent } from '../../../common/checkbox/checkbox.component';
import { DropdownComponent } from '../../../common/dropdown/dropdown.component';

import { GameMode, gameModeAsText } from '../../../common/enums/common.enums.game-mode';

@Component({
    selector: 'app-search',
    imports: [CheckboxComponent, DropdownComponent, TranslatePipe],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})

export class SearchComponent
{
    showSearch = model.required<boolean>();

    gameModes: Array<GameMode> = [GameMode.ANY, GameMode.WW1]

    constructor(private translate: TranslateService) {}

    close(): void
    {
        this.showSearch.set(false);
    }

    updateMode(mode: string): void
    {
        console.log("Selected: " + mode)
    }

    gameModesAsText(): Array<string>
    {
        let result: Array<string> = []
        for (const mode of this.gameModes)
        {
            result.push(gameModeAsText(mode, this.translate))
        }

        return result;
    }
}
