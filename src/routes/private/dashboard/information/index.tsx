"use client";

import styles from './Information.module.scss';
import React, { useContext } from 'react';
import { Context } from '../Context';
import { GiRoundStar } from "react-icons/gi";
import { FaHamburger } from "react-icons/fa";
import Hover from '@components/hover/Style1';
import Button from '@components/buttons/Style1';

const Information = () => {
    const { addRecipes, user, loading } = useContext(Context);

    return (
        <div className={styles.container}>
            <Hover message="New Recipe">
                <Button label1="Create" onClick={addRecipes as any} color="primary" loading={loading} />
            </Hover>
            <Hover message="Recipes">
                <div className={styles.item}> 
                    <FaHamburger className={styles.iconBurger}/> 
                    <p>{user?.recipes}</p>
                </div>
            </Hover>
            <Hover message="Favourites">
                <div className={styles.item}> 
                    <GiRoundStar className={styles.iconStar}/> 
                    <p>{user?.favourites}</p>
                </div>
            </Hover>
        </div>
    )
}

export default Information