import { useEffect, useState } from 'react';
import { recipesApi } from '~/services';
import { Recipe } from '~/types';

export const useFetchRecipes = (page: number, type: 'user' | 'admin') => {
    // State
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Constants
    const NUMB_RECIPES_BY_PAGE_USER = 18;
    const NUMB_RECIPES_BY_PAGE_ADMIN = 30;

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const newRecipes = await recipesApi.getRecipes(
                    page,
                    type === 'user' ? NUMB_RECIPES_BY_PAGE_USER : NUMB_RECIPES_BY_PAGE_ADMIN
                );
                setAllRecipes((prev) => (Array.isArray(newRecipes) ? [...prev, ...newRecipes] : [...prev, newRecipes]));
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecipes();
    }, [page]);

    return { allRecipes, setAllRecipes, isLoading, error };
};
