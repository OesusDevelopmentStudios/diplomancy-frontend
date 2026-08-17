enum Reason
{
    BAD_PASSWORD,
    BAD_USERNAME,
    BAD_EMAIL
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
