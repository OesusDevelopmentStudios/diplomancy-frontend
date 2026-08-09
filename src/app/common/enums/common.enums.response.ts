enum Response
{
    UNKNOWN = 0,
    BAD_REQUEST = 400,
    CONFLICT = 409
}

function toResponse(raw: number): Response
{
    switch(raw)
    {
        case 400: return Response.BAD_REQUEST
        case 409: return Response.CONFLICT
    }

    return Response.UNKNOWN
}

export { Response, toResponse }
