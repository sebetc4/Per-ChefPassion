// Styles
import styles from './AdminRecipesList.module.scss';
// Libs
import { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
// App
import { useFetchRecipes } from '~/hooks';
import { recipesApi } from '~/services';
import { recipesState } from '~/state';
import { Path } from '~/types';

export default function AdminRecipesList() {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);

    useFetchRecipes(page, 'admin');
    const [recipes, setRecipes] = useRecoilState(recipesState);

    const deleteRecipe = async (_id: string) => {
        try {
            await recipesApi.deleteRecipe(_id);
            setRecipes((state) => state.filter((recipe) => recipe._id !== _id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <ul className={styles.adminRecipesList}>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>
                        <p>{recipe.title}</p>
                        <div className={styles.adminRecipesList__buttonsContainer}>
                            <button onClick={() => navigate(`${Path.ADMIN_RECIPES_EDIT}/${recipe._id}`)}>
                                <AiFillEdit size={20} />
                            </button>
                            <button onClick={() => deleteRecipe(recipe._id)}>
                                <AiFillDelete size={20} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className={styles.adminRecipesList__loadMoreRecipeButtonContainer}>
                <button
                    className='btn btn-contained'
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Charger plus de recettes
                </button>
            </div>
        </>
    );
}
