// Libs
import { signinSchema } from 'schemas';
import { SigninBody } from 'types';
// Api
import { catchControllerError, validBody } from '../functions';
import { User } from '../models';
import { HttpError } from 'classes';

export const signin = catchControllerError(async (req, res) => {
    const { email, password } = await validBody<SigninBody>(signinSchema, req.body);
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError.WRONG_EMAIL;
    }
    if (!user.isValidPassword(password)) {
        throw HttpError.WRONG_PASSWORD;
    }
    req.login(user.id);
    const { _id, username } = user;
    res.status(200).json({ _id, email, username });
});

export const getCurrentUser = catchControllerError(async (req, res) => {
    const { user } = req;
    if (!user) {
        return res.status(200).json(null);
    }
    const { _id, email, username } = user;
    res.status(200).json({ _id, email, username });
});

export const signout = catchControllerError(async (req, res) => {
    req.logout();
    res.status(200).json({message: 'User signed out successfully'});
})
