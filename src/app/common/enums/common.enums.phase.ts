import { TranslateService } from '@ngx-translate/core';

enum Phase
{
    MOVE = 0,
    RETREAT,
    REINFORCE
}

export function phaseAsText(value: Phase, translate: TranslateService): string
{
    switch (value)
    {
        case Phase.MOVE: return translate.instant('common.phase.move');
        case Phase.RETREAT: return translate.instant('common.phase.retreat');
        case Phase.REINFORCE: return translate.instant('common.phase.reinforce');
        default: return translate.instant('common.unknown');
    }
}

export { Phase }
