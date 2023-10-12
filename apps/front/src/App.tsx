// Styles
import styles from './App.module.scss';
// Libs
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// App
import { Footer, Header } from '~/components';
import { AuthProvider } from './contexts';

export const App = () => {
    return (
        <div className={styles.appContainer}>
            <AuthProvider>
                <Header />
                <Suspense>
                    <main>
                        <Outlet />
                    </main>
                </Suspense>
                <Footer />
            </AuthProvider>
        </div>
    );
};
