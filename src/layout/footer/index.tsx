import styles from './Footer.module.scss';
import React from 'react';
import Copyright from './Copyright';

const Footer = () => {
  
  return ( 
    <div className={styles.container}> 

      <Copyright/>
      
    </div>
  )
}

export default Footer