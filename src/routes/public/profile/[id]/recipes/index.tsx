"use client"

import styles from './Items.module.scss';
import { useContext } from 'react';
import { Context } from '../Context';
import Link from 'next/link';
import Pagination from '@components/paginations/Style1';
import Loader from '@components/loaders/Style1';

const Recipes = () => {

  const {user, recipes} = useContext(Context);

  if(!recipes.length) return <Loader />

  return (
    <Pagination total={user?.recipes || 0} limit={10}>
      <div className={styles.container}>
          {recipes.length && recipes.map(el => 
          <Link href={`/recipes/${el._id}`} className={styles.element} key={el._id.toString()}>
            <div className={styles.left}>
              {el.image ? <img src={el.image[0]} alt="food" /> : <img src={""} alt="food"/>}
            </div>
            <div className={styles.right}>
              <p>{el.duration} Minutes | {el.views} Views</p>
              <p>{el.name}</p>
            </div>
          </Link>
        )}
      </div>
    </Pagination>
  )
}

export default Recipes