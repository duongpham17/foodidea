import styles from './Style1.module.scss';
import React from 'react';

interface Props {
  children: React.ReactNode | React.ReactElement,
  center?: boolean,
  margin?: string,
  color?: string,
}

const Style1 = ({children, margin, color}: Props) => {
  return (
    <h1 
      className={styles.container} 
      style={{margin: margin, color: color}}>
        {children}
    </h1>
  )
}

export default Style1