import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeaderWithoutContext } from './Header';
import { BrowserRouter } from 'react-router-dom';
import { User } from '~/types';

describe('<Header>', () => {
    const user: User = {
        _id: '12345',
        username: 'test',
        email: 'test@hotmail.fr'
    };
    const signout = async () => {};
    const signinButtonText = /connexion/i;
    const adminButtonText = /administartion/i;

    it('should show signin button for unauthenticated user', () => {
        const { getByText } = render(
            <HeaderWithoutContext
                user={null}
                signout={signout}
            />, {wrapper: BrowserRouter}
        );
        expect(getByText(signinButtonText)).toBeInTheDocument();
    });

    it('shouldn\'t show signin button for authenticated user', () => {
        const { queryByText } = render(
            <HeaderWithoutContext
                user={user}
                signout={signout}
            />, {wrapper: BrowserRouter}
        );
        expect(queryByText(signinButtonText)).toBeNull();
    });

    it('should show admin button for authenticated user', () => {
        const { getByText } = render(
            <HeaderWithoutContext
                user={user}
                signout={signout}
            />, {wrapper: BrowserRouter}
        );
        expect(getByText(adminButtonText)).toBeInTheDocument();
    });
});
