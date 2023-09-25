// Styles
import styles from './AdminNav.module.scss';
// Librairies
import { NavLink } from "react-router-dom"
// App
import { Path } from "~/types"

export const AdminNav = () => {
  return (
    <nav className={styles.adminNav}>
        <ul>
            <li>
                <NavLink 
                className={({isActive} ) => isActive ? styles.active : ''}
                to={Path.ADMIN_RECIPES}>Recettes</NavLink>
            </li>
            <li>
                <NavLink 
                className={({isActive} ) => isActive ? styles.active : ''}
                to={Path.ADMIN_USERS}>Utilisateurs</NavLink>
            </li>
        </ul>
    </nav>
  )
}
