// Styles
import styles from './AdminRecipesNav.module.scss';
// Librairies
import { NavLink } from "react-router-dom"
// App
import { Path } from "~/types"

export const AdminRecipesNav = () => {
  return (
    <nav className={styles.adminRecipesNav}>
        <ul>
            <li>
                <NavLink 
                className={({isActive} ) => isActive ? styles.active : ''}
                to={Path.ADMIN_RECIPES_LIST}>Liste des recettes</NavLink>
            </li>
            <li>
                <NavLink 
                className={({isActive} ) => isActive ? styles.active : ''}
                to={Path.ADMIN_RECIPES_CREATE}>Ajouter une recette</NavLink>
            </li>
        </ul>
    </nav>
  )
}
