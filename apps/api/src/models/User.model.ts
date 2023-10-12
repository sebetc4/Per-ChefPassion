// Libs
import { Schema, model } from 'mongoose';
import { UserSchema } from 'types';
import { HttpError } from 'classes';
import bcrypt from 'bcrypt';
// Api
import { IUserModel, UserInstance, UserMethods } from '../types';

const schema = new Schema<UserSchema, IUserModel, UserMethods>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
});

schema.pre('validate', async function () {
    if (!this.email || this.isModified('email')) {
        const user = await User.findOne({ email: this.email });
        if (user) {
            throw HttpError.EMAIL_ALREADY_EXISTS;
        }
    }
});

schema.pre('save', async function () {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

schema.methods.isValidPassword = function (this: UserInstance, password: UserSchema['password']) {
    return bcrypt.compareSync(password!, this.password!);
};


export const User = model('User', schema);