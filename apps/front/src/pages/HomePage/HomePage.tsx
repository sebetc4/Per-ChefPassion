// Styles
import styles from './HomePage.module.scss';
// Libs
import { useState } from 'react';
import { Recipe as TRecipe } from 'types';
// App
import { Basket, Recipe, Search } from './components';
import { Loader } from '~/components';
import { useFetchRecipes } from '~/hooks';
import { recipesApi } from '~/services';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { recipesState, selectFilteredRecipes } from '~/state';

export default function HomePage() {
    // States
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const recipes = useRecoilValue(selectFilteredRecipes(filter));
    const setRecipes = useSetRecoilState(recipesState);

    const { isLoading } = useFetchRecipes(page, 'user');

    const updateRecipe = async (updatedRecipe: TRecipe) => {
        try {
            const { _id, ...recipe } = updatedRecipe;
            await recipesApi.updateRecipe(_id, { ...recipe });
            setRecipes(recipes.map((recipe) => (recipe._id === _id ? updatedRecipe : recipe)));
        } catch (err) {
            console.log(err);
        }
    };

    const deleteRecipe = async (_id: string) => {
        try {
            await recipesApi.deleteRecipe(_id);
            setRecipes(recipes.filter((recipe) => recipe._id !== _id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <section className={`${styles.home} container`}>
                <h1 className={styles.home__title}>{`Découvrez nos nouvelles recettes - ${recipes.length}`}</h1>
                <div className={`${styles.home__gridContainer} card`}>
                    <Search setFilter={setFilter} />
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            <div className={styles.home__grid}>
                                {recipes.map((recipe) => (
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
            </section>

                <Basket />
        </>
    );
}
