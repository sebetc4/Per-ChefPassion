// Styles
import styles from './App.module.scss';
// Librairies
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// App
import { Footer, Header } from '~/components';

export const App = () => {
    return (
        <div className={styles.appContainer}>
            <Header />
            <Suspense>
                <main>
                    <Outlet />
                </main>
            </Suspense>
            <Footer />
        </div>
    );
};
