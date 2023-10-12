// Libs
import { HttpError } from 'classes';
import { Response } from 'express';

export const handleError = (err: Error | HttpError, res: Response): void => {
    if (process.env.NODE_ENV === 'production') {
        err instanceof HttpError
            ? res.status(err.statusCode).json({ errror: err.message })
            : res.status(500).json({ error: 'Something went wrong' });
    } else {
        res.status(err instanceof HttpError ? err.statusCode : 500).json({ 
            name: err.name,
            message: err.message,
            stack: err.stack,
         });
    }
};
