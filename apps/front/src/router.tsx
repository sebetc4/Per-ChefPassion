// Librairies
import { lazy } from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
// App
import { Path } from './types';
import { App } from './App';
import { recipesApi } from './services';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const AdminPage = lazy(() => import('./pages/AdminPage/AdminPage'));
const AdminRecipes = lazy(() => import('./pages/AdminPage/pages/AdminRecipes/AdminRecipes'));
const AdminRecipesList = lazy(
    () => import('./pages/AdminPage/pages/AdminRecipes/pages/AdminRecipesList/AdminRecipesList')
);
const AdminRecipesForm = lazy(
    () => import('./pages/AdminPage/pages/AdminRecipes/pages/AdminRecipesForm/AdminRecipesForm')
);
const AdminUsers = lazy(() => import('./pages/AdminPage/pages/AdminUsers/AdminUsers'));
const SignupPage = lazy(() => import('./pages/SignupPage/SignupPage'));

export const router = createBrowserRouter([
    {
        path: Path.HOME,
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: Path.ADMIN,
                element: <AdminPage />,
                children: [
                    {
                        index: true,
                        loader: () => redirect(Path.ADMIN_RECIPES),
                    },
                    {
                        path: Path.ADMIN_RECIPES,
                        element: <AdminRecipes />,
                        children: [
                            {
                                index: true,
                                loader: () => redirect(Path.ADMIN_RECIPES_LIST),
                            },
                            {
                                path: Path.ADMIN_RECIPES_LIST,
                                element: <AdminRecipesList />,
                            },
                            {
                                path: Path.ADMIN_RECIPES_CREATE,
                                element: <AdminRecipesForm />,
                            },
                            {
                                path: `${Path.ADMIN_RECIPES_EDIT}/:id`,
                                loader: async ({ params }) => recipesApi.getRecipe(params.id as string),
                                element: <AdminRecipesForm />,
                            },
                        ],
                    },
                    {
                        path: Path.ADMIN_USERS,
                        element: <AdminUsers />,
                    },
                ],
            },
            {
                path: Path.SIGNUP,
                element: <SignupPage />,
            }
        ],
    },
]);
