import { Country } from './enums/common.enums.country';
import { Phase } from './enums/common.enums.phase';

import { Message } from './common.message';

class GameData
{
    id: string;
    name: string;
    deadline: Date;
    country: Country;
    phase: Phase;
    unread: Message[];
    messages: Message[];
    turn: number;
    turnComplete: boolean;

    constructor(id: string, name: string, deadline: Date, country: Country, phase: Phase, unread: Message[],
        messages: Message[], turn: number, turnComplete: boolean)
    {
        this.id = id;
        this.name = name;
        this.deadline = deadline;
        this.country = country;
        this.phase = phase;
        this.unread = unread;
        this.messages = messages;
        this.turnComplete = turnComplete;
        this.turn = turn;
    }
}

export { GameData }
