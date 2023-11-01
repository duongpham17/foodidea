import styles from './Style1.module.scss';
import React from 'react';

interface Props {
  value: any,
  size?: string,
  lineHeight?: string,
  weight?: string,
  center?: boolean,
  margin?: string,
  color?: string
}

const Style1 = ({value, lineHeight, size, weight, center, margin, color}: Props) => {
  return (
    <p className={styles.container} style={{fontSize: size, lineHeight: lineHeight, fontWeight: weight, textAlign: center ? "center" : "left", margin: margin, color: color}}>{value}</p>
  )
}

export default Style1