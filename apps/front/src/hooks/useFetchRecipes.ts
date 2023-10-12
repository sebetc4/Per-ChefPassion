// Libs
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
// App
import { recipesApi } from '~/services';
import { recipesState } from '~/state';

export const useFetchRecipes = (page: number, type: 'user' | 'admin') => {
    // State
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const setRecipes = useSetRecoilState(recipesState);

    // Constants
    const NUMB_RECIPES_BY_PAGE_USER = 18;
    const NUMB_RECIPES_BY_PAGE_ADMIN = 32;

    useEffect(() => {
        let canceled = false;
        const fetchRecipes = async () => {
            try {
                const newRecipes = await recipesApi.getRecipes(
                    page,
                    type === 'user' ? NUMB_RECIPES_BY_PAGE_USER : NUMB_RECIPES_BY_PAGE_ADMIN
                );
                if (canceled) return;
                if (page === 1) {
                    setRecipes(Array.isArray(newRecipes) ? newRecipes : [newRecipes]);
                } else {
                    setRecipes((state) =>
                        Array.isArray(newRecipes) ? [...state, ...newRecipes] : [...state, newRecipes]
                    );
                }
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecipes();
        return () => {
            canceled = true;
        };
    }, [page, type, setRecipes]);

    return { setRecipes, isLoading, error };
};
