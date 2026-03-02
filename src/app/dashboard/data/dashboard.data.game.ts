import { Country } from '../../common/enums/common.enums.country';
import { Phase } from '../../common/enums/common.enums.phase';

class Game
{
    id: string;
    name: string;
    deadline: Date;
    country: Country;
    phase: Phase;
    unread: number;
    turn: number;
    turnComplete: boolean;

    constructor(id: string, name: string, deadline: Date, country: Country, phase: Phase, unread: number, turn: number,
                turnComplete: boolean)
    {
        this.id = id;
        this.name = name;
        this.deadline = deadline;
        this.country = country;
        this.phase = phase;
        this.unread = unread;
        this.turnComplete = turnComplete;
        this.turn = turn;
    }
}

export { Game }
