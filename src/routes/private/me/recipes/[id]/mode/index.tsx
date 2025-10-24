"use client";

import { Context } from '../Context';
import styles from './Mode.module.scss';
import React, { useContext } from 'react';

const Mode = () => {
  const {mode, setMode} = useContext(Context);

  return (
    <div className={styles.container}>
        <button onClick={() => setMode("edit")} className={mode==="edit"?styles.selected:""}>Edit</button>
        <button onClick={() => setMode("preview")} className={mode==="preview"?styles.selected:""}>Preview</button>
        <button onClick={() => setMode("delete")} className={mode==="delete"?styles.selected:""}>Delete</button>
    </div>
  )
}

export default Mode