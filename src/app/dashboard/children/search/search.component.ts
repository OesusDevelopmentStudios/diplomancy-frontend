import { Component, computed, effect, model } from '@angular/core';

import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { CheckboxComponent } from '../../../common/checkbox/checkbox.component';
import { DropdownComponent } from '../../../common/dropdown/dropdown.component';
import { DropSelectComponent } from '../../../common/drop-select/drop-select.component';

import { GameMode, gameModeAsText } from '../../../common/enums/common.enums.game-mode';
import { Country, countryAsText } from '../../../common/enums/common.enums.country';
import { SerachResult } from '../../data/dashboard.data.search-result';
import { Phase } from '../../../common/enums/common.enums.phase';

@Component({
    selector: 'app-search',
    imports: [CheckboxComponent, DropdownComponent, DropSelectComponent, TranslatePipe],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})

export class SearchComponent
{
    showSearch = model.required<boolean>();

    gameModes: Array<GameMode> = [GameMode.ANY, GameMode.WW1]
    ww1Countries: Array<number> = [Country.NOR, Country.SWE, Country.RUS, Country.GER, Country.FRA, Country.SPA,
                                   Country.ITA, Country.GBR, Country.AUT_HUN, Country.OTT_EMP]

    query: string = '';
    mode: GameMode = GameMode.ANY;
    countries: Array<number> = [];
    hidePasswordGames: boolean = false;
    allowsHotJoin: boolean = false;
    friendsOnly: boolean = false;

    searchResults: Array<SerachResult> = [];

    /* Dummy data for items, replace with actual data from server */
    dummyCountries: Country[] = [Country.NOR, Country.SWE, Country.RUS, Country.GER, Country.FRA, Country.SPA,
                                 Country.ITA, Country.GBR, Country.AUT_HUN, Country.OTT_EMP];
    phases: Phase[] = [Phase.SETUP, Phase.MOVE, Phase.RETREAT, Phase.REINFORCE];
    /* Dummy data end */

    constructor(private translate: TranslateService)
    {
        effect(() => {
            if (this.showSearch()) {
                this.updateSearch(this.query);
            }
        });
    }

    close(): void
    {
        this.showSearch.set(false);
    }

    updateMode(mode: number): void
    {
        this.mode = this.gameModes[mode];
        this.updateSearch(this.query);
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
        this.countries = countries;
        this.updateSearch(this.query);
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

    updateSearchSettings(hidePasswordGames: boolean, allowsHotJoin: boolean, friendsOnly: boolean): void
    {
        this.hidePasswordGames = hidePasswordGames;
        this.allowsHotJoin = allowsHotJoin;
        this.friendsOnly = friendsOnly;

        this.updateSearch(this.query);
    }

    updateSearch(input: string): void
    {
        this.query = input;
        console.log("Search query: " + input + ", hide password games: " + this.hidePasswordGames
            + ", allows hot join: " + this.allowsHotJoin + ", friends only: " + this.friendsOnly + ", mode: "
            + this.mode + ", countries: " + this.countries);
        // TODO: Send search request to backend, for now generate dummy data
        this.handleQueryResults();
    }

    handleQueryResults(): void
    {
        this.searchResults = [];

        // TODO: Dummy search results, replace with actual data from server
        for (let i = 0; i < 100; i++)
        {
            let availableCountriesCount = Math.floor(Math.random() * 10) % 3 + 1;
            let availableCountries: Array<Country> = [];
            for (let j = 0; j < availableCountriesCount; j++)
            {
                const country = this.ww1Countries[Math.floor(Math.random() * this.ww1Countries.length)];
                if (!availableCountries.includes(country))
                {
                    availableCountries.push(country);
                }
            }

            let hasFriends = Math.random() < 0.5;
            let hasPassword = Math.random() < 0.5;
            let phase = this.phases[Math.floor(Math.random() * this.phases.length)];

            if (this.friendsOnly && !hasFriends)
            {
                continue;
            }

            if (this.hidePasswordGames && hasPassword)
            {
                continue;
            }

            if (!this.allowsHotJoin && phase != Phase.SETUP)
            {
                continue;
            }

            if (this.countries.length > 0 && !availableCountries.some(country => this.countries.includes(country)))
            {
                continue;
            }

            this.searchResults.push(
                new SerachResult('game' + (i + 1), 'Game Name ' + (i + 1), GameMode.WW1, availableCountries, phase,
                                 Math.floor(Math.random() * 10), hasPassword));
        }
        // Dummy data end TODO: Replace with fetching from server

        console.log("Generated " + this.searchResults.length + " search results");
    }
}
