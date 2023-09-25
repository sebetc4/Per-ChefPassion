// Styles
import styles from './HomePage.module.scss';
// Librairies
import { useState } from 'react';
// App
import { Recipe, Search } from './components';
import { Loader } from '~/components';
import { Recipe as RecipeType } from '~/types';
import { useFetchRecipes } from '~/hooks';
import { recipesApi } from '~/services';

export default function HomePage() {
    // States
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);

    const { allRecipes, setAllRecipes, isLoading } = useFetchRecipes(page, 'user');

    const updateRecipe = async (updatedRecipe: RecipeType) => {
        try {
            const { _id, ...recipe } = updatedRecipe;
            await recipesApi.updateRecipe(_id, { ...recipe });
            setAllRecipes(allRecipes.map((recipe) => (recipe._id === _id ? updatedRecipe : recipe)));
        } catch (err) {
            console.log(err);
        }
    };

    const deleteRecipe = async (_id: string) => {
        try {
            await recipesApi.deleteRecipe(_id);
            setAllRecipes(allRecipes.filter((recipe) => recipe._id !== _id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={`${styles.home} container`}>
            <h1 className={styles.home__title}>{`Découvrez nos nouvelles recettes - ${allRecipes.length}`}</h1>
            <div className={`${styles.home__gridContainer} card`}>
                <Search setFilter={setFilter} />
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <div className={styles.home__grid}>
                            {allRecipes
                                .filter((recipe) => recipe.title.toLowerCase().includes(filter))
                                .map((recipe) => (
                                    <Recipe
                                        key={recipe._id}
                                        recipe={recipe}
                                        updateRecipe={updateRecipe}
                                        deleteRecipe={deleteRecipe}
                                    />
                                ))}
                        </div>
                        <div className={styles.home__loadMoreRecipeButtonContainer}>
                            <button
                                className='btn btn-contained'
                                onClick={() => setPage((prev) => prev + 1)}
                            >
                                Charger plus de recettes
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
