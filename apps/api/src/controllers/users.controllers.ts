// Libs
import { signupSchema } from 'schemas';
import { CreateUserBody } from 'types';
// Api
import { catchControllerError, validBody } from '../functions';
import { User } from '../models';


export const createUser = catchControllerError(async (req, res) => {
    const { username, email, password } = await validBody<CreateUserBody>(signupSchema, req.body);
    await User.create({ username, email, password });
    res.status(201).json({ message: 'User registred successfully'});
});