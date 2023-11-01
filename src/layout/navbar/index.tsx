import styles from './Navbar.module.scss';
import React, { useContext } from 'react';
import Link from 'next/link';
import { Context as AuthenticationContext } from '@context/useAuthentication';
import { Context as FavouriteContext } from '@context/useFavourites';

import { firstcaps } from '@utils/function';

import Round from '@components/button/Round';
import SlideIn from '@components/slidein/Style1';
import LinkCustom from '@components/link/Style2';
import Spinner from '@components/loading/Spinner';

import { AiOutlineUser, AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';

const Navbar = () => {

    const {user} = useContext(AuthenticationContext);

    return (
        <div className={styles.container}>

            <div className={styles.logo}>
                <Link href="/">FOODIDEA</Link>
            </div>

            <div className={styles.menu}>
                { !user 
                    ?  
                        <Round label1={<Link href="/login"><AiOutlineUser size={20}/></Link>} />
                    :                         
                        <>
                            <Favourite />

                            <User />
                        </>
                }
            </div>

        </div>

    )
}

export default Navbar;

const Favourite = () => {

    const {favourites, onFavouriteRemove, loading} = useContext(FavouriteContext);

    return (
        <SlideIn icon={<Round label1={<AiOutlineHeart size={20}/>} />} iconOpen={`FAVOURITES [ ${favourites?.length || 0} ]`}>
            <div className={styles.favourites}>
                {favourites?.map(el => 
                    <div key={el._id} className={styles.favourite}>
                        <div className={styles.left}>
                            <Link href={`/recipes/${el.recipeID}`}>
                                <img src={el.image} alt="fav" />
                                <p>{firstcaps(el.name)}</p>
                            </Link>
                        </div>
                        <div className={styles.right}>
                            {loading ?  <Spinner size={18} center/> : <button onClick={() => onFavouriteRemove(el._id)}><AiTwotoneHeart /> </button>}
                        </div>
                    </div>    
                )}
            </div>
        </SlideIn>
    )
};

const User = () => {

    const onClick = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <SlideIn icon={<Round label1={<AiOutlineUser size={20}/>} />} iconOpen={<button onClick={onClick}>Logout</button>}>
            <div className={styles.profile}>
                <LinkCustom href="/profile" value="PROFILE" />
                <LinkCustom href="/me/recipes" value="RECIPES" />
            </div>
        </SlideIn>
    )
};