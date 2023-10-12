import { lazy } from 'react';
import { RouteObject, redirect } from 'react-router-dom';
import { Path } from '~/types';

const AdminRecipes = lazy(() => import('../pages/AdminPage/pages/AdminRecipes/AdminRecipes'));
const AdminRecipesList = lazy(
    () => import('../pages/AdminPage/pages/AdminRecipes/pages/AdminRecipesList/AdminRecipesList')
);
const AdminRecipesForm = lazy(
    () => import('../pages/AdminPage/pages/AdminRecipes/pages/AdminRecipesForm/AdminRecipesForm')
);
const AdminUsers = lazy(() => import('../pages/AdminPage/pages/AdminUsers/AdminUsers'));

export const adminRouteChildrens: RouteObject[] = [
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
                /* loader: async ({ params }) => adminRecipesEditLoader(params.id as string), */
                element: <AdminRecipesForm />,
            },
        ],
    },
    {
        path: Path.ADMIN_USERS,
        element: <AdminUsers />,
    },
];
