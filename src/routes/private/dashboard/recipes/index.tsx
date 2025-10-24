"use client"

import styles from './Recipes.module.scss';
import { useContext, Suspense } from 'react';
import { Context } from 'routes/private/dashboard/Context';
import Link from 'next/link';
import Pagination from '@components/paginations/Style1';
import Loader from '@components/loaders/Style1';

const Recipes = () => {

  const {recipes, user} = useContext(Context);

  return (
    <Suspense fallback={<Loader />}>
      <Pagination total={user?.recipes || 0} limit={10}>
        <div className={styles.container}>
            {recipes.length && recipes.map(el => 
            <div className={styles.element} key={el._id.toString()}>
              <div className={styles.left}>
                <Link className={styles.live} href={`/recipes/${el._id}?name=${el.name}&category=${el.category}`}>Live</Link>
                {el.image ? <img src={el.image[0]} alt="food" /> : <img src={""} alt="food"/>}
              </div>
              <Link href={`/me/recipes/${el._id}`} className={styles.right}>
                <p>{el.duration} Minutes | {el.views} Views</p>
                <p>{el.category}</p>
                <p>{el.name}</p>
              </Link>

              <Link href={`/me/recipes/${el._id}`} className={styles.edit}>EDIT</Link>
            </div>
          )}
        </div>
      </Pagination>
    </Suspense>
  )
}

export default Recipes