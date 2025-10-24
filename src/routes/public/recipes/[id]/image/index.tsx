"use client";

import styles from './Image.module.scss';
import React, { useContext } from 'react';
import { Context } from '../Context';
import { BsFillEyeFill } from "react-icons/bs";
import { AiFillHeart  } from "react-icons/ai";
import Hover from '@components/hover/Style1';

const Image = () => {

  const {recipe} = useContext(Context); 

  return ( 
    <div className={styles.container}> 
        <img src={recipe?.image[0]} alt={recipe?.name} />
        <div className={styles.information}>
          <Hover message="Duration">
            <div className={styles.box}>
              <p>{recipe?.duration} Minutes</p>
            </div>
          </Hover>
          <Hover message="Views">
            <div className={styles.box}>
              <p>{recipe?.views}</p>
              <BsFillEyeFill /> 
            </div>
          </Hover>
          <Hover message="Favourites">
            <div className={styles.box}>
              <p>{recipe?.favourites} </p>
              <AiFillHeart />
            </div>
          </Hover>
        </div>
    </div>
  );
}

export default Image;