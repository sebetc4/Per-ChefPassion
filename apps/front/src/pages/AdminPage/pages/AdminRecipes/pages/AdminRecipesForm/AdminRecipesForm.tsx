// Styles
import styles from './AdminRecipesForm.module.scss';
// Librairies
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// App
import { recipesApi } from '~/services';
import { CreateRecipeBody, Path, Recipe } from '~/types';
import { useLoaderData, useNavigate } from 'react-router-dom';

export default function AdminRecipesForm() {
    const recipe = useLoaderData() as Recipe;
    const navigate = useNavigate()

    const defaultValues = {
        title: recipe?.title || '',
        image: recipe?.image || '',
    };

    const recipeShema = yup.object({
        title: yup
            .string()
            .required('Le titre est requis')
            .min(10, 'Le titre doit contenir au moins 10 caractères')
            .max(30, 'Le titre doit contenir au maximum 30 caractères'),

        image: yup.string().required("L'image est requise").url("L'image doit être une URL valide"),
    });

    const submit = async (data: CreateRecipeBody) => {
        clearErrors();
        try {
            if (recipe) {
                await recipesApi.updateRecipe(recipe._id, data);
                navigate(Path.ADMIN_RECIPES_LIST)
            } else {
                await recipesApi.createRecipe(data);
                reset(defaultValues);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const {
        formState: { errors, isSubmitting },
        register,
        handleSubmit,
        reset,
        clearErrors,
    } = useForm({
        defaultValues,
        resolver: yupResolver(recipeShema),
    });

    return (
        <div className={styles.recipeFormContainer}>
            <form
                onSubmit={handleSubmit(submit)}
                className={`${styles.recipeForm} card`}
            >
                <h2>Ajouter une recette</h2>
                <div className={styles.recipeForm__field}>
                    <label htmlFor='title'>Titre de la recette</label>
                    <input
                        {...register('title')}
                        type='text'
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                </div>
                <div className={styles.recipeForm__field}>
                    <label htmlFor='title'>Image</label>
                    <input
                        {...register('image')}
                        type='text'
                    />
                    {errors.image && <p>{errors.image.message}</p>}
                </div>
                <button
                    className='btn btn-contained'
                    disabled={isSubmitting}
                >
                    Sauvegarder
                </button>
            </form>
        </div>
    );
}
