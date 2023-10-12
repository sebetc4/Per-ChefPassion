import { CreateUpdateRecipeBody } from 'types';
import { ObjectSchema, object, string } from 'yup';

export const createUpdateRecipeShema: ObjectSchema<CreateUpdateRecipeBody> = object({
    title: string()
        .required('Le titre est requis')
        .min(10, 'Le titre doit contenir au moins 10 caractères')
        .max(30, 'Le titre doit contenir au maximum 30 caractères'),

    image: string().required("L'image est requise").url("L'image doit être une URL valide"),
});