// Styles
import styles from './Header.module.scss';
// Libs
import { useState } from 'react';
import { BsFillBasket3Fill } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
// App
import { Logo } from '..';
import { MobileMenu } from './components';
import { NavLink } from 'react-router-dom';
import { Path, User } from '~/types';
import { useAuth } from '~/hooks';
import { basketDisplayState } from '~/state';
import { useSetRecoilState } from 'recoil';

type MenuItems = {
    label: string;
    type: 'contained' | 'outlined';
    path: string;
};

const connectedMenuItems: MenuItems[] = [
    {
        label: 'Administration',
        type: 'contained',
        path: Path.ADMIN,
    },
];

const unconnectedMenuItems: MenuItems[] = [
    {
        label: 'Connexion',
        type: 'contained',
        path: Path.SIGNIN,
    },
    {
        label: 'Inscription',
        type: 'outlined',
        path: Path.SIGNUP,
    },
];

export const Header = () => {
    const { user, signout } = useAuth();
    
    return (
        <HeaderWithoutContext
        user={user}
        signout={signout}
        />
        );
    };
    
    type HeaderWithoutContextProps = {
        user: User | null;
        signout: () => Promise<void>;
    };
    
    export const HeaderWithoutContext = ({ user, signout }: HeaderWithoutContextProps) => {
        const [showMenu, setShowMenu] = useState(false);
        
        const menuItems = user ? connectedMenuItems : unconnectedMenuItems;
        const setBasketDisplay = useSetRecoilState(basketDisplayState);
        
        return (
        <header className={styles.header}>
            <i className='fa-solid fa-bars-staggered'></i>
            <div className={styles.header__logoContainer}>
                <NavLink to={Path.HOME}>
                    <Logo
                        width='200px'
                        color='#FFBE79'
                    />
                </NavLink>
            </div>
            <ul className={styles.header__buttonList}>
                {menuItems.map((item, index) => (
                    <li key={`header-menu-item-{${index}}`}>
                        <NavLink
                            className={`btn btn-${item.type === 'contained' ? 'contained' : 'outlined'}`}
                            to={item.path}
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
                {user && (
                    <>
                        <li>
                            <button
                                className='btn btn-outlined btn-icon'
                                onClick={() => setBasketDisplay(true)}
                            >
                                <BsFillBasket3Fill />
                                Panier
                            </button>
                        </li>
                        <li>
                            <button
                                className='btn btn-contained'
                                onClick={signout}
                            >
                                Se déconnecter
                            </button>
                        </li>
                    </>
                )}
            </ul>
            <button
                className={styles.header__burgerButton}
                onClick={() => setShowMenu(true)}
            >
                <FaBars size={20} />
            </button>

            {showMenu && (
                <>
                    <div
                        onClick={() => setShowMenu(false)}
                        className='backdrop'
                    />
                    <MobileMenu />
                </>
            )}
        </header>
    );
};
