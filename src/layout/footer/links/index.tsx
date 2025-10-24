import styles from './Links.module.scss';
import React from 'react';
import Link from 'next/link';

const Links = () => {
  return (
    <section className={styles.container}>
      <Link href="/cookies">Cookie policy</Link>
      <Link href="/terms">Terms of use</Link>
    </section>
  )
}

export default Links