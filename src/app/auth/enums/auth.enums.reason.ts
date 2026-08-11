enum Reason
{
    BAD_PASSWORD = 0,
    BAD_USERNAME = 1,
    BAD_EMAIL = 2
}

function toReason(raw: any[]): Reason[]
{
    if (!raw)
    {
        return []
    }

    var result: Reason[] = [];
    raw.forEach((value) => {
        switch(value)
        {
            case 0: result.push(Reason.BAD_PASSWORD); break;
            case 1: result.push(Reason.BAD_USERNAME); break;
            case 2: result.push(Reason.BAD_EMAIL); break
        }
    })

    return result
}

export { Reason, toReason }
