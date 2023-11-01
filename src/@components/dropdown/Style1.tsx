import styles from './Style1.module.scss';
import React from 'react';
import {AiOutlineMenu} from 'react-icons/ai';

interface Props {
    children: React.ReactNode;
}

const Style1 = ({children}: Props) => {

    return (
        <div className={styles.container}>
            <button className={styles.dropdownBtn}>
                <AiOutlineMenu/>
            </button>
            <div className={styles.children}>
                {children}
            </div>
        </div>
    )
}

export default Style1