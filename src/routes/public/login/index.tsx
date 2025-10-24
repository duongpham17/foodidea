"use client";

import styles from './Login.module.scss';
import React, { useState } from 'react';

import Signin from './signin';
import Signup from './signup';

const LoginRoute = () => {

  const [navbar, setNavbar] = useState("login")

  return (
    <div className={styles.container}>

      <div className={styles.box}>

        <div className={styles.navbar}>
          <button onClick={() => setNavbar("login")} className={navbar==="login"?styles.selected:""}>Sign In</button>
          <button onClick={() => setNavbar("signup")} className={navbar==="signup"?styles.selected:""}>Sign Up</button>
        </div>

        {navbar === "login" && <Signin />}
        {navbar === "signup" && <Signup />}
      </div>
      
    </div>
  )
}

export default LoginRoute