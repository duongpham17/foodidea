import styles from './Style2.module.scss';
import React from 'react';

interface Props {
    children: React.ReactNode | React.ReactElement,
    icon: React.ReactNode | React.ReactElement,
}

const Style2 = ({children, icon}: Props) => {

    return (
        <div className={styles.container}>
            <button className={styles.dropdownBtn}>
                {icon}
            </button>
            <div className={styles.children}>
                {children}
            </div>
        </div>
    )
}

export default Style2