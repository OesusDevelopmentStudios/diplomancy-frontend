import { Country } from '../../common/enums/common.enums.country';
import { GameMode } from '../../common/enums/common.enums.game-mode';
import { Phase } from '../../common/enums/common.enums.phase';

class SerachResult
{
    id: string;
    name: string;
    gameMode: GameMode;
    availableCountries: Array<Country>;
    phase: Phase;
    turn: number;
    hasPassword: boolean;

    constructor(id: string, name: string, gameMode: GameMode, availableCountries: Array<Country>, phase: Phase,
                turn: number, hasPassword: boolean)
    {
        this.id = id;
        this.name = name;
        this.gameMode = gameMode;
        this.availableCountries = availableCountries;
        this.phase = phase;
        this.turn = turn;
        this.hasPassword = hasPassword;
    }
}

export { SerachResult }
