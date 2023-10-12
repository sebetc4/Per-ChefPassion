export class HttpError extends Error {
    // 400
    static readonly INVALID_ID = new HttpError('This ID is invalid', 400);
    static readonly BAD_REQUEST = new HttpError('Invalid request', 400);
    static readonly EMAIL_ALREADY_EXISTS = new HttpError('This email already exists', 400);

    //401
    static readonly UNAUTHORIZED = new HttpError('Unauthorized', 401);
    static readonly WRONG_PASSWORD = new HttpError('Wrong password', 401);
    static readonly WRONG_EMAIL = new HttpError('Wrong email', 401);

    // 403
    static readonly FORBIDDEN = new HttpError('Forbidden', 403);
    static readonly NOT_FOUND = new HttpError('Not found', 404);

    private constructor(public readonly message: string, public readonly statusCode: number) {
        super(message);
        this.name = 'CustomError';
        this.statusCode = statusCode;
    }
}
