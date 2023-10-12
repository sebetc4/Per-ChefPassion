// Libs
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
// App
import { Path } from '../types';
import { App } from '../App';
import { rootLoader } from '../loaders';
import { AuthRoute, UnauthRoute } from '../components';
import { adminRouteChildrens } from './admin.routes';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const AdminPage = lazy(() => import('../pages/AdminPage/AdminPage'));
const SignupPage = lazy(() => import('../pages/SignupPage/SignupPage'));
const SigninPage = lazy(() => import('../pages/SigninPage/SigninPage'));

export const router = createBrowserRouter([
    {
        path: Path.HOME,
        element: <App />,
        loader: rootLoader,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: Path.ADMIN,
                element: (
                    <AuthRoute>
                        <AdminPage />
                    </AuthRoute>
                ),
                children: adminRouteChildrens,
            },
            {
                path: Path.SIGNUP,
                element: (
                    <UnauthRoute>
                        <SignupPage />,
                    </UnauthRoute>
                ),
            },
            {
                path: Path.SIGNIN,
                element: (
                    <UnauthRoute>
                        <SigninPage />
                    </UnauthRoute>
                ),
            },
        ],
    },
]);
