// Styles
import { Outlet, useLocation } from 'react-router-dom';
import styles from './AdminRecipes.module.scss';
import { Suspense } from 'react';
import { AdminRecipesNav } from './components';

export default function AdminRecipes() {
    const { key } = useLocation();
    return (
        <section className={styles.adminRecipes}>
            <h2>Gestion des recettes</h2>
            <div className={styles.adminRecipes__content}>
                <AdminRecipesNav />
                <Suspense>
                    <Outlet key={key} />
                </Suspense>
            </div>
        </section>
    );
}
