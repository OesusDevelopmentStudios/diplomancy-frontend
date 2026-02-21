class GameData
{

    id: string;
    name: string;
    unreadMessages: number = 0;

    constructor(id: string, name: string, unreadMessages: number = 0)
    {
        this.id = id;
        this.name = name;
        this.unreadMessages = unreadMessages;
    }
}

export { GameData }
