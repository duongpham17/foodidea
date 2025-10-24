"use client";

import styles from './Navbar.module.scss';
import React, { useContext } from 'react';
import { Context } from '@context/useAuthentication';

import Logo from './logo';
import Favourites from './favourites';
import Protected from './protected';
import Guest from './guests';

const Navbar = () => {

    const {user} = useContext(Context);

    return (
        <nav className={styles.container}>

            <nav className={styles.left}>
                <Logo />
            </nav>

            <nav className={styles.right}>
                {user && <div className={styles.icon}><Favourites/></div>}

                {user ? <div className={styles.icon}><Protected /></div> : <div className={styles.icon}><Guest /></div>}
            </nav>

        </nav>
    )
}

export default Navbar;