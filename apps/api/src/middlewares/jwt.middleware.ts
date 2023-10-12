// Libs
import { Request, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
// Api
import { User } from '../models';
import { UserInstance } from '../types';

const { TOKEN_SECRET, TOKEN_TIME_LIFE } = process.env;

const createJwtToken = (userId: string) => {
    return jwt.sign({}, TOKEN_SECRET!, { subject: userId, expiresIn: TOKEN_TIME_LIFE });
};

const extractJwtToken = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return null;
        }
        const { sub } = jwt.verify(token, TOKEN_SECRET!);
        const user: UserInstance | null = await User.findById(sub);
        if (!user) {
            res.clearCookie('token');
            return null;
        }
        return user;
    } catch (err) {
        res.clearCookie('token');
        return null;
    }
};

export const handleJwt = async (req: Request, res: Response, next: NextFunction) => {
    const user = await extractJwtToken(req, res);
    req.user = user;
    req.logout = () => res.clearCookie('token');
    req.login = (userId: string) =>
        res.cookie('token', createJwtToken(userId), {
            httpOnly: true,
            expires: new Date(Date.now() + parseInt(TOKEN_TIME_LIFE!) * 1000),
            secure: true,
            sameSite: 'strict',
        });
    next();
};
