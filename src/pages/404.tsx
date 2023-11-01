import styles from 'styles/404.module.scss';
import Link from 'next/link';

export const NotFound = () => (
    <div className={styles.container}>
        <Link href="/">404 | Route is unknown</Link>
    </div>
)

export default NotFound