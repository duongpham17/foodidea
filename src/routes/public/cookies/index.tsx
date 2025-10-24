
import styles from './Cookies.module.scss';
import React from 'react'

const CookiesRoute = () => {
  return (
    <div className={styles.container}>

        <section>
            <h1>What are cookies?</h1>
            <p>
                Cookies are small text files that websites store on your device such as a computer or phone to save information about your visit. 
                When you visit a site, its server sends a cookie to your browser, which then stores it and sends it back on later visits. 
                This allows the site to “remember” you and provide a more consistent experience.
            </p>
        </section>

        <section>
            <h1>What are cookies used for in this website?</h1>
            <p>
                Cookies are stored for logged in users to save information about their history and to protect routes which guest users can not enter. 
                If you are a guest you dont have to worry much about cookies.
            </p>
        </section>

        <section>
            <h1>How to delete cookies?</h1>
            <p>
                You can delete cookies by clearing your browsing history, clearing cache and clearing local storage.
                If you do not agree to the use of cookies, you can adjust your browser settings to refuse or delete cookies.
            </p>
        </section>
    
    </div>
  )
}

export default CookiesRoute