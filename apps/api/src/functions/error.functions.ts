import { Request, NextFunction, Response } from 'express';

export const catchControllerError =
    (func: (req: Request, res: Response, next: NextFunction) => void) =>
    (req: Request, res: Response, next: NextFunction) =>
        Promise.resolve(func(req, res, next)).catch((err) => next(err));
