import { PropsWithChildren, createContext, useCallback, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { SigninBody } from "types";
import { usersApi } from "~/services";
import { User } from "~/types";

type AuthContextType = {
    user: User | null;
    signin: (credientials: SigninBody) => Promise<void>;
    signout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const initalUser = useLoaderData() as User | null;
    const [user, setUser] = useState<User | null>(initalUser);

    const signin = useCallback(async (credientials: SigninBody) => {
            const loggedInUser = await usersApi.signin(credientials);
            setUser(loggedInUser);
        }, [])

    const signout = useCallback(async () => {
        await usersApi.signout();
        setUser(null);
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            signin,
            signout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}