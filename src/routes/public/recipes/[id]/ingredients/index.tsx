"use client";

import styles from './Ingredients.module.scss';
import React, { useContext } from 'react';
import { Context } from '../Context';

const Ingredients = () => {

  const {recipe} = useContext(Context);

  const removeWhiteSpace = (text: string) => {
    return text.split("\n").filter(el => el !== "")
  };
  
  return (
      <div className={styles.container}>
        <h1>Ingredients {recipe ? removeWhiteSpace(recipe.ingredients).length : ""} </h1>
        <p>{recipe?.ingredients}</p>
      </div>
  )
}

export default Ingredients;