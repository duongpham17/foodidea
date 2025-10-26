"use client";

import styles from './Header.module.scss';
import React, { useContext } from 'react';
import { Context } from '../Context';

const Header = () => {

    const {recipe} = useContext(Context)

    return (
      <div className={styles.container}>
        <h1>{recipe?.name} ({recipe?.category})</h1>
      </div>
    )
}

export default Header