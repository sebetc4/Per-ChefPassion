// Styles
import { NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
// Libs
import { BsFillBasket3Fill } from 'react-icons/bs';
import { Path } from '~/types';

type MenuItems = {
    label: string;
    icon?: JSX.Element;
    path: string;
};

const menuItems: MenuItems[] = [
    {
        label: 'Administration',
        path: Path.ADMIN,
    },
    {
        label: 'Panier',
        icon: <BsFillBasket3Fill />,
        path: Path.BASKET,
    },
    {
        label: 'Connexion',
        path: Path.SIGNIN,
    },
    {
        label: 'Inscription',
        path: Path.SIGNUP,
    },
];

export const MobileMenu = () => {
    return (
        <ul className={`${styles.mobileMenu} card`}>
            {
                menuItems.map((item, index) => (
                    <li key={`mobile-menu-item-${index}`}>
                        <NavLink to={item.path} >
                            {item.icon && item.icon}
                            {item.label}
                        </NavLink>
                    </li>
                ))
            }
        </ul>
    );
};
