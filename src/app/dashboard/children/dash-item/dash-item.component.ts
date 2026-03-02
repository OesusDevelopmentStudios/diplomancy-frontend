import { Component, input } from '@angular/core';

import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { Phase, phaseAsText } from '../../../common/enums/common.enums.phase';
import { Country, countryAsText, toFileName } from '../../../common/enums/common.enums.country';

import { Game } from '../../data/dashboard.data.game';

@Component({
    selector: 'app-dash-item',
    imports: [TranslatePipe],
    templateUrl: './dash-item.component.html',
    styleUrl: './dash-item.component.css'
})

export class DashItemComponent
{
    data = input.required<Game>();

    constructor(private translate: TranslateService) {}

    toRemainingTime(deadline: Date): string
    {
        const now = new Date();
        const diff = deadline.getTime() - now.getTime();

        if (diff <= 0)
            return 'Deadline passed';

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        let result = '';
        if (days > 0)
            result += `${days}d `;
        if (hours > 0 || days > 0)
            result += `${hours}h `;
        result += `${minutes}m`;

        return result;
    }

    isGameUrgent(deadline: Date): boolean
    {
        const now = new Date();
        const diff = deadline.getTime() - now.getTime();

        return diff <= 24 * 60 * 60 * 1000;
    }

    phaseToStr(phase: Phase): string
    {
        return phaseAsText(phase, this.translate);
    }

    countryToStr(country: Country): string
    {
        return countryAsText(country, this.translate);
    }

    toFileName(country: Country): string
    {
        return toFileName(country);
    }
}
