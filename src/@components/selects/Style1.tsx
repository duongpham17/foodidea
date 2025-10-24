"use client"

import styles from './Style1.module.scss';
import React from 'react';

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    color?: "dark",
    label?: string | number, 
    options: string[],
};

const Input = ({color, label, options, ...props}:Props) => {
    
  return (
    <div className={styles.container}>

        <p>{label}</p>

        <select key={label}>
          {options.map(el => <option key={el} value={el}>{el}</option>)}
        </select>

    </div>
  )
}

export default Input