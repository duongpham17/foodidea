
import styles from './Terms.module.scss';
import React from 'react'

const TermsRoute = () => {

    const data = [
        {
            title: "Acceptance of Terms",
            message: `By accessing and using this website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any part of these terms, you must not use this site.`
        },
        {
            title: "Use of Website ",
            message: `You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the site.`
        },
        {
            title: "Intellectual Property",
            message: `All content on this website, including text, images, logos, and software, is the property of [Your Business Name] and protected by copyright laws. You may not copy, reproduce, distribute, or create derivative works without permission.`
        },
        {
            title: "User Accounts",
            message: `If you create an account, you are responsible for maintaining the confidentiality of your login details and for all activities that occur under your account.`
        },
        {
            title: "Data Storage and Privacy",
            message: `Your information, such as email and username, will be stored securely in our database. Please review our Privacy Policy to understand how we handle your data.`
        },
        {
            title: "Termination",
            message: `We reserve the right to terminate or suspend your access to the website at our sole discretion without notice for conduct that violates these terms.`
        },
        {
            title: "Limitation of Liability",
            message: `The website is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the site.`
        },
        {
            title: "Governing Law",
            message: `hese terms are governed by the laws of [Your Country/Region]. Any disputes will be subject to the exclusive jurisdiction of the courts in United Kingdom`
        },
        {
            title: "Changes to Terms",
            message: `We may update these Terms and Conditions from time to time. Continued use of the website after changes constitutes acceptance of the new terms.`
        }
    ]

    return (
        <section className={styles.container}>

            <h1>Terms and condtion</h1>

            <p>Last updated: 24/10/2025</p>

            {data.map((el, index) => 
                <div key={el.title}>
                    <h2>{index+1}. {el.title}</h2>
                    <p>{el.message}</p>
                </div>
            )}
        
        </section>
  )
}

export default TermsRoute