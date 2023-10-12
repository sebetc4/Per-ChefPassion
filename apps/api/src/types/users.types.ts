import { Model } from 'mongoose';
import { UserSchema } from 'types';
import { InstanceOfWithDates } from '.';

declare module 'express-serve-static-core' {
    interface Request {
        user: any;
        logout: () => void;
        login: (userId: string) => void;
    }
}

export type UserMethods = {
    isValidPassword: (id: UserSchema['password']) => boolean;
};

export interface IUserModel extends Model<UserSchema, {}, UserMethods> {}

export type UserInstance = InstanceOfWithDates<UserSchema, UserMethods>;
