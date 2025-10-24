"use client"

import styles from './Favourites.module.scss';
import { useContext } from 'react';
import { Context } from '@context/useFavourites';
import { firstcaps } from '@utils/function';
import { AiOutlineHeart, AiTwotoneHeart} from 'react-icons/ai';
import Link from 'next/link';
import Loader from '@components/loaders/Style2';
import Button from '@components/buttons/Style1';
import SlideIn from '@components/slideins/Style1';

const Favourites = () => {

    const {favourites, onFavouriteRemove, loading} = useContext(Context);

    return (
        <SlideIn icon={<Button label1={<AiOutlineHeart size={20}/>} />} openTop={`Favourites [ ${favourites?.length || 0} ]`}>
            <div className={styles.container}>
                {favourites?.map(el => 
                    <div key={el._id.toString()} className={styles.element}>
                        <div className={styles.left}>
                            <Link href={`/recipes/${el.recipe_id}`}>
                                <img src={el.image} alt="fav" />
                            </Link>
                        </div>
                        <div className={styles.middle}>
                            <p>{firstcaps(el.name)}</p>
                        </div>
                        <div className={styles.right}>
                            {loading ?  <Loader /> : <button onClick={() => el.recipe_id ? onFavouriteRemove(el) : ""}><AiTwotoneHeart /> </button>}
                        </div>
                    </div>    
                )}
            </div>
        </SlideIn>
    )
};

export default Favourites