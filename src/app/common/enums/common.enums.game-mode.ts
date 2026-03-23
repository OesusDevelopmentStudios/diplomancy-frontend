import { TranslateService } from "@ngx-translate/core";

enum GameMode
{
    ANY = 0,
    WW1
}

export function gameModeAsText(value: GameMode, translate: TranslateService): string
{
    switch (value)
    {
        case GameMode.ANY: return translate.instant('common.game_mode.any');
        case GameMode.WW1: return translate.instant('common.game_mode.ww1');
        default: return 'Error';
    }
}

export { GameMode }
