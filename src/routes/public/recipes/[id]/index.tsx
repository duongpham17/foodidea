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
import Dropdown from '@components/dropdown/Style2';
import Cover from '@components/cover/Cover';

import { HiArrowNarrowLeft, HiArrowNarrowRight  } from 'react-icons/hi';
import { AiOutlineClockCircle, AiOutlineLink, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaBitcoin } from 'react-icons/fa';
import useOpen from '@hooks/useOpen';

const IDIndex = ({recipes}: PropsTypes) => {
  return ( !recipes ? <Loading message="Recipe no longer exist" /> : <Recipe data={recipes} /> )
};

export default IDIndex;

interface Props {
  data: IRecipes_IUsers
};

const Recipe = ({data}: {data: IRecipes_IUsers}) => {

  const props = {
    data
  };

  return (
    <div className={styles.container}>

      <Navigation  {...props} />

      <User {...props} />

      <Extra {...props} />

      <Image {...props} />

      <Information {...props} />

      <Ingredients {...props} />

      <Steps {...props} />

    </div>
  )
};

const Navigation = ({data}: Props) => {
  const { user } = useContext(AuthenticationContext);
  return (
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
  )
};

const User = ({data}: Props) => {
  return (
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
  )
};

const Extra = ({data}: Props) => {

  const onCopy = (value="") => {
    if(!value) return navigator.clipboard.writeText(window.location.href);
    navigator.clipboard.writeText(value);
  };

  return (
    <section className={styles.extra}>
      <div className={styles.extraBoxes}>
        <span> {ddmmyy(data.timestamp)}</span>
        <span>&bull;</span>
        <span>Views {data.views.toLocaleString()}</span>
      </div> 
      <div className={styles.extraBoxes}>
        <Dropdown icon={<FaBitcoin/>}>
          {Object.entries(data.user.crypto_addresses).map((key) => !key[1] ? null :
            <button className={styles.crypto} onClick={() => onCopy(key[1])} key={key[0]}>
              <span>{key[0].toUpperCase()}</span>
              <small>{key[1].slice(0, 5)}...{key[1].slice(-5)}</small>
            </button>
          )}
        </Dropdown>
        <button onClick={() => onCopy("")}><AiOutlineLink/></button>
      </div> 
    </section>
  )
};

const Image = ({data}: Props) => {
  return (
    <section className={styles.image}>
      <img src={data.image || ""} alt="recipe" />
    </section>
  )
};

const Information = ({data}: Props) => {

  const { favourites, onFavouriteSave } = useContext(FavouritesContext);

  const customFavourite = () => {
    onFavouriteSave({
      recipeID: data._id,
      followID: data.user._id,
      name: data.name,
      image: data.image,
    });
  };

  return (
    <section className={styles.information}>
      <div className={styles.header}>
        <h1>{data.name.toUpperCase() || "UNKNOWN RECIPE"}</h1>
        { favourites?.find(el => el.recipeID === data._id)
          ? <button className={styles.heart}><AiFillHeart/></button> 
          : <button onClick={customFavourite}><AiOutlineHeart/></button> 
        }
      </div>
      <div className={styles.duration}> 
        <AiOutlineClockCircle/>
        <span>{readminutes(data.duration) || 0}</span>
      </div>
    </section>
  )
};

const Ingredients = ({data}: Props) => {
  return (
    <section className={styles.ingredients}>
      <h1>INGREDIENTS [ {data.ingredients.length} ]</h1>
      { data.ingredients.map((el) =>     
        <div className={styles.ingredient} key={generateid()}>
          <span>{firstcaps(el) || "unknown"}</span>
        </div>
      )}
    </section>
  )
};

const Steps = ({data}: Props) => {

  const {openValue, setOpenValue} = useOpen({initialState: ""});

  return (
    <section className={styles.steps}>
      { data.steps.length ? data.steps.map((el) => 
          <Observer key={el._id}>
            <div className={styles.step}>
              { 
                el.format === "HEADER" ?
                  <h2>{el.data}</h2>
                : el.format === "NORMAL" ?
                  <p>{el.data}</p>
                : el.format === "SMALL" ? 
                  <small>{el.data}</small>
                : el.format === "LIGHT" ?
                  <span>{el.data}</span> 
                : el.format === "BOLD" ?
                  <b>{el.data}</b> 
                : el.format === "LINK" ?
                  <a href={el.data} target="_blank" rel="noopener noreferrer">{el.data}</a> 
                : el.format === "IMAGE" ? 
                  <img src={el.data} alt="preview" onClick={() => setOpenValue(el.data)}/> 
                : el.format === "VIDEO" ?
                  <video src={el.data} controls />
                : el.format === "YOUTUBE" ?
                  <iframe width="100%" height="300" src={el.data} title="YouTube video player" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                : 
                  <p>Unknown</p>
              }
            </div>
          </Observer>
          ) 
        : <p>EMPTY</p>
      }

      {openValue &&
        <Cover onClose={() => setOpenValue("")}>
          <div className={styles.previewImage}>
            <img src={openValue} alt="preview"/>
          </div>
        </Cover>
      }
    </section>
  )
};