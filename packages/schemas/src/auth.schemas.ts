import { ObjectSchema, object, string } from 'yup';
import { SigninBody, CreateUserBody } from 'types';

export const signupSchema: ObjectSchema<CreateUserBody> = object({
    username: string()
        .required('Le pseudo est requis')
        .min(3, 'Le pseudo doit contenir au moins 3 caractères')
        .max(20, 'Le pseudo doit contenir au maximum 20 caractères'),
    email: string().required("L'email est requis").email("L'email n'est pas valide"),
    password: string()
        .required('Le mot de passe est requis')
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .max(60, 'Le mot de passe doit contenir au maximum 60 caractères'),
});

export const signinSchema: ObjectSchema<SigninBody> = object({
    email: string().required("L'email est requis").email("L'email n'est pas valide"),
    password: string()
        .required('Le mot de passe est requis')
        .min(8, "Le mot de n'est pas valide")
        .max(60, "Le mot de n'est pas valide"),
});
