class Message
{
    // id
    // from
    // date received
}

class GameData
{
    id: string;
    name: string;
    // Country (Use for flag? / bg color?)
    // Unread messages struct
    // Read messages struct
    // Phase: MOVE, RETREAT, PLACE
    // Is user input required?

    constructor(id: string, name: string, unreadMessages: number = 0)
    {
        this.id = id;
        this.name = name;
        // this.unreadMessages = unreadMessages;
    }
}

export { GameData }
