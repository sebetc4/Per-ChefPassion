import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '~/hooks';
import { Path } from '~/types';

export const AuthRoute = ({ children }: PropsWithChildren) => {
    const { user } = useAuth();
    return user ? <>{children}</> : <Navigate to={Path.SIGNIN} />;
};
