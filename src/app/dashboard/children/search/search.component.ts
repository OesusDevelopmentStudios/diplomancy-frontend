import { Component, model } from '@angular/core';

import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { CheckboxComponent } from '../../../common/checkbox/checkbox.component';
import { DropdownComponent } from '../../../common/dropdown/dropdown.component';
import { DropSelectComponent } from '../../../common/drop-select/drop-select.component';

import { GameMode, gameModeAsText } from '../../../common/enums/common.enums.game-mode';
import { Country, countryAsText } from '../../../common/enums/common.enums.country';

@Component({
    selector: 'app-search',
    imports: [CheckboxComponent, DropdownComponent, DropSelectComponent, TranslatePipe],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})

export class SearchComponent
{
    showSearch = model.required<boolean>();

    mode: GameMode = GameMode.ANY;
    gameModes: Array<GameMode> = [GameMode.ANY, GameMode.WW1]
    ww1Countries: Array<number> = [Country.NOR, Country.SWE, Country.RUS, Country.GER, Country.FRA, Country.SPA,
                                   Country.ITA, Country.GBR, Country.AUT_HUN, Country.OTT_EMP]

    constructor(private translate: TranslateService) {}

    close(): void
    {
        this.showSearch.set(false);
    }

    updateMode(mode: number): void
    {
        this.mode = this.gameModes[mode];
        console.log("Selected: " + this.mode)
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

    updateCountries(countries: Array<number>): void
    {
        console.log("Selected: " + countries)
    }

    countriesAsText(): Array<string>
    {
        let result: Array<string> = []
        if (this.mode == GameMode.WW1 || this.mode == GameMode.ANY)
        {
            for (const country of this.ww1Countries)
            {
                result.push(countryAsText(this.ww1Countries[country], this.translate))
            }
        }

        return result;
    }
}
