// Libs
import { HttpError } from 'classes';
import { ObjectSchema } from 'yup';

const { NODE_ENV } = process.env;

export const validBody = async <T>(schema: ObjectSchema<any>, body: any): Promise<T> => {
    try {
        await schema.validate(body);
        return body as T;
    } catch (err) {
        if (NODE_ENV === 'production') {
            throw HttpError.BAD_REQUEST;
        } else {
            throw err;
        }
    }
};
