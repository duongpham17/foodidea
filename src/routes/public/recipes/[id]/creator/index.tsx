"use client";

import styles from './Creator.module.scss';
import React, { useContext } from 'react';
import { Context as FavouriteContext } from '@context/useFavourites';
import { Context as AuthenticationContext } from '@context/useAuthentication';
import { Context } from '../Context';
import { AiOutlineHeart, AiFillHeart  } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import Link from 'next/link';

const Creator = () => {

  const {user: isUserAuthenticated} = useContext(AuthenticationContext);

  const {favourites, onFavouriteRemove, onFavouriteSave, loading} = useContext(FavouriteContext);

  const {recipe, user} = useContext(Context)

  const favourited = favourites.find(el => el.recipe_id === recipe?._id);

  const isMe = isUserAuthenticated?._id === recipe?.user;

  return ( 
    <div className={styles.container}> 

        <Link href={`/profile/${user?._id}?page=1&limit=10`}>
          <FaUser/>
          <p>{user?.username.toUpperCase()} {isMe && "( ME )"}</p>
        </Link>

        {!isMe && isUserAuthenticated &&
          <div>
            {favourited ?
              <button className={styles.red} onClick={() => onFavouriteRemove(favourited)} disabled={loading}>
                <AiFillHeart />
              </button>
            : 
              <button onClick={() => recipe ? onFavouriteSave(recipe) : ""} disabled={loading}>
                <AiOutlineHeart />
              </button>
            }
          </div>
        }

    </div>
  );
}

export default Creator;