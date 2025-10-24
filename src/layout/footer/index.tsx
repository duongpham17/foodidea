import styles from './Footer.module.scss';
import React from 'react';

import Copyright from './copyright';
import Links from './links';

const Footer = () => {
  
  return ( 
    <footer className={styles.container}> 
      <Links />
      <Copyright/>
    </footer>
  )
}

export default Footer