// Styles
import styles from './Header.module.scss';
// Librairies
import { useState } from 'react';
import { BsFillBasket3Fill } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
// App
import { Logo } from '..';
import { MobileMenu } from './components';
import { NavLink } from 'react-router-dom';
import { Path } from '~/types';

export const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

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
                <li>
                    <NavLink
                        className='btn btn-contained'
                        to={Path.ADMIN}
                    >
                        Administration
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className='btn btn-icon btn-outlined'
                        to={Path.BASKET}
                    >
                        <BsFillBasket3Fill />
                        <span>Panier</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className='btn btn-contained'
                        to={Path.SIGNUP}
                    >
                        Connexion
                    </NavLink>
                </li>
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
