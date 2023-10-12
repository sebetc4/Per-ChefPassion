// Styles
import styles from './AdminRecipesForm.module.scss';
// Libs
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateUpdateRecipeBody } from 'types';
import { createUpdateRecipeShema } from 'schemas';
// App
import { recipesApi } from '~/services';
import { Path } from '~/types';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { selectActiveRecipe } from '~/state';

export default function AdminRecipesForm() {
    const { id } = useParams();
    const recipe = useRecoilValue(selectActiveRecipe(id!));
    const navigate = useNavigate();

    const defaultValues = {
        title: recipe?.title || '',
        image: recipe?.image || '',
    };

    const submit = async (data: CreateUpdateRecipeBody) => {
        clearErrors();
        try {
            if (recipe) {
                await recipesApi.updateRecipe(recipe._id, data);
                navigate(Path.ADMIN_RECIPES_LIST);
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
    } = useForm<CreateUpdateRecipeBody>({
        defaultValues,
        resolver: yupResolver(createUpdateRecipeShema),
        mode: 'onTouched',
    });

    return (
        <section className={styles.section}>
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
        </section>
    );
}
