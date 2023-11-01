import styles from './Id.module.scss';
import React from 'react'
import { PropsTypes } from 'pages/users/[id]';
import Link from 'next/link';
import { readminutes, ddmmyy } from '@utils/time';
import { AiOutlineClockCircle } from 'react-icons/ai';
import Observer from '@components/observer/Observer';

const UserIdIndex = ({ recipes, user }: PropsTypes) => {

    return (
        <div className={styles.container}>

            <div className={styles.user}>
                <img src={user.image || "/logo.webp"} alt="u" />
                <h3>{user.username}</h3>
            </div>

            <div className={styles.header}>
                <h2>RECIPES [ {recipes?.length || 0} ]</h2>
            </div>

            <div className={styles.recipes}>
                {recipes?.map(el => 
                <Observer key={el._id}>
                    <Link key={el._id} href={`/recipes/${el._id}`} className={styles.recipe}>
                        <div className={styles.duration}>
                            <p><AiOutlineClockCircle/> {readminutes(el.duration)}</p>
                            <p>Views {el.views}</p>
                        </div>
                        <div className={styles.image}>
                            <img src={el.image} alt="recipe" />
                        </div>
                        <div className={styles.information}>
                            <h2>{el.name.toUpperCase() || "UNKNOWN"}</h2>
                            <small>{ddmmyy(el.timestamp)}</small>
                        </div>
                    </Link>
                </Observer>
                )}
            </div>

        </div>
    )
}

export default UserIdIndex