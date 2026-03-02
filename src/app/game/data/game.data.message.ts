import { Country } from "../../common/enums/common.enums.country";

class Message
{
    id: string;
    from: Country;
    date: Date;

    constructor(id: string, from: Country, date: Date)
    {
        this.id = id;
        this.from = from;
        this.date = date;
    }
}

export { Message }
