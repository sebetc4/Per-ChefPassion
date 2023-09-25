// Styles
import { NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
// Librairies
import { BsFillBasket3Fill } from 'react-icons/bs';
import { Path } from '~/types';

export const MobileMenu = () => {
    return (
        <ul className={`${styles.mobileMenu} card`}>
            <li>
                <NavLink to={Path.ADMIN}>Administration</NavLink>
            </li>
            <li>
                <NavLink to={Path.BASKET}>
                    <BsFillBasket3Fill />
                    <span>Panier</span>
                </NavLink>
            </li>
            <li>
                <NavLink to={Path.SIGNIN}>Connexion</NavLink>
            </li>
        </ul>
    );
};
