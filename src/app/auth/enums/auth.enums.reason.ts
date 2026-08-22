enum Reason
{
    BAD_PASSWORD,
    BAD_USERNAME,
    BAD_EMAIL,
    BAD_USER_ID,
    MISSING_REMEMBER_VALUE
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
            case 3: result.push(Reason.BAD_USER_ID); break;
            case 4: result.push(Reason.MISSING_REMEMBER_VALUE); break;
        }
    })

    return result
}

export { Reason, toReason }
