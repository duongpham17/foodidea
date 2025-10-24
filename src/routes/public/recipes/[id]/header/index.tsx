"use client";

import styles from './Header.module.scss';
import React, { useContext } from 'react';
import { Context } from '../Context';

const Header = () => {

    const {recipe} = useContext(Context)

    return (
      <div className={styles.container}>
        <h1>{recipe?.name}</h1>
        <p>{recipe ? new Date(recipe.timestamp).toLocaleDateString('en-GB') : ""}</p>
      </div>
    )
}

export default Header