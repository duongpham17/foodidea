"use client"

import styles from './Style2.module.scss';
import React, {useEffect} from 'react';

interface Types {
  children: React.ReactNode | React.ReactElement,
  onClose?: any,
  open: boolean,
};

export const Cover = ({children, onClose, open}: Types) => {

  useEffect(() => {
      if(open) document.body.classList.add("bodyScrollBar");
      return () => document.body.classList.remove('bodyScrollBar');
  }, [open]);

  return (
    <div className={styles.container} onClick={onClose}>
      <div className={styles.page} onClick={e => e.stopPropagation()}>
        {children}

        <div className={styles.bottomButton}>
          <button onClick={onClose}> CLOSE </button>
        </div>
      </div>
    </div>
  )
}

export default Cover