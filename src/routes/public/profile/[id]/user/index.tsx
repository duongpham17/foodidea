"use client";

import styles from './User.module.scss';
import React, { useContext } from 'react';
import { Context } from '../Context';
import { GiRoundStar } from "react-icons/gi";
import { FaHamburger } from "react-icons/fa";
import Hover from '@components/hover/Style1';

const User = () => {

    const {user} = useContext(Context);

    return (
        <div className={styles.container}>
            <ul>
                <Hover message="Username">
                    <li>{user?.username}</li>
                </Hover>
                <Hover message="Recipes">
                    <li> 
                        <FaHamburger className={styles.iconBurger}/> 
                        <p>{user?.recipes}</p>
                    </li>
                </Hover>
                <Hover message="Favourites">
                    <li> 
                        <GiRoundStar className={styles.iconStar}/> 
                        <p>{user?.favourites}</p>
                    </li>
                </Hover>
            </ul>
        </div>
    )
}

export default User