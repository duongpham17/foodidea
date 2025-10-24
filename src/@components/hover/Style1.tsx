import styles from './Style1.module.scss';
import React from 'react';

interface Props {
    message: string,
    children: React.ReactNode
}

const Style1 = ({message, children}: Props) => {
  return (
    <div className={styles.container}>
        <div className={styles.item}>
            {children}
        </div>
        <div className={styles.message}>
            <p>{message}</p>
        </div>
    </div>
  )
}

export default Style1