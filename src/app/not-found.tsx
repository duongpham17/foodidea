import styles from './not-found.module.scss';
import Link from 'next/link';

export const NotFound = () => (
    <main className={styles.container}>
        <Link href="/">404 | Route is unknown</Link>
    </main>
)

export default NotFound