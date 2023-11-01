import styles from './Id.module.scss';
import React, {useContext} from 'react';
import Link from 'next/link';
import { Context as AuthenticationContext } from '@context/useAuthentication';
import { Context as FavouritesContext } from '@context/useFavourites';
import { PropsTypes } from 'pages/recipes/[id]';
import { IRecipes_IUsers } from '@database/types/populate';
import { ddmmyy, readminutes } from '@utils/time';
import { generateid, firstcaps } from '@utils/function';

import Loading from '@components/loading/Loading';
import Observer from '@components/observer/Observer';

import { HiArrowNarrowLeft, HiArrowNarrowRight  } from 'react-icons/hi';
import { AiOutlineClockCircle, AiOutlineLink, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const IDIndex = ({recipes}: PropsTypes) => {
  return ( !recipes ? <Loading /> : <Recipe data={recipes} /> )
};

export default IDIndex;

const Recipe = ({data}: {data: IRecipes_IUsers}) => {

  const { user } = useContext(AuthenticationContext);

  const { favourites, onFavouriteSave } = useContext(FavouritesContext);

  const onCopy = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const customFavourite = () => {
    onFavouriteSave({
      recipeID: data._id,
      followID: data.user._id,
      name: data.name,
      image: data.image,
    });
  };

  return (
    <div className={styles.container}>

      <div className={styles.links}>
        <Link href={"/"}>
          <HiArrowNarrowLeft/>
          <span>back</span>
        </Link>
        { !user ? null : user._id.toString() === data.user._id && 
          <Link href={`/me/recipes/${data._id}`} className={styles.back}>
            <span>edit</span>
            <HiArrowNarrowRight/>
          </Link>
        }
      </div>

      <section className={styles.user}>
        <Link href={`/users/${data.user._id}`}> 
          <img src={data.user.image || "/logo.webp"} alt="u"/>
          <p>
            <span>{firstcaps(data.user.username)}</span>
            <span>&bull;</span>
            <span>Recipes</span>
          </p>
        </Link>
      </section>

      <section className={styles.extra}>
        <div>
         <span> {ddmmyy(data.timestamp)}</span>
         <span>&bull;</span>
         <span>Views {data.views}</span>
        </div> 
        <div>
          { favourites?.find(el => el.recipeID === data._id)
            ? <button className={styles.heart}><AiFillHeart/></button> 
            : <button onClick={customFavourite}><AiOutlineHeart/></button> 
          }
          <button onClick={onCopy}><AiOutlineLink/></button>
        </div> 
      </section>

      <section className={styles.image}>
        <img src={data.image || ""} alt="recipe" />
      </section>

      <section className={styles.information}>
        <h1>{data.name.toUpperCase() || "UNKNOWN RECIPE"}</h1>
        {!!data.duration && 
          <p> 
            <AiOutlineClockCircle/>
            <span>{readminutes(data.duration)}</span>
          </p>
        }
      </section>

      <section className={styles.ingredients}>
        <h1>INGREDIENTS [ {data.ingredients.length} ]</h1>
        { data.ingredients.length 
          ? data.ingredients.map((el) => <Ingredients key={generateid()} element={el} />)
          : <p>EMPTY</p>
        }
      </section>

      <section className={styles.steps}>
        { data.steps.length 
          ? data.steps.map((el) => <Observer key={el._id}><Steps key={el._id} element={el} /></Observer> )
          : <p>EMPTY</p>
        }
      </section>

    </div>
  )
};

interface PropsIngredientsTypes {
  element: string, 
};

const Ingredients = ({element}: PropsIngredientsTypes) => {
  return (
    <div className={styles.ingredient}>
      <span>{element || "unknown"}</span>
    </div>
  )
};

interface PropsStepsTypes {
  element: IRecipes_IUsers["steps"][0], 
};

const Steps = ({element}: PropsStepsTypes) => {
  return (
    <div className={styles.step}>
      { element.format === "HEADER" ?
          <h2>{element.data}</h2>
        : element.format === "NORMAL" ?
          <p>{element.data}</p>
        : element.format === "SMALL" ? 
          <small>{element.data}</small>
        : element.format === "LIGHT" ?
          <span>{element.data}</span> 
        : element.format === "BOLD" ?
          <b>{element.data}</b> 
        : element.format === "LINK" ?
          <a href={element.data} target="_blank" rel="noopener noreferrer">{element.data}</a> 
        : element.format === "IMAGE" ? 
          <img src={element.data} alt="preview" /> 
        : element.format === "VIDEO" ?
          <video src={element.data} controls />
        : <p>Unknown</p>
      }
    </div>
  )
}