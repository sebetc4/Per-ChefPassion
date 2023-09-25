import { Outlet } from 'react-router-dom';
import styles from './AdminPage.module.scss';
import { Suspense } from 'react';
import { AdminNav } from './components';

export default function AdminPage() {
    return (
        <section className={styles.admin}>
            <h1>Administration</h1>
            <div className={styles.admin__content}>
                <AdminNav />
                <Suspense>
                    <Outlet />
                </Suspense>
            </div>
        </section>
    );
}
