import styles from './Style1.module.scss';
import React from 'react';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  color?: "default" | "light" | "dark" | "red" | "green" | "primary",
  message: any, 
  size?: any,
};

const Style1 = ({message, color="default", size}: Props) => {
  return (
    <p className={styles[color]} style={{fontSize: size}}>{message}</p>
  )
}

export default Style1