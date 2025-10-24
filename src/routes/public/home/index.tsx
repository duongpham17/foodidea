"use client";

import styles from './Home.module.scss';
import React from 'react';
import Search from './search';
import Background from './background';

const HomeRoute = () => {

  return (
    <div className={styles.container}>
      
      <Background />

      <Search />

    </div>
  )
}

export default HomeRoute;