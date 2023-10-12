import { selector, selectorFamily } from 'recoil';
import { recipesState } from '.';
import { recipesApi } from '~/services';

export const selectFilteredRecipes = selectorFamily({
    key: 'selectFilteredRecipes',
    get:
        (searchTerm: string) =>
        ({ get }) => {
            const recipes = get(recipesState);
            return recipes.filter((recipe) => recipe.title.toLowerCase().includes(searchTerm));
        },
});

export const selectActiveRecipe = selectorFamily({
    key: 'selectActiveRecipe',
    get: (id: string) => async () => id ? await recipesApi.getRecipe(id) : null,
});

export const selectLickedRecipes = selector({
    key: 'selectLickedRecipes',
    get: ({ get }) => get(recipesState).filter((recipe) => recipe.liked),
});
