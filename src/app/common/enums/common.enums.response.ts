enum Response
{
    UNKNOWN,
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500
}

function toResponse(raw: number): Response
{
    switch(raw)
    {
        case 200: return Response.OK
        case 201: return Response.CREATED
        case 400: return Response.BAD_REQUEST
        case 401: return Response.UNAUTHORIZED
        case 404: return Response.NOT_FOUND
        case 409: return Response.CONFLICT
        case 500: return Response.INTERNAL_SERVER_ERROR
    }

    return Response.UNKNOWN
}

export { Response, toResponse }
